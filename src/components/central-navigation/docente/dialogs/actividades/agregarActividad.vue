<template>
  <v-dialog v-model="$store.state.crearActividadDialog">
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
              <v-file-input
                id="files"
                v-model="files"
                show-size
                counter
                label="Agregar archivos"
                truncate-length="15"
                multiple
                prepend-icon="mdi-paperclip"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template> 
              </v-file-input>
              <v-progress-linear
                :value="uploadValue"
                height="5px"
                striped
                color="#30dba0"
              ></v-progress-linear>
            </v-col>           
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from 'firebase'


export default {
  name: "agregar-actividad",
  data() {
    return {
      guardar: false,
      dialog: false,
      nombreActividad: "",
      grupoActividad: "",
      fechaPublicacion: "",
      fechaCierre: "",
      descripcionActividad: "",
      CapetaNueva: 25,

      files: [],
      uploadValue: 0,
      cantidadDeFiles: 0,
      urlFile: "",

      
    };
  },
  methods: {
    ObtenerIDActividad(){
      // AXIOS: AQUI SE DEBE OBTENER EL ID DE LA ACTIVIDAD ANTERIOR MAS RECIENTE, POR QUE ESA ACTIVIDAD + 1 Sera El Nombre De: Carpeta Nueva

      // CarpetaNueva = AXIOS ANTERIOR
    },

    closeDialog() {
      this.$store.state.crearActividadDialog = false;

      this.guardar= false;
      this.dialog = false;

      this.nombreActividad = "";
      this.grupoActividad = "";
      this.fechaPublicacion = "";
      this.fechaCierre = "";
      this.descripcionActividad = "";
      this.files = null;
      this.cantidadDeFiles = 0;
      this.urlFile= [];

    },

    cargarArchivos(){
      this.cantidadDeFiles = this.files.length;
      for(var i=0;i<this.cantidadDeFiles;i++){        
        const storageRef = firebase.storage().ref(`/ArchivosDocentes/${this.CapetaNueva}/${this.files[i].name}`);
        const task = storageRef.put(this.files[i]);

        task.on('state_changed',snapshot =>{
          let percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          this.uploadValue = percentage;
        }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
          //OBTENER EL LINK
            task.snapshot.ref.getDownloadURL().then((url)=> {
              this.urlFile[i] = url;
              console.log(this.urlFile[i]);
            });;
          });; 
      };

      //AXIOS POST DE GUARDAR LA INFO , Y LOS LINKS 


         
      this.closeDialog();
      
    },

    executeSave() {  
      this.cargarArchivos();
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
.btn-subir{
  margin-top: 20px;
}
</style>
