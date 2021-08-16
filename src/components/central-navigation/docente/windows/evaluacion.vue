<template>
  <div class="evaluacion">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="titulo-seccion">MIS GRUPOS</h1>
          <v-col class="diver-red" cols="12" lg="12"> </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="3"
          sm="6"
          v-for="Grupos in GruposDocente"
          :key="Grupos.id_grupo"
        >
          <v-card max-width="300" outlined elevation="8">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Grupo: {{ Grupos.periodo }}° - "{{ Grupos.grupo }}"
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ Grupos.nombre }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >Edita para visualizar los alumnos
                  inscritos</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                right
                color="#E57C04"
                @click="EvaluarGrupo(Grupos.id_grupo, Grupos.nombre)"
              >
                Evaluar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="titulo-seccion">EVALUANDO A: {{ grupoSelected }}</h1>
          <v-col class="diver" cols="12" lg="12"> </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-card width="100%" elevation="0" color="rgba(0, 0, 0, 0)">
          <v-col cols="12" md="12">
            <template>
              <div class="tabla-avisos">
                <v-data-table
                  :headers="encabezadosTabla"
                  :items="DatosAlumnos"
                  :items-per-page="5"
                  class="tabla-avisos elevation-12 mx-5"
                  height="303"
                >
                  <template v-slot:[`item.calificaciones`]="{ item }"
                    ><!--HELP MINERO-->
                    <v-btn
                      color="#a19405"
                      outlined
                      @click="RevisarCalificaciones(item)"
                    >
                      <v-icon color="#a19405" class="mx-1">
                        mdi-clipboard-text-search-outline
                      </v-icon>
                      Revisar Calificaciones
                    </v-btn>
                  </template>
                  <template v-slot:[`item.observa_nov`]="{ item }"
                    ><!--HELP MINERO-->
                    <v-btn
                      color="#23a894"
                      outlined
                      @click="evaluarNoviembre(item)"
                    >
                      <v-icon color="#23a894" class="mx-1">
                        mdi-clipboard-text-search-outline
                      </v-icon>
                      Evaluar Noviembre
                    </v-btn>
                  </template>
                  <template v-slot:[`item.observa_mar`]="{ item }"
                    ><!--HELP MINERO-->
                    <v-btn color="#0978b8" outlined @click="evaluarMarzo(item)">
                      <v-icon color="#0978b8" class="mx-1">
                        mdi-clipboard-text-search-outline
                      </v-icon>
                      Evaluar Marzo
                    </v-btn>
                  </template>
                  <template v-slot:[`item.observa_jun`]="{ item }"
                    ><!--HELP MINERO-->
                    <v-btn color="#7209b8" outlined @click="evaluarJunio(item)">
                      <v-icon color="#7209b8" class="mx-1">
                        mdi-clipboard-text-search-outline
                      </v-icon>
                      Evaluar Junio
                    </v-btn>
                  </template>
                  <!-- <template v-slot:[`item.actions`]="{ item2 }"
                                    >
                                    <v-icon
                                    @click="ImprimirCartila(item2)"
                                    color="#23595b"
                                    >
                                    mdi-printer-outline
                                    </v-icon>
                                </template> -->
                </v-data-table>
              </div>
            </template>
          </v-col>
          <v-card-actions>
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
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>

    <revisaCalificacion
      :alumnoId="alumnoSelected"
      :alumnoName="alumnoSelectedName"
      :calificacionesData="dataCalificaciones"
    />
    <evaluarNoviembre
      :alumnoId="alumnoSelected"
      :alumnoName="alumnoSelectedName"
    />
    <evaluarMarzo :alumnoId="alumnoSelected" :alumnoName="alumnoSelectedName" />
    <evaluarJunio :alumnoId="alumnoSelected" :alumnoName="alumnoSelectedName" />
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import revisaCalificacion from "../dialogs/evaluacion/revisarCalificaciones.vue";
import evaluarNoviembre from "../dialogs/evaluacion/evaluarNoviembre.vue";
import evaluarMarzo from "../dialogs/evaluacion/evaluarMarzo.vue";
import evaluarJunio from "../dialogs/evaluacion/evaluarJunio.vue";

export default {
  name: "evaluacion",

  components: {
    revisaCalificacion,
    evaluarNoviembre,
    evaluarMarzo,
    evaluarJunio,
  },

  data() {
    return {
      GruposDocente: [],
      grupoSelected: "",
      encabezadosTabla: [
        {
          text: "Alumno",
          align: "start",
          value: "nombreCompleto",
        },
        { text: "Calificaciones", value: "calificaciones", sortable: false },
        {
          text: "Observaciones Noviembre",
          value: "observa_nov",
          sortable: false,
        },
        { text: "Observaciones Marzo", value: "observa_mar", sortable: false },
        { text: "Observaciones Junio", value: "observa_jun", sortable: false },
        //{ text: "Acciones", value: "actions", sortable: false, },
      ],
      DatosAlumnos: [],
      alumnoSelected: 0,
      alumnoSelectedName: "",
      dataCalificaciones: [],
    };
  },
  methods: {
    ImprimirCartila(data) {
      console.log(data);
    },

    RevisarCalificaciones(data) {
      this.alumnoSelected = data.id_alumno;
      this.alumnoSelectedName = data.nombreCompleto;
      this.dataCalificaciones = data.dataCalificaciones;
      this.$store.state.revisarCalificacionDialog = true;
    },

    evaluarNoviembre(data) {
      this.alumnoSelected = data.id_alumno;
      this.alumnoSelectedName = data.nombreCompleto;
      this.$store.state.evaluarNoviembreDialog = true;
    },
    evaluarMarzo(data) {
      this.alumnoSelected = data.id_alumno;
      this.alumnoSelectedName = data.nombreCompleto;
      this.$store.state.evaluarMarzoDialog = true;
    },
    evaluarJunio(data) {
      this.alumnoSelected = data.id_alumno;
      this.alumnoSelectedName = data.nombreCompleto;
      this.$store.state.evaluarJunioDialog = true;
    },

    EvaluarGrupo(id, name) {
      this.evaluacionData = [];
      this.grupoSelected = name;
      this.obtenerAlumnos(id);
    },

    GruposDoc() {
      axios
        .get(
          "https://xicoclass.online/Grupo.php?id_docente=" +
            window.sessionStorage.getItem("id_docente")
        )
        .then((r) => {
          this.GruposDocente = r.data;
          console.log(this.GruposDocente);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async obtenerAlumnos(id_grupo) {
      //Aqui Obtengo Los Datos De Todos Los Alumnos Que Esten En El Grupo (id_grupo)
      axios
        .get(
          "https://xicoclass.online/Grupo.php?id_grupos=" +
            id_grupo +
            "&id_docentes=" +
            window.sessionStorage.getItem("id_docente")
        )
        .then((r) => {
          this.DatosAlumnos = r.data.map((a) => {
            const calificaciones = [];
            firebase
              .firestore()
              .collection("calificacionesAlumnos")
              .where("id_alumno", "==", a.id_alumno)
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((calificacion) => {
                  let currentID = calificacion.id;
                  let appObj = { ...calificacion.data(), ["id"]: currentID };
                  calificaciones.push(appObj);
                });
              });
            return {
              nombreCompleto: a.nombre + " " + a.appPat + " " + a.appMat,
              id_alumno: a.id_alumno,
              dataCalificaciones: calificaciones,
            };
          });
          console.log(this.DatosAlumnos);
        });
      console.log(id_grupo);
    },
  },
  mounted() {
    this.GruposDoc();
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
</style>
