<template>
  <div>
    <v-card max-width="600px">
      <v-card-title>{{ boxName }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="activeMedicine.brandLabel"
            outlined
            dense
            label="Nome comercial"
          ></v-text-field>
          <v-text-field
            v-model="activeMedicine.labName"
            outlined
            dense
            label="Laboratório"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Princípio ativo"
            v-model="activeMedicine.activePrinciple"
          ></v-text-field>
          <v-checkbox
            dense
            label="Habilitado"
            v-model="activeMedicine.enabled"
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
      return this.entry && this.entry._id
        ? "Edição de medicamento"
        : "Inserir nova medicação";
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
      activeMedicine: {
        brandLabel: "",
        labName: "",
        activePrinciple: "",
        enabled: true,
      },
      busy: false,
    };
  },
  methods: {
    saveData() {
      let method = this.activeMedicine._id ? "put" : "post";
      let address = this.activeMedicine._id
        ? `edit/${this.activeMedicine._id}`
        : "";
      this.busy = true;
      axios[method](`/medications/${address}`, this.activeMedicine)
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
    if (this.entry) this.activeMedicine = this.entry;
  },
};
</script>

<style scoped>
</style>