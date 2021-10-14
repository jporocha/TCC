const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const pepper = process.env.PEPPER;
const mailer = require("../helpers/nodemailer");

if (!pepper) {
  console.log("Sem PEPPER nas variaveis de ambiente");
  process.exit(1);
}

let AddressSchema = new mongoose.Schema({
  rua: String,
  numero: String,
  complemento: String,
  bairro: String,
  cep: String,
  cidade: String,
  estado: String,
});

let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  passwordHash: { type: String, required: false },
  role: { type: String, default: "" },
  emphasis: String,
  partners: String,
  refreshPassToken: String,
  refreshExpiration: Date,
  accessToken: String,
  accessExpiration: Date,
  dateOfBirth: String,
  cellPhone: String,
  addr: AddressSchema,
  nameOfMother: String,
  salary: Number,
  hourlyRate: Number,
  enabled: Boolean,
});

// Para cadastro de usuário
userSchema.methods.createUser = async function (user) {
  try {
    let userExists = await mongoose
      .model("User")
      .findOne({ email: user.email });
    if (userExists) throw "E-mail já cadastrado.";
    user.password = user.password
      ? user.password
      : crypto.randomBytes(20).toString("hex");
    user.passwordHash = await bcrypt.hash(user.password + pepper, 8);
    delete user.password;
    let newUser = new mongoose.model("User")(user);
    await newUser.save();
    return { user: "Usuário criado com sucesso." };
  } catch (e) {
    return { error: e };
  }
};

// Para login de usuário
userSchema.methods.validateLogin = async function (user) {
  try {
    const userExists = await mongoose
      .model("User")
      .findOne({ email: user.email });
    if (!userExists) throw "Usuário ou senha inválidos.";
    if (!user.accessToken) {
      const validateUser = await bcrypt.compare(
        `${user.password}${pepper}`,
        userExists.passwordHash
      );
      if (!validateUser) throw "Usuário ou senha inválidos.";
    } else {
      if (!userExists.accessToken || user.accessToken != userExists.accessToken)
        throw "Token de acesso inválido";
      userExists.accessToken = null;
    }
    return { user: userExists };
  } catch (e) {
    return { error: e };
  }
};

// Criar token de recuperação
userSchema.methods.createToken = async function (id) {
  try {
    const userExists = await mongoose.model("User").findById(id);
    userExists.refreshPassToken = crypto.randomBytes(20).toString("hex");
    userExists.refreshExpiration = new Date();
    await userExists.save();
    await mailer(
      userExists.email,
      "Seu token para recuperação de senha",
      userExists.refreshPassToken,
      userExists.refreshPassToken
    );
    return {
      msg: "Token de recuperação de senha criado com sucesso. Verifique seu e-mail.",
    };
  } catch (e) {
    return { error: e };
  }
};

// Criar token de acesso único
userSchema.methods.createAccessToken = async function (id) {
  try {
    const userExists = await mongoose.model("User").findById(id);
    userExists.accessExpiration = new Date();
    userExists.accessToken = crypto.randomBytes(20).toString("hex");
    await userExists.save();
    await mailer(
      userExists.email,
      "Seu token para acesso",
      userExists.accessToken,
      userExists.accessToken
    );
    return { msg: "Token de acesso criado com sucesso. Verifique seu e-mail." };
  } catch (e) {
    return { error: e };
  }
};

// Alterar senha
userSchema.methods.changePassword = async function (id, token, newPass) {
  try {
    let userExists = await mongoose.model("User").findById(id);
    if (!userExists) throw "Usuário não encontrado";
    if (!userExists.refreshPassToken || userExists.refreshPassToken != token)
      throw "Token inválido";
    userExists.passwordHash = await bcrypt.hash(newPass + pepper, 8);
    userExists.refreshPassToken = undefined;
    await userExists.save();
    return { msg: "Senha alterada com sucesso." };
  } catch (e) {
    return { error: e };
  }
};

const model = mongoose.model("User", userSchema, "Users");

module.exports = model;
