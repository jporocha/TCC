<template>
  <div>
    <h3 class="text-center">Consulta {{ index + 1 }}</h3>
    <v-card-text>
      <v-row>
        <template v-for="field in fields">
          <v-col
            cols="12"
            lg="6"
            :key="field.model"
            v-if="showProp(field.model)"
          >
            <v-row>
              <v-col cols="5" class="text-right font-weight-bold"
                >{{ field.name }}:</v-col
              >
              <v-col cols="7" v-html="showVal(field)"></v-col>
            </v-row>
          </v-col>
        </template>
      </v-row>
      <v-divider class="my-2"></v-divider>
      <section v-if="consulta.exams.length">
        <h4 class="text-center">Exames solicitados</h4>
        <v-row>
          <v-col
            v-for="exam in consulta.exams"
            cols="12"
            md="4"
            :key="exam._id"
          >
            <div class="text-center">
              <strong>Nome do exame: </strong>{{ exam.name }}<br />
              <strong>Resultado: </strong>
              <template v-if="exam.result.key">
                <u class="anchor" @click="download(exam.result)">Download</u>
              </template>
              <template v-else> - </template>
            </div>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
      </section>
      <v-row v-if="notes">
        <template v-for="field in campos">
          <v-col
            cols="12"
            lg="6"
            :key="field.model"
            v-if="showData(field.model)"
          >
            <v-row>
              <v-col cols="5" class="text-right font-weight-bold"
                >{{ field.name }}:</v-col
              >
              <v-col cols="7" v-html="showNote(field.model)"></v-col>
            </v-row>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
export default {
  props: {
    consulta: {
      type: Object,
      default: () => {
        return {};
      },
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    this.loadNotes();
  },
  methods: {
    showProp(prop) {
      return this.consulta[prop] &&
        (this.consulta[prop].length || this.consulta[prop].name) &&
        prop != "exams"
        ? true
        : false;
    },
    download(exam) {
      axios
        .post(`/file/download`, exam, {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", exam.filename);
          document.body.appendChild(link);
          link.click();
          this.$root.vtoast.show({
            color: "green",
            message: "Download realizado",
          });
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
          });
        });
    },
    showData(prop) {
      return this.notes[prop] ? true : false;
    },
    showNote(model) {
      return this.notes[model];
    },
    showVal(item) {
      let value =
        item.model === "doctorId"
          ? this.consulta.doctorId.name
          : this.consulta[item.model];
      if (item.type === "date") {
        return dayjs(value).format("DD/MM/YY[ às ]HH:mm");
      } else if (item.type === "array") {
        let retorno = [];
        if (item.model === "prescription") {
          value.forEach((el) => {
            retorno.push(`${el.medicine} - ${el.dosage}<br />${el.posologia}`);
          });
        } else {
          value.map((el) => {
            retorno.push(
              `${el.name} <br /> ${
                el.result.filename ? "Download" : "Sem resultado"
              } <br />`
            );
          });
        }
        return retorno.join("<br />");
      } else {
        return value;
      }
    },
    loadNotes() {
      axios
        .get(`/appointment/decryptedNotes/${this.consulta._id}`)
        .then((res) => {
          let dados = res.data;
          this.notes = {};
          for (const prop in dados) {
            if (dados[prop]) this.notes[prop] = dados[prop];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      fields: [
        {
          model: "date",
          type: "date",
          name: "Data da consulta",
        },
        {
          model: "doctorId",
          type: "string",
          name: "Médico",
        },
        {
          model: "prescription",
          type: "array",
          name: "Medicamentos prescritos",
        },
        {
          model: "exams",
          type: "array",
          name: "Exames solicitados",
        },
      ],
      campos: [
        {
          model: "queixaPrincipal",
          name: "Queixa principal",
        },
        {
          model: "historicoMolestia",
          name: "Histórico da doença",
        },
        {
          model: "historicoFamiliar",
          name: "História pregressa e familiar",
        },
        {
          model: "exameFisico",
          name: "Exame físico",
        },
        {
          model: "examesApresentados",
          name: "Exames pregressos",
        },
        {
          model: "hipoteseDiagnostica",
          name: "Hipotese diagnóstica",
        },
        {
          model: "condutas",
          name: "Conduta",
        },
      ],
      notes: null,
    };
  },
};
</script>

<style scoped>
.anchor {
  color: blue;
  cursor: pointer;
}
</style>