const AppointmentModel = require("../models/AppointmentModel");
const EncryptionModel = require("../models/EncryptPairModel");

module.exports = class UserService {
  constructor() {}

  static async CreateAppointment(slot) {
    let response = await AppointmentModel.createUser(user);
    if (!response.error) {
      return {
        payload: "Horário criado com sucesso.",
        statusCode: 201,
      };
    } else {
      return {
        payload: response.error,
        statusCode: 400,
      };
    }
  }

  static async EditAppointment(slot, changes) {
    let userExists = await AppointmentModel.findByIdAndUpdate(slot, changes);
    if (!userExists.length)
      return {
        payload: "Horário não encontrado",
        statusCode: 400,
      };
    return {
      payload: "Alterações realizadas com sucesso",
      statusCode: response.msg ? 200 : 400,
    };
  }

  static async InsertNotes(slotId, anamnese) {
    let appointment = await AppointmentModel.findById(slotId);
    let patient = appointment.patientId;
    let encryptedNotes = await EncryptionModel.encryptData(patient, anamnese);
    appointment.encryptedNotes = encryptedNotes;
    appointment.save();
    return {
      payload: "Notas salvas com sucesso.",
      statusCode: 400,
    };
  }
};
