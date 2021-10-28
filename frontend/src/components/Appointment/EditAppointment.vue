<template>
  <div>
    <v-card class="px-2 py-4">
      <v-card-title>Anamnese</v-card-title>
      <v-card-text>
        <v-form>
          <v-textarea
            outlined
            dense
            height="40"
            label="Queixa principal"
            placeholder="Queixa principal do paciente"
            v-model="doctorNotes.queixaPrincipal"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="Histórico da doença atual"
            v-model="doctorNotes.historicoMolestia"
            placeholder="Histórico de progressão da moléstia, quando possível."
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="História pregressa e familiar"
            v-model="doctorNotes.historicoFamiliar"
            placeholder="Histórico próprio e familiar do paciente"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="Exame físico"
            v-model="doctorNotes.exameFisico"
            placeholder="Detalhamento do exame físico do paciente"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="Exames pregressos"
            v-model="doctorNotes.examesApresentados"
            placeholder="Dados sobre exames apresentados durante a consulta"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            height="80"
            label="Hipotese diagnóstica"
            v-model="doctorNotes.hipoteseDiagnostica"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            height="80"
            label="Conduta"
            v-model="doctorNotes.condutas"
            placeholder="Condutas médicas para paciente após consulta"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text small color="red" @click="emitClose">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn text small color="green" @click="saveChanges" :disabled="busy"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      doctorNotes: {
        queixaPrincipal: "",
        historicoMolestia: "",
        historicoFamiliar: "",
        exameFisico: "",
        examesApresentados: "",
        hipoteseDiagnostica: "",
        condutas: "",
      },
      busy: false,
    };
  },
  methods: {
    loadDecrypted() {
      axios
        .get(`/appointment/decryptedNotes/${this.id}`)
        .then((res) => {
          this.doctorNotes = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    saveChanges() {
      let payload = {
        id: this.id,
        doctorNotes: this.doctorNotes,
      };
      this.busy = true;
      axios
        .put(`/appointment/appointmentReview`, payload)
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: res.data,
          });
          this.busy = false;
          this.emitClose();
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
    emitClose() {
      this.$emit("close");
    },
  },
  mounted() {
    this.loadDecrypted();
  },
};
</script>

<style scoped>
</style>