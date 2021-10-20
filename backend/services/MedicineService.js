const MedicineModel = require("../models/MedicineModel");

module.exports = class MedicineService {
  constructor() {}

  static async CreateMedication(medicine) {
    try {
      let query = Object.assign({}, medicine);
      delete query.enabled;
      const alreadyExists = await MedicineModel.find(query);
      if (alreadyExists.length)
        return {
          payload: "Medicamento já possui cadastro na base",
          statusCode: 400,
        };
      let dbItem = new MedicineModel(medicine);
      await dbItem.save();
      return {
        payload: "Medicamento criado com sucesso",
        statusCode: 201,
      };
    } catch {
      return {
        payload: "Falha ao criar medicamento",
        statusCode: 400,
      };
    }
  }

  static async FetchMedications() {
    let dados = await MedicineModel.find();
    if (!dados) {
      return {
        payload: "Falha ao buscar dados.",
        statusCode: 400,
      };
    }
    return {
      payload: dados,
      statusCode: 200,
    };
  }

  static async EditMedication(id, data) {
    let altered = await MedicineModel.findByIdAndUpdate(id, data);
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
