<template>
  <v-card width="100%">
    <v-card-title class="py-3 my-0">
      <v-text-field
        style="max-width: 600px"
        outlined
        dense
        class="white"
        v-model="search"
        append-icon="mdi-magnify"
        label="Busca"
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="my-2" small color="app" @click="createEntry"
        >Inserir medicação</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="entries"
      :search="search"
      dense
      item-key="_id"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando dados..."
      no-data-text="Não há dados a exibir..."
      :items-per-page="10"
      :footer-props="{
        'items-per-page-all-text': 'Todos',
        'items-per-page-text': 'Valores por página:',
        'items-per-page-options': [5, 10, 15, -1],
      }"
      :header-props="{
        'sort-by-text': 'Organizar por',
      }"
    >
      <template v-slot:[`item.enabled`]="{ item }">
        <v-simple-checkbox v-model="item.enabled" disabled></v-simple-checkbox>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="editEntry(item)" v-bind="attrs" v-on="on">
              <v-icon small color="red">mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>Editar medicação</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="entryDialog">
      <EditEntry :key="entryKey" :entry="entry" v-on:close="closeEdit" />
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import EditEntry from "./EditMedication.vue";

export default {
  props: {
    enableEdit: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    EditEntry,
  },
  computed: {
    tableHeaders() {
      let headers = [
        {
          text: "Nome comercial",
          value: "brandLabel",
          sortable: true,
        },
        { text: "Fabricante", value: "labName", sortable: true },
        { text: "Princípio ativo", value: "activePrinciple", sortable: true },
        { text: "Ativo", value: "enabled" },
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
      entries: [],
      loading: true,
      search: "",
      entryDialog: false,
      entry: null,
      entryKey: Math.random(),
    };
  },
  methods: {
    fetchValues() {
      axios
        .get("/medications")
        .then((res) => {
          this.entries = res.data;
          this.loading = false;
          this.$root.vtoast.show({
            color: "green",
            message: "Valores carregados com sucesso",
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
    closeEdit(reload) {
      if (reload) this.fetchValues();
      this.entryDialog = false;
    },
    editEntry(value) {
      this.entry = Object.assign({}, value);
      this.entryKey = value._id;
      this.entryDialog = true;
    },
    createEntry() {
      this.entry = null;
      this.entryKey = Math.random();
      this.entryDialog = true;
    },
  },
  mounted() {
    this.fetchValues();
  },
};
</script>

<style scoped>
</style>