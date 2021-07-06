<template>
  <v-dialog
    v-model="$store.state.editarActividadDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <!--En este vcard, meter el v-for del id edit -->
    <v-card>
      <v-toolbar dark color="#5d4f63">
        <v-btn icon dark @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Editar Actividad</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            :disabled="dialog"
            :loading="dialog"
            dark
            text
            @click="dialog = true"
          >
            Guardar
          </v-btn>
          <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card color="#30dba0" class="pa-2">
              <v-card-text>
                GUARDANDO LOS CAMBIOS
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text class="container">
        <v-container>
          <v-row class="texto-form">
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="nombreActividad"
                filled
                label="Nombre de la actividad*"
                :value="nombreActividad"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="grupoActividad"
                filled
                label="Grupo al que se le sera asignada*"
                :value="grupoActividad"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                id="fechaPublicacion*"
                v-model="fechaPublicacion"
                filled
                type="date"
                label="Fecha de publicacion*"
                hint="Fecha en que la actividad estara disponible"
                required
                :value="fechaPublicacion"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                id="fechaCierre"
                v-model="fechaCierre"
                filled
                type="date"
                label="Fecha de cierre*"
                hint="Fecha en que la actividad se cerrara (esto no evitara que se reciban actividades, pero las marcara con retraso)"
                required
                :value="fechaCierre"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                id="descripcionActividad"
                v-model="descripcionActividad"
                :value="descripcionActividad"
                filled
                label="Descripcion:"
                counter
                maxlength="999"
                hint="Si desea dar instrucciones mas detalladas y por la tanto mas extensas le recomendamos hacerlo dentro de un archivo y adjuntarlo a la actividad"
                full-width
                height="300"
                single-line
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      guardar: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      ActEdit: "",
      nombreActividad: "",
      grupoActividad: "",
      fechaPublicacion: "",
      fechaCierre: "",
      descripcionActividad: "",
      files: [],
    };
  },
  props: ["idActividadEdit"],

  mounted() {},

  methods: {
    closeDialog() {
      this.$store.state.editarActividadDialog = false;
    },

    executeSave(id) {
      //AQUI VA EL POST PARA GUARDAR TODOS LOS DATOS ID: nombreActividad , grupoActividad , fechaPublicacion , fechaCierre , descripcionActividad. ---- Objeto: files
      axios
        .put(
          "https://xicoclass.online/Actividades.php?nombre=" +
            this.nombreActividad +
            "&descripcion=" +
            this.descripcionActividad +
            "&fecha_inicio=" +
            this.fechaPublicacion +
            "&fecha_fin=" +
            this.fechaCierre +
            "&estado=ACTIVO&id_grupo=" +
            this.grupoActividad +
            "&id_docente=6&id_actividad=" +
            id
        )
        .then((r) => {
          //EN EL .THEN DE POST AL COMPLETAR EXITOSAMENTE AGREGAR EL:
          console.log(r.data);
          this.closeDialog();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    ObtenerDatos() {
      // AQUI VA EL GET PARA OBTENER LOS DATOS SEGUN EL ID QUE SE NOS PASO (idActividad)
      axios
        .get(
          "https://xicoclass.online/Actividades.php?id_actividad=" +
            this.idActividadEdit
        )
        .then((r) => {
          this.ActEdit = r.data;
          console.log(this.ActEdit);
          this.nombreActividad = this.ActEdit[0].nombre;
          this.descripcionActividad = this.ActEdit[0].descripcion;
          this.fechaPublicacion = this.ActEdit[0].fecha_inicio;
          this.fechaCierre = this.ActEdit[0].fecha_fin;
          this.grupoActividad = this.ActEdit[0].id_grupo;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => ((this.dialog = false), (this.guardar = true)), 4000);
    },
    guardar(val) {
      if (!val) return;
      this.executeSave(this.idActividadEdit);
    },
    idActividadEdit(val) {
      if (val > 0) {
        return this.ObtenerDatos();
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;0,800;0,900;1,700&display=swap");

.texto-form {
  margin-top: auto;
  margin-bottom: auto;
  height: auto;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}
</style>
