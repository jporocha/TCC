const AppointmentModel = require("../models/AppointmentModel");
const EncryptionModel = require("../models/EncryptPairModel");
const EncryptionPair = new EncryptionModel();

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

  static async SaveAppointment(dados) {
    try {
      let appointment = await AppointmentModel.findById(dados._id);
      const patient = appointment.patientId;
      let notas = JSON.stringify(dados.doctorNotes);
      let encryptedNotes = await EncryptionPair.encryptData(patient, notas);
      appointment.encryptedNotes = encryptedNotes;
      dados.exams.forEach((el) => {
        appointment.exams.push(el);
      });
      dados.prescription.forEach((el) => {
        appointment.prescription.push(el);
      });
      appointment.start = dados.start;
      appointment.end = dados.end;
      appointment.save();
      return {
        payload: "Notas salvas com sucesso.",
        statusCode: 200,
      };
    } catch (e) {
      console.log(e);
      return {
        payload: "Falha no armazenamento dos dados.",
        statusCode: 400,
      };
    }
  }

  static async LoadNotes(id) {
    try {
      let appointment = await AppointmentModel.findById(id);
      const notas = appointment.encryptedNotes;
      const patientId = appointment.patientId;
      let decryptedNotes = await EncryptionPair.decryptData(patientId, notas);
      return {
        payload: decryptedNotes,
        statusCode: 200,
      };
    } catch (e) {
      console.log(e);
      return {
        payload: "Falha no armazenamento dos dados.",
        statusCode: 400,
      };
    }
  }
};
