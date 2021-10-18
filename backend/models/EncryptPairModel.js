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
  encryptedId: String,
  encryptionKey: String,
  encryptionIv: String,
});

let createPair = async function (patientId) {
  try {
    const hashedId = await bcrypt.hash(patientId + idPepper, 8);
    let pairExists = await mongoose
      .model("EncryptPair")
      .findOne({ encryptedId: hashedId });
    if (pairExists) throw "Já existe chave para o paciente informado.";
    let cryptoKey = crypto.randomBytes(32);
    let cryptoIv = crypto.randomBytes(16);
    const pair = {
      encryptedId: hashedId,
      encryptionKey: cryptoKey,
      encriptionIv: cryptoIv,
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
    const hashedId = await bcrypt.hash(patientId + idPepper, 8);
    let pairExists = await mongoose
      .model("EncryptPair")
      .findOne({ encryptedId: hashedId });
    if (!pairExists) {
      pairExists = createPair(patientId);
      if (pairExists.error) throw "Falha ao criar criptografia";
    }
    let key = pairExists.encriptionKey;
    let iv = pairExists.encriptionIv;
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(doctorNotes);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { encryptedData: encrypted.toString("hex") };
  } catch (e) {
    return { error: e };
  }
};

encryptionSchema.methods.decryptData = async function (patientId, doctorNotes) {
  try {
    const hashedId = await bcrypt.hash(patientId + idPepper, 8);
    let pairExists = await mongoose
      .model("EncryptPair")
      .findOne({ encryptedId: hashedId });
    if (!pairExists)
      throw "Não existe chave de criptografia para o paciente informado.";
    let key = pairExists.encriptionKey;
    let iv = pairExists.encriptionIv;
    let newIv = Buffer.from(iv, "hex");
    let encryptedText = Buffer.from(doctorNotes, "hex");
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), newIv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return { notes: decrypted.toString() };
  } catch (e) {
    return { error: e };
  }
};

const model = mongoose.model("EncryptPair", encryptionSchema);

module.exports = model;
