const UserModel = require("./../models/UserModel");

module.exports = function (requestedRole) {
  return async (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(400).send("Usuário não possui sessão ativa");
    let userInDB = await UserModel.findById(user.id);
    if (!userInDB.role || userInDB.role !== requestedRole)
      return res.status(403).send("Acesso bloqueado");
    next();
  };
};
