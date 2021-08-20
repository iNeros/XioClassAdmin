<template>
  <div class="evaluarNoviembre">
    <v-dialog v-model="$store.state.evaluarJunioDialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-center grey lighten-2">
          Evaluar El Desempeño Del Alumno:
          <b style="color: #7209b8">{{ alumnoName }}</b>
        </v-card-title>

        <v-card-text class="pa-0">
          <v-sheet class="mx-auto" elevation="0" max-width="800">
            <v-slide-group v-model="model" class="pa-4" show-arrows>
              <v-slide-item
                v-for="(index, id) in options"
                :key="id"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? 'primary' : 'grey lighten-1'"
                  class="ma-2 text-center pt-3"
                  height="100"
                  width="100"
                  @click="toggle"
                >
                  <span class="mini-text">{{ index.name }}</span>
                  <v-row class="mt-1" justify="center">
                    <v-scale-transition> </v-scale-transition>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>

            <v-expand-transition>
              <v-sheet v-if="model != null" height="200" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <v-col cols="12">
                    <h3 class="text-center">Tercera evaluación</h3>
                  </v-col>
                  <v-col cols="11" class="mb-2">
                    <v-textarea
                      v-if="model == 0"
                      outlined
                      label="Evaluación: Lenguaje y Comunicacion"
                      value=""
                      v-model="dataValues[0].text"
                    ></v-textarea>

                    <v-textarea
                      v-if="model == 1"
                      outlined
                      label="Evaluación: Pensamiento Matematico"
                      value=""
                      v-model="dataValues[1].text"
                    ></v-textarea>

                    <v-textarea
                      v-if="model == 2"
                      outlined
                      label="Evaluación: Exploracion y Comprension Del Mundo"
                      value=""
                      v-model="dataValues[2].text"
                    ></v-textarea>

                    <v-textarea
                      v-if="model == 3"
                      outlined
                      label="Evaluación: Arte"
                      value=""
                      v-model="dataValues[3].text"
                    ></v-textarea>

                    <v-textarea
                      v-if="model == 4"
                      outlined
                      label="Evaluación: Educación Socioemocional"
                      value=""
                      v-model="dataValues[4].text"
                    ></v-textarea>

                    <v-textarea
                      v-if="model == 5"
                      outlined
                      label="Evaluación: Educacion Fisica"
                      value=""
                      v-model="dataValues[5].text"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-expand-transition>
          </v-sheet>
        </v-card-text>

        <v-divider class="mt-6"></v-divider>

        <v-card-actions>
          <v-btn color="#cf3259" text @click="closeDialog()"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#2403fc" text @click="GuardarCambios()">
            Guardar Cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "evaluarJunio",

  data() {
    return {
      model: null,
      options: [
        { id: 0, name: "Lenguaje y Comunicación" },
        { id: 1, name: "Pensamiento Matematico" },
        { id: 2, name: "Exploración y Comprensión Del Mundo" },
        { id: 3, name: "Arte" },
        { id: 4, name: "Educación Socioemocional" },
        { id: 5, name: "Eduación Fisica" },
      ],
      dataValues: [
        { id_local: 0, text: "", campoFormativo: "lenguaje" },
        { id_local: 1, text: "", campoFormativo: "pesamiento" },
        { id_local: 2, text: "", campoFormativo: "exploracion" },
        { id_local: 3, text: "", campoFormativo: "arte" },
        { id_local: 4, text: "", campoFormativo: "educacionSocio" },
        { id_local: 5, text: "", campoFormativo: "educacionFisica" },
      ],
    };
  },
  props: ["alumnoId", "alumnoName"],

  methods: {
    closeDialog() {
      this.model = null;
      this.$store.state.evaluarJunioDialog = false;
    },

    getData() {
      this.dataValues = [
        { id_local: 0, text: "", campoFormativo: "lenguaje" },
        { id_local: 1, text: "", campoFormativo: "pesamiento" },
        { id_local: 2, text: "", campoFormativo: "exploracion" },
        { id_local: 3, text: "", campoFormativo: "arte" },
        { id_local: 4, text: "", campoFormativo: "educacionSocio" },
        { id_local: 5, text: "", campoFormativo: "educacionFisica" },
      ];
      //AQUI SE OBTIENEN LOS DATOS DE EVALUACIONES YA HECHAS.
      const id_docente = sessionStorage.getItem("id_docente");
      let calificaciones = [];
      firebase
        .firestore()
        .collection("evaluacionesJunio")
        .where("id_docente", "==", id_docente)
        .where("id_alumno", "==", this.alumnoId)
        .orderBy("id_local")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((calificacion) => {
            let currentID = calificacion.id;
            let appObj = { ...calificacion.data(), ["id"]: currentID };
            calificaciones[appObj.id_local] = appObj;
          });
          for (var i = 0; i < 6; i++) {
            if (calificaciones[i]) {
              this.dataValues[i].id = calificaciones[i].id;
              this.dataValues[i].id_local = calificaciones[i].id_local;
              this.dataValues[i].id_alumno = calificaciones[i].id_alumno;
              this.dataValues[i].id_docente = calificaciones[i].id_docente;
              this.dataValues[i].text = calificaciones[i].text;
            }
          }
        });
    },

    async GuardarCambios() {
      //Guardar Los Cambios
      const id_docente = sessionStorage.getItem("id_docente");
      for (var i = 0; i < 6; i++) {
        if (this.dataValues[i].id) {
          await firebase
            .firestore()
            .collection("evaluacionesJunio")
            .doc(this.dataValues[i].id)
            .update({
              text: this.dataValues[i].text,
            });
        } else {
          await firebase.firestore().collection("evaluacionesJunio").doc().set({
            campoFormativo: this.dataValues[i].campoFormativo,
            id_alumno: this.alumnoId,
            id_docente: id_docente,
            id_local: this.dataValues[i].id_local,
            text: this.dataValues[i].text,
          });
        }
      }
      this.closeDialog();
    },
  },

  mounted() {},

  watch: {
    alumnoId(val) {
      if (val > 0) {
        return this.getData();
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");
.mini-text {
  font-family: "Montserrat", sans-serif;
  font-size: 11px;
  font-weight: 700;
}
</style>
