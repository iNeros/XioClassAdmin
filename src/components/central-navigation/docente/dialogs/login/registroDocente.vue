<template>
  <div class="text-center">
    <v-row justify="center">
      <v-dialog v-model="$store.state.registroDocenteDialog" max-width="600">
        <v-card>
          <v-card-title>
            <span class="text-h5">Registro docente a XicoClass</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nombre*"
                    v-model="nombre"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Apellido paterno*"
                    v-model="appPat"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Apellido materno*"
                    v-model="appMat"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Correo electrónico*"
                    v-model="mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Contraseña*"
                    v-model="pass"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Código de seguridad*"
                    v-model="codigo"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Campos obligatorios</small>
            <br />
            <small
              >Enviaremos un correo de confirmación a tu correo para que puedas
              accesar al sistema.</small
            >
          </v-card-text>
          <v-alert
            class="alertas"
            v-show="showS"
            color="blue"
            dense
            dismissible
            elevation="8"
            type="info"
            >¡Confirma tu correo electrónico!</v-alert
          >
          <v-alert
            class="alertas"
            v-show="showE"
            color="orange"
            dense
            dismissible
            elevation="8"
            type="info"
            >¡El correo electrónico ya fue registrado!</v-alert
          >
          <v-alert
            class="alertas"
            v-show="showC"
            color="red"
            dense
            dismissible
            elevation="8"
            type="info"
            >¡El código de seguridad es incorrecto!</v-alert
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog()">
              Cerrar
            </v-btn>
            <v-btn color="blue darken-1" text @click="registroDocente()">
              Registrarme
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "registroDocente",
  data() {
    return {
      nombre: "",
      appPat: "",
      appMat: "",
      mail: "",
      pass: "",
      codigo:"",
      showS: false,
      showE: false,
      showC:false,
      dialog: false,
    };
  },

  methods: {
    InitialTest() {
      console.log("CARGUE");
    },
    closeDialog() {
      this.$store.state.registroDocenteDialog = false;
      this.showS = false;
      this.showE = false;
      this.nombre = "";
      this.appPat = "";
      this.appMat = "";
      this.mail = "";
      this.pass = "";
      this.codigo = "";
    },
    registroDocente() {
      this.showE = false;
      this.showS = false;
      this.showC = false;
      axios
        .get("https://xicoclass.online/Docente.php?Mail=" + this.mail)
        .then((r) => {
          this.datas = r.data;
          if (this.datas.length == 1) {
            console.log(this.datas);
            this.showE = true;
          } else {
            if(this.codigo == 'FROEBEL21'){
            //aqui mandar el axios para registrar y el showS como true
            let config = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            };
            let parametros =
              "nombre=" +
              this.nombre +
              "&appPat=" +
              this.appPat +
              "&appMat=" +
              this.appMat +
              "&tipoUsuario=0&usuario=" +
              this.mail +
              "&contraseña=" +
              this.pass;
            axios
              .post(
                "https://xicoclass.online/Docente.php",
                parametros,
                config
              )
              .then((r) => {
                console.log(r);
                //funcion para confirmar el correo
                this.confirmarCorreo();
              })
              .catch((error) => {
                console.log(error);
              });
         }else this.showC = true; }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
confirmarCorreo(){
      axios
        .get(
          "https://xicoclass.online/Mail.php?confirmar="+this.nombre+"&mail1=" +
            this.mail
        )
        .then((r) => {
          console.log(r);
          this.showS = true;
        })
        .catch(function (error) {
          console.log(error);
        });
  },
},

  mounted() {
    this.InitialTest();
  },
  /*
  watch: {
    idActividad(val) {
      if (val > 0) {
        return this.obtenerInfo();
      }
    },
  },*/
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;600;800&display=swap");

.text-center {
  font-family: "Montserrat";
  font-weight: 600;
}
.alertas {
  width: 70%;
  margin-left: 15%;
}
</style>
