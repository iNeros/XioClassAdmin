<template>
  <div class="alumnos">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="titulo-seccion">CREAR UN GRUPO</h1>
          <v-col class="diver" cols="12" lg="12"> </v-col>
        </v-col>
        <v-col cols="12">
          <v-card
            color="#9e9e9e"
            dark
          >
            <v-card-title class="text-h5">
              
            </v-card-title>

            <v-form>
              <v-container>
                <v-row class="mx-5">
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                     v-model="nombreGrupo"
                     label="Nombre del grupo"
                     placeholder="..."
                     outlined
                     height="10px"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                     v-model="identificadorGrupo"
                     label="Identificador del grupo"
                     placeholder="A , B , C , D....."
                     outlined
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="py-0">
                    <v-text-field
                     v-model="periodoGrupo"
                     label="Año"
                     placeholder="1° , 2° , 3° ....."
                     outlined
                    >
                    </v-text-field>
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
                    >                      
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                      outlined
                      label="Contraseña*"
                      v-model="inputs[k].password"
                      placeholder="Contraseña con la que el alumno iniciara sesion"
                    >                      
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                      outlined
                      label="Nombre"
                      v-model="inputs[k].name"
                      placeholder="Un nombre para el alumno"
                    >                      
                    </v-text-field>
                  </v-col> 
                  <v-col cols="12" class="dividerAlumnos mt-n5 mb-2" >
                  </v-col>                 
                </v-row>

                <v-row justify="space-around" >
                    <div>
                      <v-btn color="#80D8FF" elevation="12" height="56" class="mx-4" @click="AddRow()" >
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                    <v-btn color="#80D8FF" elevation="12" height="56" class="mx-4" @click="RemoveRow()" v-show="contadorAlumnos > 0">
                      <v-icon>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                    </div>
                </v-row>
              </v-container>
            </v-form>

            <v-card-actions>
              <v-btn class="mx-3" text  color="#ff3d00" @click="Limpiar()">
                LIMPIAR
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="mx-3" text  color="#64DD17" @click="crearGrupo()">
                CREAR GRUPO
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h1 class="titulo-seccion">MIS GRUPOS</h1>
          <v-col class="diver-red" cols="12" lg="12"> </v-col>
        </v-col>     
      </v-row>
      <v-row>
        <v-col cols="12" md="2" v-for="n in 8" :key="n">
          <v-card
            max-width="300"
            outlined
            color="#9e9e9e"
            dark
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Grupo:
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  1° - A - NOMBRE 
                </v-list-item-title>
                <v-list-item-subtitle>Alumnos inscritos: 14</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn
                text
                color="#ff3d00"
                @click="EliminarDialog(n)"
              > <!-- AQUI LE PASAMOS EL IdGrupo Como Parametro -->
                Eliminar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                right
                color="#FF9800"
                @click="EditarDialog(n)"
              >
                Editar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      
      
      
    </v-container>
    <eliminarGrupo :idGrupoDialog="idGrupo"/> <!-- AQUI SE LE PASA EL idGrupo Como PROP -->
    <editarGrupo :idGrupoDialog="idGrupo" />
  </div>
</template>

<script>
import editarGrupo from "../dialogs/alumnos/editarGrupo.vue";
import eliminarGrupo from "../dialogs/alumnos/eliminarGrupo.vue";

export default {
  name: "alumnos",
  components:{
    editarGrupo,
    eliminarGrupo,

  },
  data(){
    return{
      nombreGrupo: '',
      identificadorGrupo: "",
      periodoGrupo: '',

      inputs: [
        {
          index: 0,
          username: '',
          password: '',
          name: '',
        }
      ],

      contadorAlumnos: 0,

      idGrupo: '',

    }
  },
  methods:{
    Limpiar(){
      this.nombreGrupo = '';
      this.identificadorGrupo = '';
      this.periodoGrupo = '';
      this.inputs = [{
          index: 0,
          username: '',
          password: '',
          name: '',
      }];
    },

    EliminarDialog(id){
      this.idGrupo = id;
      this.$store.state.eliminarGrupoDialog = "true";
    },

    EditarDialog(id){
      this.idGrupo = id;
      this.$store.state.editarGrupoDialog = "true";
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

    postGrupos(){
      //AQUI DENTRO IRA EL POST QUE CREARA EL GRUPO: CON LOS DATOS: nombreGrupo,idGrupo(ESTE NO ES EL ID, es el otro campo),periodoGrupo

    },
    postAlumnos(){
      for(var j=0;j<this.contadorAlumnos;j++){
        //AQUI DENTRO IRA EL POST QUE CREARA LA N CANTIDAD DE ALUMNOS: obteniendo los datos de inputs[j].
      }
    },

    crearGrupo(){
      this.postGrupos();
      this.postAlumnos();


      //ESTE LIMPIAR VA EN EL .THEN DEL AXIOS (O FETCH) QUE HAGAS.
      this.Limpiar();
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;600;800&display=swap");

.titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  color: white;
  font-size: 26px;
  margin-bottom: 5px;
  width: 100%;
}
@media screen and (min-width: 800px) {
  .titulo-seccion {
    font-family: "Montserrat";
    font-weight: 800;
    color: white;
    font-size: 40px;
    margin-bottom: 5px;
    width: 100%;
    color: #23395b;
  }
}
@media screen and (min-width: 800px) {
  .diver {
    width: 100%;
    height: 5px;
    background-color: #64DD17   !important;
    border-radius: 20px;
  }
  .diver-red {
    width: 100%;
    height: 5px;
    background-color: #f44336 !important;
    border-radius: 20px;
  }
}
.diver {
  width: 100%;
  height: 5px;
  background-color: #64DD17   !important;
  border-radius: 20px;
}

.diver-red {
  width: 100%;
  height: 5px;
  background-color: #f44336 !important;
  border-radius: 20px;
}

.dividerAlumnos{
  background-color: #616161;
  height: 10px;
  border-radius: 15px;
}
</style>
