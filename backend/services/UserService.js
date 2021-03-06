const UserModel = require("../models/UserModel");
const User = new UserModel();

module.exports = class UserService {
  constructor() {}

  static async CreateUser(user) {
    let response = await User.createUser(user);
    if (response.user) {
      return {
        payload: response.user,
        statusCode: 201,
      };
    } else {
      return {
        payload: response.error,
        statusCode: 400,
      };
    }
  }

  static async CreateAccessToken(email) {
    let userExists = await UserModel.find({ email: email, enabled: true });
    if (!userExists.length)
      return {
        payload: "E-mail não cadastrado",
        statusCode: 400,
      };
    let response = await User.createAccessToken(userExists[0]._id);
    return {
      payload: response.msg ? response.msg : response.error,
      statusCode: response.msg ? 200 : 400,
    };
  }

  static async RecoverPassword(email) {
    let userExists = await UserModel.find({ email: email, enabled: true });
    if (!userExists.length)
      return {
        payload: "E-mail não cadastrado",
        statusCode: 400,
      };
    let response = await User.createToken(userExists[0]._id);
    return {
      payload: response.msg ? response.msg : response.error,
      statusCode: response.msg ? 200 : 400,
    };
  }

  static async ResetPassword(email, token, newPassword) {
    let userExists = await UserModel.findOne({ email: email, enabled: true });

    if (!userExists)
      return {
        payload: "E-mail não cadastrado",
        statusCode: 400,
      };

    let response = await User.changePassword(
      userExists._id,
      token,
      newPassword
    );
    return {
      payload: response.msg ? response.msg : response.error,
      statusCode: response.msg ? 200 : 400,
    };
  }

  static async SignIn(user) {
    let response = await User.validateLogin(user);
    if (response.user) {
      return {
        payload: response.user,
        statusCode: 201,
      };
    } else {
      return {
        payload: response.error,
        statusCode: 401,
      };
    }
  }

  static async FetchUsers(query) {
    let users = await UserModel.find(query).sort({ name: 1 });
    if (users)
      return {
        payload: users,
        statusCode: 200,
      };
    return {
      payload: "Falha ao buscar usuários",
      statusCode: 400,
    };
  }

  static async EditUser(id, changes) {
    let users = await UserModel.findByIdAndUpdate(id, changes);
    if (users)
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
