<template>
  <div>
    <transition name="rotate" mode="out-in">
      <Agenda v-on:toTable="toTable" v-if="modo === 1" />
      <Table v-on:toCalendar="toCalendar" v-if="modo === 2" />
    </transition>
  </div>
</template>

<script>
import Agenda from "@/components/Calendar/ShowAgenda";
import Table from "@/components/Calendar/AppointmentTable";
export default {
  components: {
    Agenda,
    Table,
  },
  data() {
    return {
      modo: 1,
    };
  },
  methods: {
    toTable() {
      this.modo = 2;
    },
    toCalendar() {
      this.modo = 1;
    },
  },
};
</script>


<style scoped>
.link {
  cursor: pointer;
  color: darkblue;
  display: block;
}

@keyframes rotateIn {
  0% {
    opacity: 0;
    transform: perspective(50cm) rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: perspective(50cm) rotateY(0deg);
  }
}

@keyframes rotateOut {
  0% {
    opacity: 0;
    transform: perspective(50cm) rotateY(-90deg);
  }
  100% {
    opacity: 1;
    transform: perspective(50cm) rotateY(0deg);
  }
}

.rotate-enter-active {
  animation: rotateIn 0.5s;
}

.rotate-leave-active {
  animation: rotateOut 0.5s reverse;
}

.fillWidth {
  width: 100%;
}
</style>
