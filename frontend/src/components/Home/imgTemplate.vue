<template>
  <v-parallax dark :src="require(`@/assets/${asset}`)" :height="height">
    <v-row align="center" justify="center">
      <v-col :class="`text-center ${color}--text`" cols="12">
        <h1 class="text-h4 mb-4">{{ title }}</h1>
        <h4 class="subheading">{{ subtitle }}</h4>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
  props: {
    asset: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "black",
    },
    height: {
      type: Number,
      default: 500,
    },
  },
};
</script>

<style scoped>
</style>