<template>
  <div>
    <ImageHolder
      asset="scope.jpg"
      title="Venha para a CliniMed BH"
      subtitle="Preços acessíveis e qualidade no atendimento"
      color="black"
    />
    <v-row class="d-flex justify-space-around">
      <v-col cols="12" lg="8" class="px-6 mt-4 text-justify">
        <p class="homeText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt odio nibh, non tincidunt lacus molestie id. Duis ut bibendum
          massa. Nulla aliquam maximus eros aliquet vehicula. Vivamus dapibus
          euismod iaculis. Morbi sed enim mollis, congue ante sit amet,
          tincidunt velit. Sed vitae lectus eu ligula dictum ultricies. Etiam
          pellentesque commodo leo a posuere. Suspendisse fermentum libero quis
          elit congue, non hendrerit dolor tincidunt. Suspendisse ut fermentum
          leo. Suspendisse venenatis magna a dui pulvinar, vitae placerat sapien
          pharetra. Quisque eu ligula id magna ultrices tincidunt.
        </p>
      </v-col>
    </v-row>
    <ImageHolder
      asset="dentist.jpg"
      title="Nosso corpo técnico"
      subtitle="Conheça nossa equipe"
      color="white"
      :height="300"
    />
    <v-row class="d-flex justify-space-around">
      <v-col cols="12" lg="8" class="px-6 mt-4 text-justify">
        <p class="homeText">
          Sed mollis suscipit metus, nec ultrices velit fringilla in. Nulla
          efficitur, enim maximus condimentum volutpat, erat orci malesuada dui,
          sit amet bibendum dolor urna sit amet elit. Curabitur vitae nunc
          ipsum. Fusce sit amet lacus in dui consequat eleifend a eget purus.
          Etiam scelerisque eros felis, ac porttitor ante placerat vitae. Donec
          mattis mattis risus in lacinia. Vestibulum fermentum lectus sem, sed
          congue urna pulvinar vel. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Nam ornare lobortis velit
          in luctus.
        </p>
      </v-col>
    </v-row>
    <ImageHolder
      asset="mri.jpg"
      title="Nossas instalações"
      subtitle="Atendendo aos mais altos padrões internacionais"
      color="white"
      :height="300"
    />
    <v-row class="d-flex justify-space-around">
      <v-col cols="12" lg="8" class="px-6 mt-4 text-justify">
        <p class="homeText">
          In varius vulputate lectus et condimentum. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Sed sed euismod sem, eget pharetra urna. Nunc leo sapien,
          porta ut orci id, consequat tincidunt ligula. Morbi venenatis aliquam
          diam sit amet aliquam. Suspendisse placerat, enim eget condimentum
          varius, ligula tortor venenatis nunc, ut tincidunt justo diam non
          urna. Proin consequat leo arcu. Morbi vel malesuada lorem. Praesent
          non urna in mi tempus pretium at id nisi. Suspendisse bibendum risus
          sed posuere rutrum. Integer vehicula iaculis enim. Maecenas viverra
          quam nec venenatis pretium. Mauris mattis fringilla nibh, volutpat
          bibendum diam accumsan non. Praesent placerat, augue ut finibus
          sollicitudin, orci nisl blandit elit, eget malesuada tellus erat non
          nulla. Ut non risus lacus. Phasellus ultrices dignissim risus ut
          pretium.
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import ImageHolder from "@/components/Home/imgTemplate";
export default {
  components: {
    ImageHolder,
  },
  methods: {
    checkLogged() {
      axios
        .get("/auth/user")
        .then((res) => {
          if (res.data.nome) {
            this.$store.dispatch("SET_USER", res.data);
          }
        })
        .catch((err) => {
          this.$store.dispatch("SET_USER", null);
        });
    },
  },
  mounted() {
    this.checkLogged();
  },
};
</script>

<style scoped>
.homeText {
  line-height: 40px;
}
</style>