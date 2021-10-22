const PatientModel = require("../models/PatientModel");

module.exports = class PatientService {
  constructor() {}

  static async CreatePatient(patient) {
    try {
      let newPatient = new PatientModel(patient);
      await newPatient.save();
      return {
        payload: "Paciente criado com sucesso",
        statusCode: 201,
      };
    } catch (e) {
      return {
        payload: "Falha ao criar paciente",
        statusCode: 400,
      };
    }
  }

  static async FetchPatients() {
    let patients = await PatientModel.find();
    if (patients.length >= 0)
      return {
        payload: patients,
        statusCode: 200,
      };
    return {
      payload: "Falha ao buscar pacientes",
      statusCode: 400,
    };
  }

  static async EditPatient(id, changes) {
    let patient = await PatientModel.findByIdAndUpdate(id, changes);
    if (patient)
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
