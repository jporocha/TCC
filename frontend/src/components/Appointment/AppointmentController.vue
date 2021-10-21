<template>
  <div>
    <v-card>
      {{ getStart }}
      <v-card-title>
        <strong>Paciente:</strong> {{ patientName }}
      </v-card-title>
      <v-card-subtitle>
        Data de nascimento: {{ patientBirthday }}
      </v-card-subtitle>
      <v-card-actions class="mx-2">
        <v-row>
          <v-col cols="6" lg="4">
            <v-btn :disabled="inProgress" small text @click="dispatchStart"
              >Iniciar consulta</v-btn
            >
          </v-col>
          <v-col cols="6" lg="4">
            <v-btn :disabled="!inProgress" small text @click="dispatchFinish"
              >Encerrar consulta</v-btn
            >
          </v-col>
          <v-col cols="12" lg="4" class="text-center">
            Tempo de consulta: {{ elapsedTime }}
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  computed: {
    patientName() {
      return "João Paulo de Oliveira Rocha";
    },
    patientBirthday() {
      return "02/04/1981";
    },
    getStart() {
      const times = this.$store.getters.getTimes;
      if (times && times.start && !times.end && !this.timer) {
        console.log("set timer");
        this.timer = setInterval(() => {
          let now = dayjs();
          let diff = now.diff(times.start, "seconds");
          let minutes = Math.floor(diff / 60);
          let seconds = diff - 60 * minutes;
          minutes += "";
          seconds += "";
          this.elapsedTime = `${minutes.padStart(2, "0")}:${seconds.padStart(
            2,
            "0"
          )}`;
        }, 1000);
      } else if (times && !times.start) {
        clearInterval(this.timer);
        return "00:00";
      } else if (times && times.start && times.end) {
        clearInterval(this.timer);
        let diff = times.end.diff(times.start, "seconds");
        let minutes = Math.floor(diff / 60);
        let seconds = diff - 60 * minutes;
        minutes += "";
        seconds += "";
        this.elapsedTime = `${minutes.padStart(2, "0")}:${seconds.padStart(
          2,
          "0"
        )}`;
      }
      return times && times.start && !times.end
        ? times.start.format("HH:mm")
        : "Sem consulta em andamento";
    },
    inProgress() {
      return this.$store.getters.inProgress;
    },
  },
  data() {
    return {
      elapsedTime: "00:00",
      timer: null,
    };
  },
  methods: {
    dispatchStart() {
      this.$store.dispatch("START_APPOINTMENT");
    },
    dispatchFinish() {
      this.$store.dispatch("FINISH_APPOINTMENT");
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
</style>