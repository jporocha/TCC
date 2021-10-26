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

  static async EditAppointment(id, changes) {
    try {
      let userExists = await AppointmentModel.findByIdAndUpdate(id, changes);
      if (!userExists._id) throw "Falha no update";
      return {
        payload: "Alterações realizadas com sucesso",
        statusCode: 200,
      };
    } catch (e) {
      return {
        payload: "Horário não encontrado",
        statusCode: 400,
      };
    }
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

  static async FetchAppointments(payload) {
    try {
      let query = payload ? payload : {};
      let appointments = await AppointmentModel.find(query)
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
