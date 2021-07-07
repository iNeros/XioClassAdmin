<template>
  <div class="biblioteca">
    <h1 class="titulo-seccion">DOCUMENTOS DE BIBLIOTECA</h1>

    <div class="tab">
      <menuTabsBiblio> </menuTabsBiblio>
    </div>

    <div class="AccionWindow">
      <v-window v-model="$store.state.tabsBiblio">
        <v-window-item :value="1">
          <impreso></impreso>
        </v-window-item>
        <v-window-item :value="2">
          <visual></visual>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
import menuTabsBiblio from "@/components/central-navigation/docente/dialogs/biblioteca/menuTabsBiblio.vue";
import impreso from "@/components/central-navigation/docente/dialogs/biblioteca/impreso.vue";
import visual from "@/components/central-navigation/docente/dialogs/biblioteca/visual.vue";

export default {
  name: "Biblioteca",

  components: {
    menuTabsBiblio,
    impreso,
    visual,
  },
  data() {
    return {};
  },

  mounted() {
    //this.Session();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;600;800&display=swap");

.titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 40px;
  margin-bottom: 5px;
  width: 100%;
  color: #23395b;
}
</style>
