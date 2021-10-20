const ExamsModel = require("../models/ExamsModel");

module.exports = class ExamsService {
  constructor() {}

  static async CreateExam(exam) {
    try {
      let query = Object.assign({}, exam);
      delete query.enabled;
      const alreadyExists = await ExamsModel.find(query);
      if (alreadyExists.length)
        return {
          payload: "Exame já possui cadastro na base",
          statusCode: 400,
        };
      let dbItem = new ExamsModel(exam);
      await dbItem.save();
      return {
        payload: "Exame inserido com sucesso",
        statusCode: 201,
      };
    } catch (e) {
      return {
        payload: "Falha ao criar exame",
        statusCode: 400,
      };
    }
  }

  static async FetchExams() {
    let dados = await ExamsModel.find();
    if (!dados) {
      return {
        payload: "Falha ao realizar consulta.",
        statusCode: 400,
      };
    }
    return {
      payload: dados,
      statusCode: 200,
    };
  }

  static async EditExam(id, data) {
    let altered = await ExamsModel.findByIdAndUpdate(id, data);
    if (altered)
      return {
        payload: "Alteração realizada com sucesso.",
        statusCode: 200,
      };
    return {
      payload: "Falha ao realizar alteração.",
      statusCode: 400,
    };
  }
};
