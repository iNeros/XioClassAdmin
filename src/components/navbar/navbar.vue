<template>
  <div class="navbar">
    <v-app-bar app> </v-app-bar>
    <v-navigation-drawer
      color="#26A69A"
      permanent
      expand-on-hover
      app
      mini-variant-width="56"
      width="300"
      height="100vh"
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
          <v-list-item-group v-model="btnSelectedAdmin" color="#283593">
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
          <v-list-item-group
            v-model="btnSelectedAdmin"
            color="#283593"
            class="DocentesMenu"
          >
            <v-list-item
              v-ripple
              class="my-6"
              link
              dark
              v-on:click="dsetOverview()"
            >
              <v-list-item-icon>
                <v-icon id="iconoVista" small>mdi-desktop-mac-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoVista" class="title-text">Vista General</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-ripple
              class="my-6"
              link
              dark
              v-on:click="dsetAlumnos()"
            >
              <v-list-item-icon>
                <v-icon id="iconoDocente" small>mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoDocente" class="title-text">Grupos</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-ripple
              class="my-6"
              link
              dark
              v-on:click="dsetAvisos()"
            >
              <v-list-item-icon>
                <v-icon id="iconoAvisos" small>mdi-message-alert</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoAvisos" class="title-text">Avisos</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-ripple
              class="my-6"
              link
              dark
              v-on:click="dsetActividades()"
            >
              <v-list-item-icon>
                <v-icon id="iconoContent" small>mdi-content-copy</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoContent" class="title-text">Actividades</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-ripple
              class="my-6"
              link
              dark
              v-on:click="dsetBiblioteca()"
            >
              <v-list-item-icon>
                <v-icon id="iconoBiblioteca" small
                  >mdi-book-open-variant</v-icon
                >
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoBiblioteca" class="title-text">Biblioteca</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-ripple
              class="my-6"
              link
              dark
              v-on:click="dsetEvaluacion()"
            >
              <v-list-item-icon>
                <v-icon id="iconoBiblioteca" small>mdi-message-draw</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoBiblioteca" class="title-text">Evaluacion</h2>
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-ripple
              class="my-6"
              link
              dark
              v-on:click="dsetPreInscripciones()"
            >
              <v-list-item-icon>
                <v-icon id="iconoBiblioteca" small>mdi-badge-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoBiblioteca" class="title-text">
                  Pre-Inscripciones
                </h2>
              </v-list-item-title>
            </v-list-item>

            <!-- <div class="spacer-height"></div> -->
            <v-list-item
              v-ripple
              class="down-we-go"
              link
              dark
              v-on:click="cerrarSesion()"
            >
              <v-list-item-icon>
                <v-icon id="iconoContent" small style="color: red"
                  >mdi-account-arrow-left</v-icon
                >
              </v-list-item-icon>
              <v-list-item-title>
                <h2 id="textoContent" class="title-text" style="color: red">
                  Cerrar Sesion
                </h2>
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
    dsetBiblioteca() {
      this.$store.commit("dsetBiblioteca");
    },
    dsetEvaluacion() {
      this.$store.commit("dsetEvaluacion");
    },
    dsetPreInscripciones() {
      this.$store.commit("dsetPreInscripciones");
    },
    //#endregion

    cerrarSesion() {
      window.sessionStorage.removeItem("id_docente");
      window.sessionStorage.removeItem("nombre");
      window.sessionStorage.removeItem("appPat");
      window.sessionStorage.removeItem("appMat");
      window.sessionStorage.removeItem("tipoUsuario");
      window.sessionStorage.removeItem("usuario");
      window.location.href = "/";
    },
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
@import url("https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@300&family=Poppins:wght@300&display=swap");
.logo-text {
  font-family: "Poppins";
  color: white;
  font-weight: 500px;
  text-align: center;
}
.title-text {
  font-family: "Poppins";
  font-weight: 800;
}

.seccion-titulo {
  margin-bottom: 8rem;
}

@media (max-width: 800px) {
  .spacer-height {
    height: 300px !important;
  }
}
.spacer-height {
  height: 420px;
}

.DocentesMenu {
  height: 100% !important;
}
.down-we-go {
  float: inline-end !important;
}
</style>
