const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const idPepper = process.env.PEPPER_ID;

if (!idPepper) {
  console.log("Sem pepper de criptografia nas variaveis de ambiente");
  process.exit(1);
}

let encryptionSchema = new mongoose.Schema({
  id: String,
  encryptionKey: String,
  encryptionIv: String,
});

let createPair = async function (patientId) {
  try {
    let cryptoKey = crypto.randomBytes(32);
    let cryptoIv = crypto.randomBytes(16);
    const pair = {
      id: patientId,
      encryptionKey: cryptoKey.toString("hex").slice(0, 32),
      encryptionIv: cryptoIv.toString("hex").slice(0, 16),
    };
    let newPair = new mongoose.model("EncryptPair")(pair);
    await newPair.save();
    return newPair;
  } catch (e) {
    return { error: e };
  }
};

encryptionSchema.methods.encryptData = async function (patientId, doctorNotes) {
  try {
    let pairExists = await mongoose
      .model("EncryptPair")
      .findOne({ id: patientId });
    if (!pairExists) {
      console.log("Criando novo par");
      pairExists = await createPair(patientId);
      if (pairExists.error) throw "Falha ao criar criptografia";
    }
    let key = pairExists.encryptionKey;
    let iv = pairExists.encryptionIv;
    let cipher = await crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(doctorNotes, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (e) {
    return { error: e };
  }
};

encryptionSchema.methods.decryptData = async function (id, doctorNotes) {
  try {
    let pairExists = await mongoose.model("EncryptPair").findOne({ id: id });
    if (!pairExists)
      throw "Não existe chave de criptografia para o paciente informado.";
    let key = pairExists.encryptionKey;
    let iv = pairExists.encryptionIv;
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(doctorNotes, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } catch (e) {
    return { error: e };
  }
};

const model = mongoose.model("EncryptPair", encryptionSchema);

module.exports = model;
