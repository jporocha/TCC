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
            @change="emitChanges"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="Histórico da doença atual"
            v-model="doctorNotes.historicoMolestia"
            placeholder="Histórico de progressão da moléstia, quando possível."
            @change="emitChanges"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="História pregressa e familiar"
            v-model="doctorNotes.historicoFamiliar"
            placeholder="Histórico próprio e familiar do paciente"
            @change="emitChanges"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="Exame físico"
            v-model="doctorNotes.exameFisico"
            placeholder="Detalhamento do exame físico do paciente"
            @change="emitChanges"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="Exames pregressos"
            v-model="doctorNotes.examesApresentados"
            placeholder="Dados sobre exames apresentados durante a consulta"
            @change="emitChanges"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            height="80"
            label="Hipotese diagnóstica"
            v-model="doctorNotes.hipoteseDiagnostica"
            @change="emitChanges"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            height="80"
            label="Conduta"
            v-model="doctorNotes.condutas"
            placeholder="Condutas médicas para paciente após consulta"
            @change="emitChanges"
          ></v-textarea>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctorNotes: {
        queixaPrincipal: "",
        historicoMolestia: "",
        historicoFamiliar: "",
        exameFisico: "",
        examesApresentados: "",
        hipoteseDiagnostica: "",
        Condutas: "",
      },
    };
  },
  methods: {
    emitChanges() {
      let payload = {
        field: "doctorNotes",
        payload: this.doctorNotes,
      };
      this.$store.dispatch("SAVE_CHANGES", payload);
    },
  },
  mounted() {
    this.doctorNotes = this.$store.getters.getAppointment.doctorNotes;
  },
};
</script>

<style scoped>
</style>