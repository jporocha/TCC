<template>
  <div>
    <v-card max-width="700px">
      <v-card-title>{{ boxName }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" lg="6">
              <v-autocomplete
                v-model="doctor"
                prepend-icon="mdi-doctor"
                outlined
                dense
                :items="doctors"
                @change="loadHistory"
                label="Médico"
                item-text="name"
                item-value="_id"
              ></v-autocomplete>
              <div class="caption mx-4" v-if="doctor" v-html="doctorInfo"></div>
            </v-col>
            <v-col cols="12" lg="6">
              <v-autocomplete
                v-model="patient"
                prepend-icon="mdi-account-circle"
                outlined
                :items="patients"
                @change="loadHistory"
                dense
                label="Paciente"
                item-text="name"
                item-value="_id"
              ></v-autocomplete>
              <div
                class="caption mx-4"
                v-if="patient"
                v-html="patientInfo"
              ></div>
            </v-col>
            <v-col cols="12" lg="6">
              <v-menu
                v-model="menuDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formattedDate"
                    dense
                    outlined
                    readonly
                    label="Data da consulta"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="appointmentDate"
                  :allowed-dates="allowed"
                  locale="pt-br"
                  :min="today"
                  @input="menuDate = false"
                  @change="generateTimeTable"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="6">
              <v-alert
                dense
                border="bottom"
                :color="alertColor"
                v-if="alertLast"
              >
                {{ alertLast }}</v-alert
              >
              <v-alert
                dense
                border="bottom"
                :color="alertColor"
                v-if="alertNext"
              >
                {{ alertNext }}</v-alert
              >
            </v-col>
          </v-row>
          <section v-if="doctor && patient && appointmentDate">
            <v-divider class="mb-6"></v-divider>
            <v-row>
              <v-col cols="12" lg="6">
                <v-select
                  prepend-icon="mdi-menu"
                  v-model="selectedTipo"
                  outlined
                  :items="tipoConsulta"
                  dense
                  label="Tipo de consulta"
                  :disabled="!doctor || !patient"
                  @change="generateTimeTable"
                ></v-select>
              </v-col>

              <v-col cols="12" lg="6">
                <v-select
                  :key="availableSlots.length"
                  prepend-icon="mdi-clock"
                  v-model="selectedSlot"
                  outlined
                  :items="availableSlots"
                  dense
                  label="Horário"
                ></v-select>
              </v-col>
            </v-row>
          </section>
        </v-form>
      </v-card-text>
      <v-divider class="mx-2"></v-divider>
      <v-card-actions>
        <v-btn text color="red" @click="closeEdit">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="busy" text color="green" @click="saveData"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

export default {
  props: {
    idConsulta: {
      type: String,
      default: null,
    },
  },
  computed: {
    boxName() {
      return this.idConsulta ? "Alterar dados da consulta" : "Nova consulta";
    },
    filterDates() {
      let values = [];
      let allowedDates = this.doctors.find(
        (el) => el._id === this.doctor
      ).disponibilidade;
      let today = dayjs();
      let finish = today.add(2, "months");
      while (today < finish) {
        if (allowedDates.includes(today.day()))
          values.push(today.format("YYYY-MM-DD"));
        today = today.add(1, "day");
      }
      return values;
    },
    formattedDate() {
      return this.appointmentDate
        ? dayjs(this.appointmentDate).format("DD/MM/YYYY")
        : "";
    },
    doctorInfo() {
      let doctor = this.doctors.find((el) => el._id === this.doctor);
      let data = `<strong>Nome:</strong> ${
        doctor.name
      }<br /><strong>Especialidades:</strong> ${doctor.emphasis.join(
        ", "
      )}<br /><strong>Convênios:</strong> ${doctor.partners.join(", ")}`;
      return data;
    },
    patientInfo() {
      let patient = this.patients.find((el) => el._id === this.patient);
      let data = `<strong>Nome:</strong> ${patient.name}<br /><strong>Telefone de contato:</strong> ${patient.cellPhone}<br />`;
      return data;
    },
  },
  data() {
    return {
      patient: null,
      patients: [],
      doctor: null,
      doctors: [],
      appointmentDate: null,
      today: dayjs().format("YYYY-MM-DD"),
      menuDate: false,
      availableSlots: [],
      selectedSlot: null,
      tipoConsulta: ["Consulta", "Retorno"],
      selectedTipo: null,
      busy: false,
      alertLast: null,
      alertNext: null,
      alertColor: "red lighten-4",
    };
  },
  methods: {
    allowed(data) {
      return this.filterDates.includes(dayjs(data).format("YYYY-MM-DD"));
    },
    saveData() {
      let method = this.idConsulta ? "put" : "post";
      let address = this.idConsulta
        ? `edit/${this.idConsulta}`
        : "createAppointment";
      let payload = {
        patientId: this.patient,
        doctorId: this.doctor,
        date: `${this.appointmentDate}T${this.selectedSlot}:00.000`,
        tipo: this.selectedTipo,
      };
      this.busy = true;
      axios[method](`/appointment/${address}`, payload)
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: "Consulta criada com sucesso",
          });
          this.$emit("close", true);
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
          this.busy = false;
        });
    },
    closeEdit() {
      this.$emit("close", false);
    },
    generateTimeTable() {
      if (!this.doctor || !this.appointmentDate) return;
      let payload = {
        doctorId: this.doctor,
        date: this.appointmentDate,
      };
      dayjs.extend(isSameOrBefore);
      axios
        .post("/appointment/getSlots", payload)
        .then((res) => {
          let unavailable = res.data;
          let currentIndex = 0;
          let maxIndex = unavailable.length;
          let duration = this.selectedTipo === "Consulta" ? 30 : 15;
          let start = dayjs(`${this.appointmentDate}T08:00:00.000`);
          this.availableSlots = [];
          while (start.hour() < 18) {
            if (currentIndex === maxIndex) {
              this.availableSlots.push(start.format("HH:mm"));
              start = start.add(15, "minutes");
            } else if (
              start
                .add(duration, "minutes")
                .isSameOrBefore(dayjs(unavailable[currentIndex].date))
            ) {
              this.availableSlots.push(start.format("HH:mm"));
              start = start.add(15, "minutes");
            } else {
              let inc = unavailable[currentIndex].tipo === "Consulta" ? 30 : 15;
              start = dayjs(unavailable[currentIndex].date).add(inc, "minutes");
              currentIndex++;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetDate() {
      this.appointmentDate = null;
    },
    loadDoctors() {
      axios
        .get("/users/doctors")
        .then((res) => {
          this.doctors = res.data;
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
        });
    },
    loadPatients() {
      axios
        .get("/patients")
        .then((res) => {
          this.patients = res.data;
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
        });
    },
    loadHistory() {
      this.resetDate();
      if (!this.doctor || !this.patient) return;
      axios
        .get(`/appointment/byPatient/${this.patient}`)
        .then((res) => {
          let consultas = res.data;
          if (!consultas.length) {
            this.alertLast = "Primeira consulta na clínica";
            this.alertNext = null;
            this.alertColor = "green lighten-4";
          } else {
            let filtered = res.data.filter(
              (el) => el.doctorId._id === this.doctor
            );
            if (!filtered.length) {
              this.alertLast = "Primeira consulta com o médico";
              this.alertColor = "green lighten-4";
              this.alertNext = null;
              return;
            }
            let foundNext = false;
            let indexLast;
            let indexNext;
            let index = 0;
            while (!foundNext && index < filtered.length) {
              if (dayjs(filtered[index].date).isAfter(dayjs())) {
                indexLast = index - 1;
                indexNext = index;
                foundNext = true;
              }
              index++;
            }
            if (!foundNext) indexLast = 0;
            let last = indexLast >= 0 ? filtered[indexLast] : null;
            let next = indexNext >= 0 ? filtered[indexNext] : null;
            this.alertLast = last
              ? `Ultima consulta em ${dayjs(last.date).format("DD/MM/YY")}.`
              : "Novo paciente do médico.";
            this.alertNext = next
              ? `${next.tipo} em ${dayjs(next.date).format("DD/MM/YY")}.`
              : null;
            this.alertColor = "yellow lighten-4";
          }
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
        });
    },
  },
  mounted() {
    this.loadDoctors();
    this.loadPatients();
    this.generateTimeTable();
  },
};
</script>

<style scoped>
</style>