<template>
  <div>
    <v-card max-width="500px">
      <v-card-title>{{ boxName }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="exam.name"
            outlined
            dense
            label="Nome"
          ></v-text-field>
          <v-checkbox
            dense
            label="Habilitado"
            v-model="exam.enabled"
          ></v-checkbox>
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

export default {
  computed: {
    boxName() {
      return this.dataId ? "Edição de exame" : "Cadastro de exame";
    },
  },
  props: {
    entry: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      exam: {
        name: "",
        enabled: true,
      },
      busy: false,
    };
  },
  methods: {
    saveData() {
      let method = this.exam._id ? "put" : "post";
      let address = this.exam._id ? `edit/${this.exam._id}` : "";
      this.busy = true;
      axios[method](`/exams/${address}`, this.exam)
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
  },
  mounted() {
    if (this.entry) this.exam = this.entry;
  },
};
</script>

<style scoped>
</style>