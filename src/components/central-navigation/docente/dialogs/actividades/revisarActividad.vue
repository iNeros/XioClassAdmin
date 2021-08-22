<template>
  <div class="text-center revisarActividadCard">
    <v-dialog
      v-model="$store.state.revisarActividadDialog"
      class="revisarActividadCard"
      width="80%"
      scrollable
      persistent
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
                :value="calificacion[alum.id_alumno]"
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
        <v-dialog v-model="tar" max-width="290" persistent>
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
import firebase from "firebase";
import axios from "axios";
export default {
  data() {
    return {
      calificacionesPosibles: [5, 4, 3, 2, 1, 0],
      calificacion: [],
      cometario: [],
      archivosAlumnos: [],
      Alumnos: [],
      tempData: [],
      tempAlumnos: [],
      tar: false,
    };
  },
  props: ["idActividadRevisar", "idActividadRevisarGrupo"], // ESTE ID DE ACTIVIDAD ES EL QUE SE PASA DE ACTIVIDADES

  methods: {
    async obtenerInfo() {
      axios
        .get(
          "https://xicoclass.online/Alumno.php?AlumnosGrupo=" +
            this.idActividadRevisarGrupo
        )
        .then((r) => {
          this.Alumnos = r.data;
          console.log(this.Alumnos);
          this.obtenerComentarios(r.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async ObtenerArchivosAlumnoSelected(id) {
      const id_docente = window.sessionStorage.getItem("id_docente");
      console.log(id_docente, id);
      const calificaciones = [];
      await firebase
        .firestore()
        .collection("relacionDeTareas")
        .where("id_actividad", "==", this.idActividadRevisar)
        .where("id_docente", "==", id_docente)
        .where("id_grupo", "==", this.idActividadRevisarGrupo)
        .where("id_alumno", "==", id)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((calificacion) => {
            let currentID = calificacion.id;
            let appObj = { ...calificacion.data(), ["id"]: currentID };
            calificaciones.push(appObj);
          });
        });
      if (calificaciones[0]) {
        for (var i = 0; i < calificaciones[0].url_documents.length; i++) {
          window.open(calificaciones[0].url_documents[i]);
        }
      } else {
        this.tar = true;
      }
    },

    async obtenerComentarios(data) {
      let result = data.map((id) => id.id_alumno);
      await firebase
        .firestore()
        .collection("calificacionesAlumnos")
        .where("id_alumno", "in", result)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((calificacion) => {
            let currentID = calificacion.id;
            let appObj = { ...calificacion.data(), id: currentID };
            this.tempData.push(appObj);
          });
          this.establecerComentarios();
        });
    },

    establecerComentarios() {
      for (let n = 0; n < this.tempData.length; n++) {
        this.cometario[this.tempData[n].id_alumno] =
          this.tempData[n].descripcion;
        this.calificacion[this.tempData[n].id_alumno] = parseInt(
          this.tempData[n].calificacion
        );
      }
      this.tempAlumnos = this.Alumnos;
      this.Alumnos = null;
      this.Alumnos = this.tempAlumnos;

      console.log("LOS COMENTARIOS: ", this.cometario);
      console.log("LAS CALIFICACIONES: ", this.calificacion);
    },

    async executeRevisar() {
      //EL POST PARA ACTUALIZAR LAS CALIFIACIONES VA AQUI.... (EN ORDEN LAS CALIFICACIONES QUE SELECCIONEN ESTARAN GUARDADAS EN this.calificacion)

      console.log("TEMP DATA: ", this.tempData);

      for (let i = 0; i < this.Alumnos.length; i++) {
        const object = {
          calificacion: this.calificacion[this.Alumnos[i].id_alumno],
          descripcion: this.cometario[this.Alumnos[i].id_alumno],
          id_actividad: this.idActividadRevisar,
          id_alumno: this.Alumnos[i].id_alumno,
          nombreActividad: "nombre-de-la-actividad",
        };
        if (this.tempData[i]) {
          await firebase
            .firestore()
            .collection("calificacionesAlumnos")
            .doc(this.tempData.id)
            .set(object);
        } else {
          await firebase
            .firestore()
            .collection("calificacionesAlumnos")
            .doc()
            .set(object);
        }
      }
      axios
        .put(
          "https://xicoclass.online/Actividades.php?upestado=ACTIVO&id_actividad="+
            this.idActividadRevisar
        )
        .then((r) => {
          //EN EL .THEN DE POST AL COMPLETAR EXITOSAMENTE AGREGAR EL:
          console.log(r.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      await this.closeDialog();
    },

    closeDialog() {
      this.$store.state.revisarActividadDialog = false;
      this.tempAlumnos = this.Alumnos;
      this.Alumnos = null;
      this.Alumnos = this.tempAlumnos;

      this.calificacion = [];
      this.cometario = [];
      this.archivosAlumnos = [];
      this.Alumnos = [];
      this.tempData = [];
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
