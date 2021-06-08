<template>
  <v-dialog
    v-model="$store.state.editarGrupoDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="#5d4f63">
        <v-btn icon dark @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title
          >Editar Actividad {{ idGrupoDialog }}</v-toolbar-title
        >
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
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="nombreGrupo"
                filled
                label="Nombre del grupo*"
                :value="nombreGrupo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="identificadorGrupo"
                filled
                label="Identificador del grupo*"
                :value="identificadorGrupo"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                id="Año Asociado*"
                v-model="periodoGrupo"
                filled
                label="Año del grupo*"
                required
                :value="periodoGrupo"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card-title class="text-h5">
            AGREGAR ALUMNOS
          </v-card-title>
            <v-row class="py-0 mx-5" v-for="(input,k) in inputs" :key="k">
              <v-col cols="12" md="4" class="py-0">
                <v-text-field
                  outlined
                  label="Usuario*"
                  v-model="inputs[k].username"
                  placeholder="El usuario con el que el alumno iniciara sesion"
                  :value="inputs[k].username"
                >                      
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="py-0">
                <v-text-field
                  outlined
                  label="Contraseña*"
                  v-model="inputs[k].password"
                  placeholder="Contraseña con la que el alumno iniciara sesion"
                  :value="inputs[k].password"
                >                      
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="py-0">
                <v-text-field
                  outlined
                  label="Nombre"
                  v-model="inputs[k].name"
                  placeholder="Un nombre para el alumno"
                  :value="inputs[k].name"
                >                      
                </v-text-field>
              </v-col> 
              <v-col cols="12" class="dividerAlumnos mt-n5 mb-2" >
              </v-col>                 
            </v-row>

            <v-row justify="space-around" >
                <div>
                  <v-btn color="#28262C" elevation="12" height="56" class="mx-4" @click="AddRow()" >
                  <v-icon>
                    mdi-plus
                  </v-icon>
                </v-btn>
                <v-btn color="#28262C" elevation="12" height="56" class="mx-4" @click="RemoveRow()" v-show="contadorAlumnos > 0">
                  <v-icon>
                    mdi-minus
                  </v-icon>
                </v-btn>
                </div>
            </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      guardar: false,
      dialog: false,

      nombreGrupo: '',
      identificadorGrupo: "",
      periodoGrupo: '',

      inputs: [
        {
          index: 0,
          username: '',
          password: '',
          name: '',
          idAlumno: '',
        }
      ],

      contadorAlumnos: 0,

    };
  },
  props: ["idGrupoDialog"],

  mounted() {
    //ObtenerDatos();
  },

  methods: {
    closeDialog() {
      this.$store.state.editarGrupoDialog = false;
    },
    AddRow(){
      this.contadorAlumnos++;
      this.inputs.push({index: this.contadorAlumnos,username:'',password:'', name: ''});
      console.log(this.inputs[this.contadorAlumnos-1].name);
    },
    RemoveRow(){
      this.inputs.splice(((this.inputs.length)-1));
      this.contadorAlumnos--;
      console.log(this.inputs);
    },

    ObtenerDatos() {
      // AQUI VA EL GET PARA OBTENER LOS DEL Grupo WHERE idGrupo = idGrupoDialog , y Guardarlos En : nombreGrupo , identificadorGrupo periodoGrupo

      //LUEGO DE ESTO OBTENDRAS EL TOTAL DE ALUMNOS QUE TIENE EL GRUPO CON un COUNT() WHERE idGrupo = idGrupoDialog Y GUARDAS EL COUNT EN: contadorAlumnos

      //LUEGO DE ESTO GUARDAS A TODOS LOS ALUMNOS WHERE idGrupo = idGrupoDialog en inputs[] (Guardas El Id Del Alumno Que Traes En: this.idAlumnos.) 
      for(var i=0;i<this.contadorAlumnos;i++){this.inputs[i].index = i;} //ESTO DEJALO POR Ahi.. :v
        
    },

    executeSave() {
      //AQUI VA EL POST PARA MODIFICAR LA EL CONTENIDO DE GRUPOS WHERE idGrupo SEA = idGrupoDialog
      

      //------------------------------------------------------------------------------------------------------
      for(var n=0;n<this.contadorAlumnos;n++){
        //AQUI VA EL POST PARA MODIFICAR EL CONTENIDO DE LOS ALUMNOS WHERE idAlumnos = this.inputs[n].idAlumno
      }

      console.log(
        
      );

      //EN EL .THEN DE POST AL COMPLETAR EXITOSAMENTE AGREGAR EL:
      this.closeDialog();
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
</style>
