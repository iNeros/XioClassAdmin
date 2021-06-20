<template>
  <body>
    <div class="degradado"></div>
    <div class="right">
      <v-icon dark> mdi-arrow-left-bold </v-icon>
      <a
        href="https://xicoclass.firebaseapp.com/"
        style="color: yellow; text-decoration: underline"
      >
        REGRESAR
      </a>
    </div>
    <div class="center">
      <h1 style="color: #30dba0">INICIA SESIÓN</h1>
      <v-card class="margin-card px-6" max-width="500" flat>
        <v-card-text>
          <br />
          <div class="descripcion-text">
            INICIA SESIÓN AL SISTEMA ADMINISTRATIVO DE <br />
            XICO-CLASS
          </div>
          <v-form class="login-form">
            <v-text-field
              prepend-icon="mdi-account"
              name="login"
              label="Usuario"
              v-model="usuario"
              type="text"
              class="form__input mb-6"
            >
            </v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              id="password"
              name="password"
              v-model="contraseña"
              label="Contraseña"
              type="password"
              v-on:keyup.enter="Session()"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            dark
            color="red"
            width="200"
            class="btn-design"
            @click="Session()"
          >
            INICIAR SESIÓN
          </v-btn>
        </v-card-actions>
        <v-alert
          v-show="show"
          color="orange"
          dense
          dismissible
          elevation="8"
          type="info"
          >¡Verifíca tu usuario y contraseña!</v-alert
        >
      </v-card>
      <div class="forgotten-password"></div>
    </div>
  </body>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "Landing",
  components: {},
  data() {
    return {
      show: false,
      usuario: "",
      contraseña: "",
      datas: "",
      submitStatus: null,
    };
  },
  methods: {
    Session() {
      this.show = false;
      axios
        .get(
          "https://xicoclass.online/Docente.php?User=" +
            this.usuario +
            "&Pass=" +
            this.contraseña
        )
        .then((r) => {
          this.datas = r.data;
          if (this.datas.length == 1) {
            console.log(this.datas);
            window.sessionStorage.setItem(
              "id_docente",
              this.datas[0]["id_docente"]
            );
            window.sessionStorage.setItem("nombre", this.datas[0]["nombre"]);
            window.sessionStorage.setItem("appPat", this.datas[0]["appPat"]);
            window.sessionStorage.setItem("appMat", this.datas[0]["appMat"]);
            window.sessionStorage.setItem(
              "tipoUsuario",
              this.datas[0]["tipoUsuario"]
            );
            window.sessionStorage.setItem("usuario", this.datas[0]["usuario"]);
            window.location.href = "/Dashboard";
          } else {
            this.show = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  validations() {
    return {
      form: {
        usuario: {
          email,
          required,
        },
        contraseña: {
          required,
        },
      },
    };
  },
};
</script>

<!-- STYLEEEEEEEEESS -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat";
}
body {
  margin: 0;
  padding: 0;
  background: url("../../assets/media/backgrounds/background.png");
  height: 100vh;
  overflow: hidden;
}
.degradado {
  background: linear-gradient(120deg, #2b2c2c, #5d4f63);
  height: 100vh;
  opacity: 0.6;
}
.right {
  font-family: "Montserrat";
  color: white;
  font-size: 20px;
  position: absolute;
  top: 2%;
  left: 20px;
}

@media screen and (min-width: 800px) {
  .center {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 550px;
    height: 100vh;
    background: white;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
  }
}
@media screen and (max-width: 800px) {
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 600px;
    background: white;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
  }
}

.center h1 {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid silver;
}

.btn-design {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

.login-form {
  margin-top: 200px;
  margin-bottom: 50px;
}
@media screen and (max-width: 800px) {
  .login-form {
    margin-top: 50px;
  }
}

.descripcion-text {
  text-align: center;
  font-size: 24px !important;
  font-family: "Montserrat";
}
.forgotten-password {
  position: absolute;
  bottom: 10px;
  margin-left: 30%;
  align-self: auto;
  text-align: center;
  font-size: 16px !important;
}
@media screen and (max-width: 800px) {
  .forgotten-password {
    position: absolute;
    bottom: 10px;
    margin-left: 20%;
    align-self: auto;
    text-align: center;
    font-size: 16px !important;
  }
}
.margin-card {
  margin-left: auto;
  margin-right: auto;
}
</style>
