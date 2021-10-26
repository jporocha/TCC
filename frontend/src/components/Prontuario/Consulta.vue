<template>
  <div>
    Consulta {{ index + 1 }}
    <v-row>
      <template v-for="field in fields">
        <v-col cols="12" lg="6" :key="field.model" v-if="showProp(field.model)">
          <v-row>
            <v-col cols="6">{{ field.name }}</v-col>
            <v-col cols="6" v-html="showVal(field)"></v-col>
          </v-row>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
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
  methods: {
    showProp(prop) {
      return this.consulta[prop] &&
        (this.consulta[prop].length || this.consulta[prop].name)
        ? true
        : false;
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
            retorno.push(`${el.name}`);
          });
        }
        return retorno.join("<br />");
      } else {
        return value;
      }
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
          model: "tipo",
          type: "string",
          name: "Tipo de consulta",
        },
        {
          model: "start",
          type: "date",
          name: "Início da consulta",
        },
        {
          model: "end",
          type: "date",
          name: "Término da consulta",
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
    };
  },
};
</script>

<style scoped>
</style>