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
            prepend-icon="mdi-account-check"
            v-model="client.nameOfMother"
            outlined
            dense
            label="Nome da mãe"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-email"
            v-model="client.email"
            outlined
            dense
            label="E-mail"
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
                  locale="pt-br"
                  @input="menuNascimento = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-divider class="mb-6"></v-divider>
          <v-select
            prepend-icon="mdi-account-group"
            outlined
            dense
            label="Função"
            v-model="client.role"
            :items="roles"
          ></v-select>
          <v-select
            prepend-icon="mdi-account-details"
            v-if="client.role === 'Médico'"
            outlined
            multiple
            dense
            label="Especialidade"
            v-model="client.emphasis"
            :items="emphasis"
          ></v-select>
          <v-select
            prepend-icon="mdi-account-details"
            v-if="client.role === 'Médico'"
            outlined
            dense
            multiple
            label="Convênios"
            v-model="client.partners"
            :items="partners"
          ></v-select>
          <v-divider class="mb-6"></v-divider>
          <v-row>
            <v-col class="mb-n4 pb-0 col-12"
              ><v-text-field
                outlined
                dense
                label="Rua"
                v-model="client.addr.rua"
              ></v-text-field
            ></v-col>
            <v-col class="mb-n4 pb-0 col-4"
              ><v-text-field
                outlined
                dense
                label="Número"
                v-model="client.addr.numero"
              ></v-text-field
            ></v-col>
            <v-col class="mb-n4 pb-0 col-8"
              ><v-text-field
                outlined
                dense
                label="Complemento"
                v-model="client.addr.complemento"
              ></v-text-field
            ></v-col>
            <v-col class="mb-n4 pb-0 col-6"
              ><v-text-field
                outlined
                dense
                label="Bairro"
                v-model="client.addr.bairro"
              ></v-text-field
            ></v-col>
            <v-col class="mb-n4 pb-0 col-6"
              ><v-text-field
                outlined
                dense
                label="CEP"
                v-model="client.addr.cep"
              ></v-text-field
            ></v-col>
            <v-col class="mb-n4 pb-0 col-8"
              ><v-text-field
                outlined
                dense
                label="Cidade"
                v-model="client.addr.cidade"
              ></v-text-field
            ></v-col>
            <v-col class="mb-n4 pb-0 col-4"
              ><v-text-field
                outlined
                dense
                label="Estado"
                v-model="client.addr.estado"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-divider class="my-6"></v-divider>
          <v-card-actions class="d-flex">
            <v-btn text color="red" @click="closeUser">Fechar</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="green" @click="saveUser">Salvar</v-btn>
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
  props: ["user"],
  computed: {
    CardTitle() {
      return this.user ? "Editar cliente" : "Inserir cliente";
    },
    formattedDate() {
      return dayjs(this.client.dateOfBirth).format("DD/MM/YYYY");
    },
  },
  data() {
    return {
      client: {
        name: "",
        email: "",
        role: "",
        emphasis: "",
        partners: "",
        dateOfBirth: dayjs().format("YYYY-MM-DD"),
        cellPhone: "",
        nameOfMother: "",
        addr: {
          rua: "",
          numero: "",
          complemento: "",
          bairro: "",
          cep: "",
          cidade: "",
          estado: "",
        },
      },
      roles: ["Recepção", "Médico", "Administrador"],
      emphasis: ["Cardiologista", "Ortopedista", "Pediatra", "Psiquiatra"],
      partners: ["Unimed-BH", "Qualicorp", "Vitallis"],
      menuNascimento: false,
    };
  },
  methods: {
    saveUser() {
      let method = this.user ? "put" : "post";
      let address = this.user ? this.user._id : "createUser";
      axios[method](`/users/${address}`, this.client)
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
    closeUser() {
      this.$emit("close", false);
    },
  },
  mounted() {
    if (this.user) this.client = Object.assign({}, this.user);
  },
};
</script>

<style scoped>
</style>