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
            color="#474747"
            dark
          >
            <v-card-title class="text-h5">
              
            </v-card-title>

            <v-form>
              <v-container>
                <v-row class="mx-5">
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                     label="Nombre del grupo"
                     placeholder="..."
                     outlined
                     height="10px"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                     label="Identificador del grupo"
                     placeholder="A , B , C , D....."
                     outlined
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="py-0">
                    <v-text-field
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
            </v-form>

            <v-card-actions>
              <v-btn class="mx-3" text  color="#EF476F">
                LIMPIAR
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="mx-3" text  color="#30DBA0">
                CREAR GRUPO
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1 class="titulo-seccion">MIS GRUPOS</h1>
          <v-col class="diver-red" cols="12" lg="12"> </v-col>
        </v-col>
        

      </v-row>
    </v-container>
  </div>
</template>

<script>


export default {
  name: "alumnos",
  data(){
    return{
      inputs: [
        {
          index: 0,
          username: ' ',
          password: ' ',
          name: ' ',
        }
      ],
      contadorAlumnos: 0,

    }
  },
  methods:{
    AddRow(){
      this.contadorAlumnos++;
      this.inputs.push({index: this.contadorAlumnos,username:'',password:'', name: ''});
      console.log(this.inputs[this.contadorAlumnos-1].name);
    },
    RemoveRow(){
      this.inputs.splice(((this.inputs.length)-1));
      this.contadorAlumnos--;
      console.log(this.inputs);
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
    background-color: #30dba0 !important;
    border-radius: 20px;
  }
  .diver-red {
    width: 100%;
    height: 5px;
    background-color: #d81e5b !important;
    border-radius: 20px;
  }
}
.diver {
  width: 100%;
  height: 5px;
  background-color: #30dba0 !important;
  border-radius: 20px;
}

.diver-red {
  width: 100%;
  height: 5px;
  background-color: #d81e5b !important;
  border-radius: 20px;
}
</style>
