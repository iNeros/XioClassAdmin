<template>
  <div class="Dashboard">
    <v-app class="background">
      <navbar />

      <div class="inside-content">
        <v-window vertical v-model="$store.state.adminWindowsSelected">
          <!--#region WINDOWS FOR ADMIN USER -->
          <v-window-item :value="1">
            <overview />
          </v-window-item>

          <v-window-item :value="2">
            <docentes />
          </v-window-item>

          <v-window-item :value="3">
            <avisos-generales />
          </v-window-item>

          <v-window-item :value="4">
            <contenido-general />
          </v-window-item>

          <v-window-item :value="5">
            <inscripciones />
          </v-window-item>
          <!--#endregion-->

          <!--#region WINDOWS FOR DOCENTE USER -->
          <v-window-item :value="10">
            <docenteOverview />
          </v-window-item>

          <v-window-item :value="11">
            <alumnos />
          </v-window-item>

          <v-window-item :value="12">
            <avisos />
          </v-window-item>

          <v-window-item :value="13">
            <actividades />
          </v-window-item>

          <v-window-item :value="14">
            <biblioteca />
          </v-window-item>

          <v-window-item :value="15">
            <evaluacion />
          </v-window-item>

          <v-window-item :value="16">
            <preInscipciones />
          </v-window-item>
          <!--#endregion-->
        </v-window>
      </div>
    </v-app>
  </div>
</template>

<script>
import navbar from "@/components/navbar/navbar.vue";
import overview from "@/components/central-navigation/admin/windows/overview.vue";
import docentes from "../components/central-navigation/admin/windows/docentes.vue";
import avisosGenerales from "../components/central-navigation/admin/windows/avisosGenerales.vue";
import contenidoGeneral from "../components/central-navigation/admin/windows/contenidoGeneral.vue";
import inscripciones from "../components/central-navigation/admin/windows/inscripciones.vue";

import docenteOverview from "@/components/central-navigation/docente/windows/overview.vue";
import alumnos from "../components/central-navigation/docente/windows/alumnos.vue";
import avisos from "../components/central-navigation/docente/windows/avisos.vue";
import actividades from "../components/central-navigation/docente/windows/actividades.vue";
import biblioteca from "../components/central-navigation/docente/windows/biblioteca.vue";
import evaluacion from "../components/central-navigation/docente/windows/evaluacion.vue";
import preInscipciones from "../components/central-navigation/docente/windows/inscripciones.vue";

export default {
  name: "Dashboard",
  components: {
    navbar,
    overview,
    docentes,
    avisosGenerales,
    contenidoGeneral,
    inscripciones,
    docenteOverview,
    alumnos,
    avisos,
    actividades,
    biblioteca,
    evaluacion,
    preInscipciones,
  },
  data() {
    return {};
  },
  mounted() {
    //  this.checkUserType();
    this.Session();
  },
  methods: {
    checkUserType() {
      if (sessionStorage.getItem("userType") == "0") {
        this.$store.commit("setWindowsOfUserAdmin");
      }
      if (sessionStorage.getItem("userType") == "1") {
        this.$store.commit("setWindowsOfUserDocente");
      }
    },
    Session() {
      if (
        window.sessionStorage.getItem("id_docente") == null ||
        window.sessionStorage.getItem("tipoUsuario") == "0"
      ) {
        window.location.href = "/";
      }
    },
  },
};
</script>

<style scoped>
.inside-content {
  margin-left: 80px;
  margin-right: 25px;
  margin-top: 100px;
  width: auto;
}
.background {
  background-color: #f5f5f5 !important;
}
</style>
