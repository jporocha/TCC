const AppointmentModel = require("../models/AppointmentModel");
const EncryptionModel = require("../models/EncryptPairModel");

module.exports = class UserService {
  constructor() {}

  static async CreateAppointment(slot) {
    try {
      let newAppointment = new AppointmentModel(slot);
      await newAppointment.save();
      return {
        payload: "Horário criado com sucesso.",
        statusCode: 201,
      };
    } catch (e) {
      return {
        payload: "Falha ao criar consulta",
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

  static async FetchPatientAppointments(patientId) {
    try {
      let appointments = await AppointmentModel.find({
        patientId,
      })
        .sort({ date: 1 })
        .populate("doctorId");
      return {
        payload: appointments.filter((el) => !el.cancel),
        statusCode: 200,
      };
    } catch (e) {
      return {
        payload: e,
        statusCode: 400,
      };
    }
  }

  static async FetchAppointments() {
    try {
      let appointments = await AppointmentModel.find()
        .sort({ date: 1 })
        .populate("doctorId")
        .populate("patientId");
      return {
        payload: appointments.filter((el) => !el.cancel),
        statusCode: 200,
      };
    } catch (e) {
      return {
        payload: e,
        statusCode: 400,
      };
    }
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
