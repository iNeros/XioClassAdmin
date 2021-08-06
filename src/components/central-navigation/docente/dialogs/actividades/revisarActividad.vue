<template>
  <div class="text-center revisarActividadCard">
    <v-dialog
      v-model="$store.state.revisarActividadDialog"
      class="revisarActividadCard"
      width="80%"
      scrollable
    >
      <v-card class="revisarActividad" >
        <v-card-title>CALIFICA LA ACTIVIDAD</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-row class="mt-1" v-for="n in 20" :key="n">
            <!-- AQUI VA EL V-FOR DEL TAMAÑO DE LA RECUPERACION DE ARCHIVOS WHERE idActividad = idActividadRevisar -->
            <v-col cols="12" md="5">
              <v-btn
                class="nombre-alumno"
                color="black"
                outlined
                width="100%"
                height="80"
                @click="ObtenerArchivosAlumnoSelected(1)"
              >
                <!-- AGREGAR AQUI EL idAlumno -->
                <v-icon left>mdi-account-circle</v-icon>
                EL NOMBRE MAS LARGO DE CUALQUIER ALUMNO [{{ n }}]
              </v-btn>
            </v-col>

            <v-col cols="12" md="6">
              <v-textarea
                name="input-7-1"
                label="Comentarios"
                v-model="cometario[n]"
                outlined
                height="80"
              ></v-textarea>
            </v-col>
            
            <v-col cols="12" md="1">
              <v-select
                v-model="calificacion[n]"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      calificacionesPosibles: [5, 4, 3, 2, 1, 0],
      archivosAlumnos: [1, 2, 3],
      calificacion: [],
      cometario: [],
    };
  },
  props: ["idActividadRevisar"], // ESTE ID DE ACTIVIDAD ES EL QUE SE PASA DE ACTIVIDADES

  methods: {
    obtenerInfo() {
      //Aqui Se Optiene La Info Basica De La Actividad Apartir Del: idActividad
      //Aqui guardaras tambien en el arreglo this.calificacion las calificaciones.
    },

    ObtenerArchivosAlumnoSelected(id) {
      //Agregar Aqui Axios Para Descargar Los Archivos Que Se Encuentren Para EL ID Del alumno seleccionado , CONSIDERANDO TAMBIEN El idActividadRevisar.

      console.log(id);
    },

    executeRevisar() {
      //EL POST PARA ACTUALIZAR LAS CALIFIACIONES VA AQUI.... (EN ORDEN LAS CALIFICACIONES QUE SELECCIONEN ESTARAN GUARDADAS EN this.calificacion)
      console.log(this.calificacion);
      //DENTRO DEL .THEN() DE EXTIO VA ESTO:
      this.closeDialog();
    },

    closeDialog() {
      this.$store.state.revisarActividadDialog = false;
    },
  },

  mounted() {
    //Mandar a llama a obtenerInfo()
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

.revisarActividadCard{
  width: 700px!important;
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
