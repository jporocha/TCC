<template>
  <div>
    <v-card max-width="800">
      <v-card-title>{{ CardTitle }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-account"
            v-model="client.name"
            outlined
            dense
            label="Nome"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-account-group"
            v-model="client.nameOfParents"
            outlined
            dense
            label="Nome dos pais"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-account-details"
            v-model="client.cpf"
            outlined
            dense
            label="CPF ou RG"
          ></v-text-field>
          <v-row>
            <v-col cols="12" lg="6">
              <v-text-field
                prepend-icon="mdi-phone"
                outlined
                dense
                label="Telefone"
                v-model="client.cellPhone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6">
              <v-menu
                v-model="menuNascimento"
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
                    label="Data de nascimento"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="client.dateOfBirth"
                  :max="today"
                  locale="pt-br"
                  @input="menuNascimento = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-divider class="my-6"></v-divider>
          <v-card-actions class="d-flex">
            <v-btn text color="red" @click="closePatient">Fechar</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="green" @click="savePatient">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  props: ["patient"],
  computed: {
    CardTitle() {
      return this.patient ? "Editar paciente" : "Inserir paciente";
    },
    formattedDate() {
      return dayjs(this.client.dateOfBirth).format("DD/MM/YYYY");
    },
  },
  data() {
    return {
      client: {
        name: "",
        dateOfBirth: dayjs().format("YYYY-MM-DD"),
        cellPhone: "",
        nameOfParents: "",
        cpf: "",
      },
      menuNascimento: false,
      today: dayjs().format("YYYY-MM-DD"),
    };
  },
  methods: {
    savePatient() {
      let method = this.patient ? "put" : "post";
      let address = this.patient ? this.patient._id : "newPatient";
      axios[method](`/patients/${address}`, this.client)
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: res.data,
          });
          this.$emit("close", true);
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
        });
    },
    closePatient() {
      this.$emit("close", false);
    },
  },
  mounted() {
    if (this.patient) this.client = Object.assign({}, this.patient);
  },
};
</script>

<style scoped>
</style>