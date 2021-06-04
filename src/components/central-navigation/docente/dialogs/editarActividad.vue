<template>
<v-dialog
  v-model="$store.state.editarActividadDialog"
  fullscreen
  hide-overlay
  transition="dialog-bottom-transition"
>
    <v-card>
        <v-toolbar
          dark
          color="#5d4f63"
        >
          <v-btn
            icon
            dark
            @click="closeDialog()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Editar Actividad {{idActividadEdit}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              :disabled="dialog"
              :loading="dialog"
              dark
              text
              @click="(dialog = true)"
            >
              Guardar
            </v-btn>
            <v-dialog
              v-model="dialog"
              hide-overlay
              persistent
              width="300"
            >
              <v-card
                color="#30dba0"
                class="pa-2"
              >
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
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="nombreActividad"
                  filled
                  label="Nombre de la actividad*"
                  :value="nombreActividad"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="grupoActividad"
                  filled
                  label="Grupo al que se le sera asignada*"
                  :value="grupoActividad"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="6"
              >
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

              <v-col
                cols="12"
                sm="6"
                md="6"
              >
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
              </v-col
              >
              <v-col cols="12">
                <v-file-input
                  id="files"
                  v-model="files"
                  label="Agregar archivos"
                  truncate-length="15"
                  multiple
                  prepend-icon="mdi-paperclip"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip
                      small
                      label
                      color="primary"
                    >
                      {{ text }}
                    </v-chip>
                  </template>
                </v-file-input>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    data(){
        return{
            guardar: false,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            nombreActividad: "Cargando...........",
            grupoActividad: "Cargando ...........",
            fechaPublicacion: "2021-01-01",
            fechaCierre: "2021-01-01",
            descripcionActividad: "Cargando.......",
            files:[],
        }
    },
    props: ['idActividadEdit'],

    mounted() {
      this.ObtenerDatos();
    },

    methods:{
        closeDialog(){
            this.$store.state.editarActividadDialog = false;
        },

        executeSave(){
            //AQUI VA EL POST PARA GUARDAR TODOS LOS DATOS ID: nombreActividad , grupoActividad , fechaPublicacion , fechaCierre , descripcionActividad. ---- Objeto: files
            console.log("Nombre Actividad = "+ this.nombreActividad + "\n" + "Grupo Actividad = "+ this.grupoActividad + "\n" + 
            "Fecha Publicacion = "+ this.fechaPublicacion + "\n" + "Fecha Cierre = "+ this.fechaCierre + "\n" + 
            "Descripcion = "+ this.descripcionActividad + "\n");
            

            //EN EL .THEN DE POST AL COMPLETAR EXITOSAMENTE AGREGAR EL:
            this.closeDialog()
        },
        ObtenerDatos(){
          // AQUI VA EL GET PARA OBTENER LOS DATOS SEGUN EL ID QUE SE NOS PASO (idActividad).
          console.log(this.idActividadEdit);
        }

    },
    watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false,this.guardar = true), 4000);
      },
      guardar (val){
        if (!val) return
        this.executeSave();
      }
    },
    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;0,800;0,900;1,700&display=swap');

.texto-form{
    margin-top: auto;
    margin-bottom: auto;
    height: auto;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
}


</style>