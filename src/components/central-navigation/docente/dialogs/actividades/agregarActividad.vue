<template>
  <v-dialog
    v-model="$store.state.crearActividadDialog"
  >
    <v-card>
      <v-toolbar dark color="#5d4f63">
        <v-btn icon dark @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Crear Actividad</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            :disabled="dialog"
            dark
            text
            @click="guardar = true"
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
                id="nombreActividad"
                v-model="nombreActividad"
                filled
                label="Nombre de la actividad"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                id="grupoActividad"
                v-model="grupoActividad"
                filled
                label="Grupo al que se le sera asignada"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                id="fechaPublicacion"
                v-model="fechaPublicacion"
                filled
                type="date"
                label="Fecha de publicacion"
                hint="Fecha en que la actividad estara disponible"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                id="fechaCierre"
                v-model="fechaCierre"
                filled
                type="date"
                label="Fecha de cierre"
                hint="Fecha en que la actividad se cerrara (esto no evitara que se reciban actividades, pero las marcara con retraso)"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                id="descripcionActividad"
                v-model="descripcionActividad"
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
            <v-col cols="11">
              <input
                id="files"
                type="file"
                multiple
                ref="ArchivosDocentes"
                :disabled="Load"
                label="Agregar archivos"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
  name: "agregar-actividad",
  data() {
    return {
      guardar: false,
      dialog: false,
      Load:false,
      //variables para el post del axios
      nombreActividad: "",
      grupoActividad: "",
      fechaPublicacion: "",
      fechaCierre: "",
      descripcionActividad: "",
      pruebamagos:[],
      //variable para crear una carpeta en firebase manualmente
      //se asignará el número de carpeta, usando el id de la actividad creada
      CapetaNueva: "",
      //variables para la funcion de firebase
      Archivos: [],
      uploadValue: 0,
      cantidadDeFiles: 0,
      urlFile: "",

      Bandera:false,
    };
  },
  methods: {
    ObtenerIDActividad() {
      axios
        .get("https://xicoclass.online/Actividades.php?max")
        .then((r) => {
          this.CapetaNueva = r.data;
          this.CapetaNueva[0].nuevo_id = parseInt(this.CapetaNueva[0].nuevo_id)+1;
          console.log(this.CapetaNueva[0].nuevo_id);

        })
        .catch(function (error) {
          console.log(error);
        });
    },

    closeDialog() {
      this.$store.state.crearActividadDialog = false;

      this.guardar = false;
      this.dialog = false;

      this.nombreActividad = "";
      this.grupoActividad = "";
      this.fechaPublicacion = "";
      this.fechaCierre = "";
      this.descripcionActividad = "";
      this.Archivos = [];
      this.cantidadDeFiles = 0;
      this.urlFile = [];
    },
  
    async subirArchivo(){
      this.cantidadDeFiles = 5;
      for (var i = 0; i < this.cantidadDeFiles; i++) {
      try {
        const { files } = this.$refs.ArchivosDocentes;
        this.Load = true;
        const file = files[i];
        this.Archivos[i] = files[i];
        if (file) {
            const response = await firebase
              .storage()
              .ref(`/ArchivosDocentes/${this.CapetaNueva[0].nuevo_id}/${file.name}`)
              .put(file);
              const url = await response.ref.getDownloadURL();
            this.urlFile = url;
            this.Archi(i);
            console.log('archivo disponible en ', this.urlFile);
        } else {
          console.log('falta el archivo');
        }

        
      } catch (error) {
        console.error(error);
      }
      }//termina el for
      this.closeDialog();
      this.Load = false;
    },
    //AXIOS POST DE GUARDAR LA INFO , Y LOS LINKS
    Actividad() {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      let parametros =
        "nombre=" +
        this.nombreActividad +
        "&descripcion=" +
        this.descripcionActividad +
        "&fecha_inicio=" +
        this.fechaPublicacion +
        "&fecha_fin=" +
        this.fechaCierre +
        "&estado=ACTIVO&id_docente=6&id_grupo=" +
        this.grupoActividad;
        axios
          .post("https://xicoclass.online/Actividades.php", parametros, config)
          .then((r) => {
            console.log(r);
            this.subirArchivo();
          })
          .catch((error) => {
            console.log(error);
      });
    },
  Archi(i){
//Esta mamada es para decodificar: const decodedData = window.atob(encodedData);
//esta es para codificar:
var encodedData = btoa(''+this.urlFile);
          let config1 = {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
          };
              const parametros1 =
                "nombre=" + 
                this.Archivos[i].name +
                "&tipo=PDF&id_actividades=" +
                this.CapetaNueva[0].nuevo_id +
                "&ruta="+
                encodedData;
              axios
                .post(
                  "https://xicoclass.online/Archivos.php",
                  parametros1,
                  config1
                )
                .then((r) => {
                  console.log(r);
                })
                .catch((error) => {
                  console.log(error);
                });
    },
    executeSave() {
      this.Actividad();
    },
  },
  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => ((this.dialog = false), (this.guardar = true)), 4000);
    },
    guardar(val) {
      if (!val) return;
      this.executeSave();
    },
    nombreActividad(val){
      if (!val) return;
      this.ObtenerIDActividad();       
    },
    Bandera(val){
      if (!val) return;
      this.Actividad();      
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
.btn-subir {
  margin-top: 20px;
}
</style>
