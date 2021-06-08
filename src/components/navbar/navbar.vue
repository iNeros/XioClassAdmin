<template>
  <div class="navbar">
    <v-app-bar app> </v-app-bar>
    <v-navigation-drawer
      color="#5d4f63"
      permanent
      expand-on-hover
      app
      mini-variant-width="56"
      width="300"
    >
      <v-divider></v-divider>
      <v-list nav dense flat>
        <v-list-item link href="#" disabled>
          <v-list-item-icon>
            <v-icon color="white" small>mdi-menu-open</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <h2 class="logo-text">XicoClass</h2>
          </v-list-item-title>
        </v-list-item>
        <v-spacer class="seccion-titulo"> </v-spacer>

        <!--#region SI EL USUARIO ES UN ADMINISTRADOR  -->
        <div v-if="userType == '0'">
          <v-list-item-group v-model="btnSelectedAdmin" color="#30dba0">
            <v-list-item class="my-6" link dark v-on:click="setOverview()">
              <v-list-item-icon>
                <v-icon id="iconoVista" small>mdi-desktop-mac-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoVista" class="title-text">Vista General</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="my-6" link dark v-on:click="setDocentes()">
              <v-list-item-icon>
                <v-icon id="iconoDocente" small>mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoDocente" class="title-text">Docentes</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="my-6" link dark v-on:click="setAvisosGene()">
              <v-list-item-icon>
                <v-icon id="iconoAvisos" small>mdi-message-alert</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoAvisos" class="title-text">Avisos Generales</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="my-6" link dark v-on:click="setContenidoGene()">
              <v-list-item-icon>
                <v-icon id="iconoContent" small>mdi-content-copy</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoContent" class="title-text">Contenido General</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="my-6" link dark v-on:click="setInscripcion()">
              <v-list-item-icon>
                <v-icon id="iconoInscripciones" small
                  >mdi-human-male-boy</v-icon
                >
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoInscripciones" class="title-text">
                  Inscripciones
                </h2>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </div>
        <!--endregion-->

        <!--#region SI EL USUARIO ES UN DOCENTE  -->
        <div v-if="userType == '1'">
          <v-list-item-group v-model="btnSelectedAdmin" color="#30dba0">
            <v-list-item class="my-6" link dark v-on:click="dsetOverview()">
              <v-list-item-icon>
                <v-icon id="iconoVista" small>mdi-desktop-mac-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoVista" class="title-text">Vista General</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="my-6" link dark v-on:click="dsetAlumnos()">
              <v-list-item-icon>
                <v-icon id="iconoDocente" small>mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoDocente" class="title-text">Grupos</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="my-6" link dark v-on:click="dsetAvisos()">
              <v-list-item-icon>
                <v-icon id="iconoAvisos" small>mdi-message-alert</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoAvisos" class="title-text">Avisos</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="my-6" link dark v-on:click="dsetActividades()">
              <v-list-item-icon>
                <v-icon id="iconoContent" small>mdi-content-copy</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoContent" class="title-text">Actividades</h2>
              </v-list-item-title>
            </v-list-item>
            <div class="spacer-height" ></div>
            <v-list-item class="my-6" link dark v-on:click="cerrarSesion()">
              <v-list-item-icon>
                <v-icon id="iconoContent" small>mdi-account-arrow-left</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoContent" class="title-text">Cerrar Sesion</h2>
              </v-list-item-title>
            </v-list-item>


          </v-list-item-group>
        </div>
        <!--#endregion-->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      drawer: false,
      group: null,
      userType: 1,
      btnSelectedAdmin: 0,
    };
  },
  methods: {
    userCheck() {
      //this.userType = localStorage.getItem('userType');
    },

    //#region MUTATIONS FOR ADMIN USER
    setOverview() {
      this.$store.commit("setOverview");
    },
    setDocentes() {
      this.$store.commit("setDocentes");
    },
    setAvisosGene() {
      this.$store.commit("setAvisosGene");
    },
    setContenidoGene() {
      this.$store.commit("setContenidoGene");
    },
    setInscripcion() {
      this.$store.commit("setInscripcion");
    },
    //#endregion

    //#region MUTATIONS FOR DOCENTE USER
    dsetOverview() {
      this.$store.commit("dsetOverview");
    },
    dsetAlumnos() {
      this.$store.commit("dsetAlumnos");
    },
    dsetAvisos() {
      this.$store.commit("dsetAvisos");
    },
    dsetActividades() {
      this.$store.commit("dsetActividades");
    },
    dsetGrupos() {
      this.$store.commit("dsetGrupos");
    },
    //#endregion

    cerrarSesion(){
      //REMOVEMOS TODO DE EL localStorage
      //window.localStorage.removeItem('');

      window.location.href="/";
    }
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },

  mounted() {
    this.userCheck();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");

.logo-text {
  font-family: "Montserrat";
  color: white;
  font-weight: 800;
  text-align: center;
}
.title-text {
  font-family: "Montserrat";
  font-weight: 800;
}

.seccion-titulo {
  margin-bottom: 8rem;
}

@media (max-width: 800px) {
.spacer-height{
  height: 300px!important;
}
}
.spacer-height{
  height: 420px;
}

</style>
