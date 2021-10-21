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
      <v-btn class="my-2" small color="app" @click="createUser"
        >Inserir cliente</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="usersHeader"
      :items="users"
      :search="busca"
      dense
      item-key="_id"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando usuários..."
      no-data-text="Não há usuários a exibir..."
      :items-per-page="10"
      :footer-props="{
        'items-per-page-all-text': 'Todos',
        'items-per-page-text': 'Usuários por página:',
        'items-per-page-options': [5, 10, 15, -1],
      }"
      :header-props="{
        'sort-by-text': 'Organizar por',
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="editUser(item)" v-bind="attrs" v-on="on">
              <v-icon small color="purple">mdi-account-edit</v-icon>
            </v-btn>
          </template>
          <span>Editar paciente</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="userDialog">
      <EditUser :key="userKey" :user="user" v-on:close="closeUser" />
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import EditUser from "./UserEdit.vue";

export default {
  props: ["admin"],
  components: {
    EditUser,
  },
  computed: {
    usersHeader() {
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
      users: [],
      loading: true,
      busca: "",
      user: null,
      userDialog: false,
      userKey: Math.random(),
    };
  },
  methods: {
    fetchUsers() {
      axios
        .get("/users")
        .then((res) => {
          this.users = res.data;
          this.loading = false;
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
    closeUser(reload) {
      if (reload) this.fetchUsers();
      this.userDialog = false;
    },
    editUser(user) {
      this.user = user;
      this.userKey = user._id;
      this.userDialog = true;
    },
    createUser() {
      this.user = null;
      this.userKey = Math.random();
      this.userDialog = true;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
</style>