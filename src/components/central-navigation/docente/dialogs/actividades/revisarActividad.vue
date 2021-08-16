<template>
  <div class="text-center revisarActividadCard">
    <v-dialog
      v-model="$store.state.revisarActividadDialog"
      class="revisarActividadCard"
      width="80%"
      scrollable
    >
      <v-card class="revisarActividad">
        <v-card-title>CALIFICA LA ACTIVIDAD</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-row class="mt-1" v-for="alum in Alumnos" :key="alum.id_alumno">
            <!-- AQUI VA EL V-FOR DEL TAMAÑO DE LA RECUPERACION DE ARCHIVOS WHERE idActividad = idActividadRevisar -->
            <v-col cols="12" md="5">
              <v-btn
                class="nombre-alumno"
                color="black"
                outlined
                width="100%"
                height="80"
                @click="ObtenerArchivosAlumnoSelected(alum.id_alumno)"
              >
                <!-- AGREGAR AQUI EL idAlumno -->
                <v-icon left>mdi-account-circle</v-icon>
                Tarea de: {{ alum.nombre }} {{ alum.appPat }} {{ alum.appMat }}
              </v-btn>
            </v-col>

            <v-col cols="12" md="5">
              <v-textarea
                name="input-7-1"
                label="Comentarios"
                v-model="cometario[alum.id_alumno]"
                outlined
                height="80"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                v-model="calificacion[alum.id_alumno]"
                class="calificaciones-box"
                :items="calificacionesPosibles"
                label="Calificacion"
                full-width
                height="80"
                solo
                dense
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="#FF4365" text @click="closeDialog()"> Cerrar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#30DBA0" text @click="executeRevisar()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template>
      <v-row justify="center">
        <v-dialog v-model="tar" max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Sin archivos </v-card-title>
            <v-card-text>
              El alumno aún no ha cargado su evidencia<br />
              Inténtelo más tarde..
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="tar = false">
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      calificacionesPosibles: [5, 4, 3, 2, 1, 0],
      calificacion: [],
      cometario: [],

      archivosAlumnos: [],
      Alumnos: [],
      tar: false,
    };
  },
  props: ["idActividadRevisar", "idActividadRevisarGrupo"], // ESTE ID DE ACTIVIDAD ES EL QUE SE PASA DE ACTIVIDADES

  methods: {
    obtenerInfo() {
      axios
        .get(
          "https://xicoclass.online/Alumno.php?AlumnosGrupo=" +
            this.idActividadRevisarGrupo
        )
        .then((r) => {
          console.log(r);
          this.Alumnos = r.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    ObtenerArchivosAlumnoSelected(id) {
      //Agregar Aqui Axios Para Descargar Los Archivos Que Se Encuentren Para EL ID Del alumno seleccionado , CONSIDERANDO TAMBIEN El idActividadRevisar.
      axios
        .get(
          "https://xicoclass.online/ArchivosAlumnos.php?ArchivosAct=" +
            this.idActividadRevisar +
            "&id_alumno1=" +
            id
        )
        .then((r) => {
          console.log(r);
          this.archivosAlumnos = r.data;
          if (this.archivosAlumnos.length == 0) {
            this.tar = true;
          } else {
            for (var i = 0; i < this.archivosAlumnos.length; i++) {
              window.open("" + this.archivosAlumnos[i].ruta, "_blank");
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    executeRevisar() {
      //EL POST PARA ACTUALIZAR LAS CALIFIACIONES VA AQUI.... (EN ORDEN LAS CALIFICACIONES QUE SELECCIONEN ESTARAN GUARDADAS EN this.calificacion)
      for (var i = 0; i <= this.calificacion.length; i++) {
        axios
          .put(
            "https://xicoclass.online/ArchivosAlumnos.php?id_alumno=" +
              this.Alumnos[i].id_alumno +
              "&id_actividad=" +
              this.idActividadRevisar +
              "&comentario=" +
              this.cometario[i] +
              "&calificacion=" +
              this.calificacion[i]
          )
          .then((r) => {
            console.log(r.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } //cierra el for
      this.closeDialog();
    },

    closeDialog() {
      this.$store.state.revisarActividadDialog = false;
    },
  },

  watch: {
    idActividadRevisarGrupo(val) {
      if (val > 0) {
        return this.obtenerInfo();
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,400;0,500;0,600;1,800&family=Montserrat:ital,wght@0,200;0,300;0,500;0,600;1,500&display=swap");

.nombre-alumno {
  font-family: "Montserrat", sans-serif;
  font-size: 8px;
  font-weight: 500;
}

.revisarActividadCard {
  width: 700px !important;
}

@media screen and (min-width: 800px) {
  .nombre-alumno {
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
    font-weight: 500;
  }

  .correccion {
    margin-right: 20px;
  }
}

.calificaciones-box {
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 500;
}
</style>
