<template>
  <div>
    <v-card max-width="600px">
      <v-card-title>{{ boxName }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" lg="6">
              <v-autocomplete
                v-model="doctor"
                outlined
                dense
                :items="doctors"
                label="Médico"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" lg="6">
              <v-autocomplete
                v-model="patient"
                outlined
                :items="patients"
                dense
                label="Paciente"
              ></v-autocomplete>
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
                  locale="pt-br"
                  @input="menuDate = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" lg="6">
              <v-select
                v-model="selectedSlot"
                outlined
                :items="availableSlots"
                dense
                label="Horário"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="6">
              <v-select
                v-model="selectedTipo"
                outlined
                :items="tipoConsulta"
                dense
                label="Tipo de consulta"
              ></v-select>
            </v-col>
          </v-row>
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
    formattedDate() {
      return dayjs(this.appointmentDate).format("DD/MM/YYYY");
    },
  },
  data() {
    return {
      patient: null,
      patients: [],
      doctor: null,
      doctors: [],
      appointmentDate: dayjs().format("YYYY-MM-DD"),
      menuDate: false,
      availableSlots: [],
      selectedSlot: null,
      tipoConsulta: ["Consulta", "Retorno"],
      selectedTipo: null,
      busy: false,
    };
  },
  methods: {
    saveData() {
      let method = this.idConsulta ? "put" : "post";
      let address = this.idConsulta ? `edit/${this.idConsulta}` : "";
      this.busy = true;
      axios[method](`/appointments/${address}`, this.activeMedicine)
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: "Dados salvos com sucesso",
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
    loadPatients() {
      axios
        .get("/users")
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("Erro:", err);
        });
    },
  },
  mounted() {
    this.loadPatients();
  },
};
</script>

<style scoped>
</style>