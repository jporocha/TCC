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
                  :max="today"
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
          <v-select
            prepend-icon="mdi-calendar"
            v-if="client.role === 'Médico'"
            outlined
            dense
            item-text="dia"
            item-value="value"
            multiple
            label="Dias de trabalho"
            v-model="client.disponibilidade"
            :items="dias"
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
          <v-checkbox
            :disabled="role !== 'Administrador'"
            v-model="client.enabled"
            label="Habilitado no sistema?"
          >
          </v-checkbox>
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
  props: ["employee"],
  computed: {
    CardTitle() {
      return this.employee ? "Editar funcionário" : "Inserir funcionário";
    },
    formattedDate() {
      return dayjs(this.client.dateOfBirth).format("DD/MM/YYYY");
    },
    role() {
      return this.$store.getters.getUser.role;
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
        dateOfBirth: dayjs().subtract(14, "years").format("YYYY-MM-DD"),
        cellPhone: "",
        disponibilidade: [],
        enabled: true,
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
      dias: [
        {
          dia: "Segunda-feira",
          value: 1,
        },
        {
          dia: "Terça-feira",
          value: 2,
        },
        {
          dia: "Quarta-feira",
          value: 3,
        },
        {
          dia: "Quinta-feira",
          value: 4,
        },
        {
          dia: "Sexta-feira",
          value: 5,
        },
      ],
      menuNascimento: false,
      today: dayjs().subtract(14, "years").format("YYYY-MM-DD"),
    };
  },
  methods: {
    saveUser() {
      let method = this.employee ? "put" : "post";
      let address = this.employee ? this.employee._id : "createUser";
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
    if (this.employee) this.client = Object.assign({}, this.employee);
  },
};
</script>

<style scoped>
</style>