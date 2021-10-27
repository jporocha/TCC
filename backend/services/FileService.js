const FileModel = require("../models/FileModel");
const mailer = require("../helpers/nodemailer");
const crypto = require("crypto");
const S3 = require("aws-sdk/clients/s3");

module.exports = class FileService {
  constructor() {}

  static async CreateFile(examData) {
    try {
      let file = new FileModel(examData);
      await file.save();
      return file._id;
    } catch (e) {
      return { erro: "Falha ao criar arquivo" };
    }
  }

  static async ValidateUpload(id) {
    try {
      let file = await FileModel.findById(id).populate("patientId");
      if (!file) throw "Arquivo não existe";
      return {
        payload: {
          name: file.nameOfExam,
          patient: file.patientId.name,
        },
        statusCode: 200,
      };
    } catch (e) {
      return {
        payload: "Exame não encontrado",
        statusCode: 400,
      };
    }
  }

  static async SendFiles() {
    try {
      let files = await FileModel.find({ sentToLab: false });
      for (const el in files) {
        let file = files[el];
        let uploadCode = crypto.randomBytes(32).toString("hex");
        let mailText = `<p>Nova solicitação de exames</p><p><strong>Tipo de exame:</strong>${file.nameOfExam}</p><p><strong>Código para envio do exame:</strong> ${uploadCode}</p><p> <a href="https://clinimedbh.herokuapp.com/upload/${file._id}">Clique aqui para enviar os resultados</a></p>`;
        await mailer(
          "João Paulo Rocha <jporocha@gmail.com>",
          `Nova solicitação de exames - ${file.nameOfExam}`,
          mailText,
          mailText
        );
        file.uploadCode = uploadCode;
        file.sentToLab = true;
        await file.save();
      }
      return "Arquivos enviados com sucesso";
    } catch (e) {
      console.log("Erro:", e);
      return { erro: "Falha ao criar arquivo" };
    }
  }

  static async DownloadAttachment(key) {
    try {
      const service = new S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_KEY,
      });
      const params = {
        Bucket: process.env.AWS_S3BUCKET,
        Key: `${key}`,
      };
      return new Promise((resolve, reject) => {
        service.getObject(params, (err, data) => {
          if (err) {
            console.log("Erro na busca de anexo:", err);
            reject({
              statusCode: 400,
              payload: "Erro na busca de anexo",
            });
          }
          resolve({
            statusCode: 201,
            payload: data,
          });
        });
      });
    } catch (e) {
      console.log("Erro em DownloadAttachment:", e);
      return {
        payload: "Falha na busca de arquivo.",
        statusCode: 400,
      };
    }
  }

  static async CreateAttachment(id, file, filename, mimetype, code) {
    try {
      let data = await FileModel.findById(id);
      if (data.uploadCode !== code) throw "Código inválido";
      const service = new S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_KEY,
      });
      const params = {
        Bucket: process.env.AWS_S3BUCKET,
        Key: `${data._id}`,
        Body: file,
      };
      return new Promise((resolve, reject) => {
        service.upload(params, async (err, res) => {
          if (err) {
            console.log("Erro:", err);
            reject({
              statusCode: 400,
              payload: "Erro na criação de anexo",
            });
          }
          data.filename = filename;
          data.key = params.Key;
          data.mimetype = mimetype;
          await data.save();
          resolve({
            statusCode: 201,
            payload: "Anexo salvo com sucesso",
          });
        });
      });
    } catch (e) {
      console.log("Erro em CreateAttachment:", e);
      return {
        payload: "Falha na criação do anexo.",
        statusCode: 400,
      };
    }
  }
};
