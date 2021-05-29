<template>
  <div class="Dashboard">
    <v-app>
      <navbar />

      <div class="inside-content">
        <v-window vertical v-model="$store.state.adminWindowsSelected">
          <!--#region WINDOWS FOR ADMIN USER -->
          <v-window-item :value="1">
            <overview/>
          </v-window-item>

          <v-window-item :value="2">
            <docentes/>
          </v-window-item>

          <v-window-item :value="3">
            <avisos-generales/>
          </v-window-item>

          <v-window-item :value="4">
            <contenido-general/>
          </v-window-item>

          <v-window-item :value="5">
            <inscripciones/>
          </v-window-item>
          <!--#endregion-->

          <!--#region WINDOWS FOR DOCENTE USER -->
          <v-window-item :value="10">
            <h1>eh we DOCENTE 1111111111111111111111111111111111111111</h1>
          </v-window-item>

          <v-window-item :value="11">
            <h1>eh we DOCENTE 22222222222222222222222222222222222222222222222222222</h1>
          </v-window-item>

          <v-window-item :value="12">
            <h1>eh we DOCENTE 333333333333333333333333333333333333333333333333333</h1>
          </v-window-item>

          <v-window-item :value="13">
            <h1>eh we DOCENTE 4444444444444444444444444444444444444444444444444</h1>
          </v-window-item>

          <v-window-item :value="14">
            <h1>eh we DOCENTE 55555555555555555555555555555555555555555555555555</h1>
          </v-window-item>
          <!--#endregion-->

        </v-window>
      </div>
    </v-app>
  </div>
</template>

<script>
import navbar from "@/components/navbar/navbar.vue";
import overview from "@/components/central-navigation/admin/windows/overview.vue"
import docentes from '../components/central-navigation/admin/windows/docentes.vue';
import avisosGenerales from '../components/central-navigation/admin/windows/avisosGenerales.vue';
import contenidoGeneral from '../components/central-navigation/admin/windows/contenidoGeneral.vue';
import inscripciones from '../components/central-navigation/admin/windows/inscripciones.vue';

export default {
  name: "Dashboard",
  components: {
    navbar,
    overview,
    docentes,
    avisosGenerales,
    contenidoGeneral,
    inscripciones,
  },
  data() {
    return{
      
    };
  },
  mounted(){
    this.checkUserType();
  },
  methods: {
    checkUserType(){
      if(sessionStorage.getItem("userType")=="0"){
        this.$store.commit("setWindowsOfUserAdmin");
      };
      if(sessionStorage.getItem("userType")=="1"){
        this.$store.commit("setWindowsOfUserDocente");
      };  
    }
  },
};
</script>

<style scoped>
.inside-content {
  margin-left: 100px;
  margin-top: 100px;
}
</style>
