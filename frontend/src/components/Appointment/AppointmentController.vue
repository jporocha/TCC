<template>
  <div>
    <v-card>
      <v-card-title>
        <strong>Paciente:</strong> {{ patient.name }}
      </v-card-title>
      <v-card-subtitle>
        Data de nascimento: {{ formatDate(patient.dateOfBirth) }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  computed: {
    patient() {
      return this.$store.getters.getPatient;
    },
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
    setTimer() {
      const times = this.getTimes;
      if (times && times.start && !times.end && !this.timer) {
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
        this.elapsedTime = "00:00";
      }
    },
  },
};
</script>

<style scoped>
</style>