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
            label="Histórico da moléstia"
            v-model="doctorNotes.historicoMolestia"
            placeholder="Histórico de progressão da moléstia, quando possível."
            @change="emitChanges"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="Exame físico"
            v-model="doctorNotes.historicoMolestia"
            placeholder="Detalhamento do exame físico do paciente"
            @change="emitChanges"
          ></v-textarea>
          <v-textarea
            outlined
            dense
            label="Exames apresentados"
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
        exameFisico: "",
        examesApresentados: "",
        hipoteseDiagnostica: "",
        Condutas: "",
      },
    };
  },
  methods: {
    emitChanges() {
      this.$emit("notesChanged", this.doctorNotes);
    },
  },
};
</script>

<style scoped>
</style>