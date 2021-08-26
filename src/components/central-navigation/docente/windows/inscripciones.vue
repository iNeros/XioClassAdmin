<template>
  <div class="inscripciones">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="titulo-seccion">DATOS GUARDADOS</h1>
          <v-col class="diver-red" cols="12" lg="12"> </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-card width="100%" elevation="0" color="rgba(0, 0, 0, 0)">
          <v-col cols="12" md="12">
            <template>
              <div>
                <v-data-table
                  :headers="encabezadosTabla"
                  :items="DatosAspirantes"
                  :items-per-page="15"
                  class="tabla-avisos elevation-12 mx-5"
                  height="303"
                >
                  <template v-slot:[`item.curpButton`]="{ item }">
                    <v-btn
                      color="#a19405"
                      text
                      @click="AbrirCurp(item.curpFile)"
                    >
                      {{ item.curpTexto }}
                    </v-btn>
                  </template>
                  <template v-slot:[`item.domicilioButton`]="{ item }">
                    <v-btn
                      color="#a19405"
                      text
                      @click="AbrirDomicilio(item.domicilioFile)"
                    >
                      Comporbante De Domicilio
                    </v-btn>
                  </template>
                  <template v-slot:[`item.ineButton`]="{ item }">
                    <v-btn color="#a19405" text @click="AbrirIne(item)">
                      INE
                    </v-btn>
                  </template>
                </v-data-table>
              </div>
            </template>
          </v-col>
          <v-card-actions>
            <!--
            <v-spacer></v-spacer>
            <v-btn
              outlined
              right
              color="#038a4f"
              class="mr-6"
              @click="guardarCambios()"
            >
              Guardar
            </v-btn>
            -->
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "inscripciones",
  data() {
    return {
      DatosAspirantes: [],
      encabezadosTabla: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
        },
        { text: "Edad", value: "edad", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Curp", value: "curpButton", sortable: false },
        { text: "Nombre Tutor", value: "nombreTutor", sortable: false },
        {
          text: "Comprobante Domicilio",
          value: "domicilioButton",
          sortable: false,
        },
        { text: "INE", value: "ineButton", sortable: false },
      ],
    };
  },
  mounted() {
    this.obtenerInfo();
  },
  methods: {
    async obtenerInfo() {
      let resultados = [];
      await firebase
        .firestore()
        .collection("pre-inscripcion")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((resultado) => {
            let currentID = resultado.id;
            let appObj = { ...resultado.data(), ["id"]: currentID };
            resultados.push(appObj);
          });
        });
      this.DatosAspirantes = resultados;
      console.log("DATOS DE LOS ASPIRANTES: ", this.DatosAspirantes);
    },
    AbrirCurp(data) {
      window.open(data);
    },
    AbrirDomicilio(data) {
      window.open(data);
    },
    AbrirIne(data) {
      window.open(data.ineFrente, "INE FRENTE");
      window.open(data.ineReverso, "INE REVERSO");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;600;800&display=swap");

.titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 26px;
  margin-bottom: 5px;
  width: 100%;
  color: #23395b;
}
@media screen and (min-width: 800px) {
  .titulo-seccion {
    font-family: "Montserrat";
    font-weight: 800;
    font-size: 40px;
    margin-bottom: 5px;
    width: 100%;
    color: #23595b;
  }
}
@media screen and (min-width: 800px) {
  .diver {
    width: 100%;
    height: 5px;
    background-color: #4f8ad8 !important;
    border-radius: 20px;
  }
  .diver-red {
    width: 100%;
    height: 5px;
    background-color: #c2185b !important;
    border-radius: 20px;
  }
}
.diver {
  width: 100%;
  height: 5px;
  background-color: #4f8ad8 !important;
  border-radius: 20px;
}

.diver-red {
  width: 100%;
  height: 5px;
  background-color: #c2185b !important;
  border-radius: 20px;
}

.tabla-avisos {
  height: 70vh;
}
</style>
