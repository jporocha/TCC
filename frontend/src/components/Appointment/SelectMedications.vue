<template>
  <div>
    <v-card>
      <v-card-title
        >Prescrição
        <v-spacer></v-spacer>
        <v-btn text color="blue" @click="pickDialog = true"
          >Nova medicação</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-list two-line v-if="medicineList.length">
          <v-list-item
            v-for="(item, index) in medicineList"
            :key="`Medicamento ${index}`"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.medicine }} - {{ item.dosage }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.posologia }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn small @click="removeItem(index)" icon>
                <v-icon small color="red">mdi-trash-can</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <div v-else>Não há medicamentos prescritos para o paciente.</div>
      </v-card-text>
    </v-card>
    <v-dialog v-model="pickDialog" max-width="600px" :key="dialogKey">
      <v-card color="white">
        <v-card-title>Nova medicação</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" lg="8">
              <v-autocomplete
                dense
                v-model="activeMedication.medicine"
                outlined
                item-text="text"
                item-value="id"
                :items="medications"
                label="Selecione uma medicação."
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" lg="4">
              <v-text-field
                v-model="activeMedication.dosage"
                dense
                outlined
                label="Dose"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="activeMedication.posologia"
                dense
                outlined
                label="Posologia"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="red" @click="pickDialog = false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="green" @click="insertMedication">Inserir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pickDialog: false,
      dialogKey: 1,
      medicineList: [],
      medications: [],
      activeMedication: {
        medicine: "",
        dosage: "",
        posologia: "",
      },
    };
  },
  methods: {
    fetchMedications() {
      axios
        .get("/medications")
        .then((res) => {
          this.medications = res.data.map((el) => {
            return {
              id: el._id,
              text: `${el.brandLabel} - ${el.labName} (${el.activePrinciple})`,
            };
          });
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: "Falha no carregamento de medicamentos",
            icon: "mdi-alert",
          });
        });
    },
    insertMedication() {
      let medicine = this.medications.filter(
        (el) => el.id === this.activeMedication.medicine
      )[0];
      this.medicineList.push({
        id: this.activeMedication.medicine,
        medicine: medicine.text,
        dosage: this.activeMedication.dosage,
        posologia: this.activeMedication.posologia,
      });
      this.activeMedication = {
        medicine: "",
        dosage: "",
        posologia: "",
      };
      this.pickDialog = false;
      this.emitChanges();
    },
    removeItem(item) {
      this.medicineList.splice(item, 1);
      this.emitChanges();
    },
    emitChanges() {
      let payload = {
        header: "prescription",
        payload: this.medicineList,
      };
      this.$store.dispatch("SAVE_CHANGES", payload);
    },
  },
  mounted() {
    this.fetchMedications();
    this.medicineList = this.$store.getters.getPrescriptions;
  },
};
</script>

<style scoped>
</style>