<template>
  <v-card width="100%">
    <v-card-title class="py-3 my-0">
      <v-text-field
        style="max-width: 600px"
        outlined
        dense
        class="white"
        v-model="busca"
        append-icon="mdi-magnify"
        label="Busca"
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="my-2" small color="app" @click="createEmployee"
        >Inserir funcionário</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="employeeHeader"
      :items="employees"
      :search="busca"
      dense
      item-key="_id"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando funcionários..."
      no-data-text="Não há funcionários a exibir..."
      :items-per-page="10"
      :footer-props="{
        'items-per-page-all-text': 'Todos',
        'items-per-page-text': 'Funcionários por página:',
        'items-per-page-options': [5, 10, 15, -1],
      }"
      :header-props="{
        'sort-by-text': 'Organizar por',
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="editEmployee(item)" v-bind="attrs" v-on="on">
              <v-icon small color="purple">mdi-account-edit</v-icon>
            </v-btn>
          </template>
          <span>Editar funcionário</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="employeeDialog">
      <EditEmployee
        :key="employeeKey"
        :employee="employee"
        v-on:close="closeEmployee"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import EditEmployee from "./EditUser.vue";

export default {
  components: {
    EditEmployee,
  },
  computed: {
    employeeHeader() {
      let headers = [
        {
          text: "Nome",
          value: "name",
          sortable: false,
        },
        { text: "E-mail", value: "email", sortable: false },
        { text: "Função", value: "role", sortable: false },
        {
          text: "Ações",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ];
      return headers;
    },
  },
  data() {
    return {
      employees: [],
      loading: true,
      busca: "",
      employee: null,
      employeeDialog: false,
      employeeKey: Math.random(),
    };
  },
  methods: {
    fetchEmployees() {
      axios
        .get("/users")
        .then((res) => {
          this.employees = res.data;
          this.loading = false;
          this.$root.vtoast.show({
            color: "green",
            message: "Usuários carregados",
          });
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
          this.loading = false;
        });
    },
    closeEmployee(reload) {
      if (reload) this.fetchEmployees();
      this.employeeDialog = false;
    },
    editEmployee(employee) {
      this.employee = employee;
      this.employeeKey = employee._id;
      this.employeeDialog = true;
    },
    createEmployee() {
      this.employee = null;
      this.employeeKey = Math.random();
      this.employeeDialog = true;
    },
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>

<style scoped>
</style>