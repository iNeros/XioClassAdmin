<template>
  <div class="actividades">
    <v-container fluid>
      <v-row class="container">
        <!--#region ESTA CARD ES ESTATICA , ESTE ES EL BOTON PARA AGREGAR UNA ACTIVIDAD NUEVA --->
        <h1 class="titulo-seccion">ACTIVIDADES RECIENTES</h1>
        <v-col class="diver" cols="12" lg="12"> </v-col>
        <v-col sm="12" lg="3">
          <v-card color="#23395B" dark height="260" elevation="12">
            <v-card-title class="texto-nueva-activity">
              <span
                class="title-nueva-activity"
                style="color: #adb9e3; font-weight: 800"
              >
                AGREGAR NUEVA ACTIVIDAD
              </span>
            </v-card-title>

            <v-card-actions>
              <v-btn class="mx-auto" height="120" text plain>
                <v-icon size="100">mdi-sticker-plus-outline</v-icon>
                <!-- AQUI SE AGREGA LA ACCION DE CREAR ACTIVIDAD -->
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <!--#endregion-->

        <!--#region AQUI VAN LAS 3 CARDS QUE SE DESPLEGARAN EN ACTIVIDADES RECIENTES -->
        <v-col sm="12" lg="3">
          <!-- AQUI VA UN V-FOR PARA DESPLEGAR LAS ULTIMAS 3 ACTIVIDADES --->
          <v-card color="#23395B" dark class="card-settings" elevation="12">
            <v-card-title class="card-title-text">
              <span class="titulo-de-tarjeta">GRUPO: </span>
              <span class="titulo-de-tarjeta2">"NOMBRE DEL GRUPO"</span>
              <div class="hidden-md-and-down">
                <v-icon size="24" right>mdi-check-all</v-icon>
              </div>
              <!-- AQUI VA UN V-IF DE SI YA ESTA REVISADA LA ACTIVIDAD -->
            </v-card-title>

            <v-card-subtitle class="texto-tarjeta-settings">
              <span class="texto-de-tarjeta">ACTIVIDAD: </span> <br />
              <span class="texto-de-tarjeta2">
                "NOMBRE DE LA ACTIVIDAD VA A ESTAR AQUI"
              </span>
              <br />
              <br />
              <span class="texto-de-tarjeta"> FECHA PUBLICACION:</span>
              <span class="texto-de-tarjeta2">"01/01/2021"</span> <br />
              <span class="texto-de-tarjeta"> FECHA VENCIMIENTO:</span>
              <span class="texto-de-tarjeta2">"01/01/2021"</span>
            </v-card-subtitle>

            <v-card-actions class="hidden-md-and-down">
              <v-col cols="12" md="4">
                <v-btn color="#FF4365" text> Eliminar </v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn color="#FFD166" text> Editar </v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn color="#30DBA0" text> Revisar </v-btn>
              </v-col>
            </v-card-actions>

            <!--                                VIZUALIZACION DE LOS BOTONES EN DISPITIVO MOVILES                     -->
            <v-row class="hidden-md-and-up mx-n4">
              <v-col cols="3" md="4">
                <v-btn color="#FF4365" text plain>
                  <v-icon size="20">mdi-delete</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" md="4">
                <v-btn color="#FFD166" text plain>
                  <v-icon size="20">mdi-file-edit-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" md="4">
                <v-btn color="#30DBA0" text plain>
                  <v-icon size="20">mdi-check-all</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!--#endregion-->
      </v-row>

      <v-row class="container">
        <h1 class="titulo-seccion">ACTIVIDADES POR GRUPO</h1>
        <v-col class="diver-red" cols="12" lg="12"> </v-col>
        <template>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="11">
                <v-combobox
                  v-model="select"
                  :items="items"
                  label="SELECCIONA LOS GRUPOS"
                  multiple
                  outlined
                  dense
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="1">
                <v-btn width="100%" text color="#D81E5B" v-on:click="test()">
                  <v-icon left>mdi-magnify</v-icon> FILTRAR
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <v-col sm="12" lg="3">
          <!-- AQUI VA UN V-FOR PARA DESPLEGAR LAS ACTIVIDADES SEGUN LOS GRUPOS (IDs) SELECCIONADOS --->
          <v-card color="#23395B" dark class="card-settings" elevation="12">
            <v-card-title class="card-title-text">
              <span class="titulo-de-tarjeta">GRUPO: </span>
              <span class="titulo-de-tarjeta2">"NOMBRE DEL GRUPO"</span>
              <div class="hidden-md-and-down">
                <v-icon size="24" right>mdi-check-all</v-icon>
              </div>
              <!-- AQUI VA UN V-IF DE SI YA ESTA REVISADA LA ACTIVIDAD -->
            </v-card-title>

            <v-card-subtitle class="texto-tarjeta-settings">
              <span class="texto-de-tarjeta">ACTIVIDAD: </span> <br />
              <span class="texto-de-tarjeta2">
                "NOMBRE DE LA ACTIVIDAD VA A ESTAR AQUI" <!-- AGREGAR AQUI EL {{NombreActividad}}  -->
              </span>
              <br />
              <br />
              <span class="texto-de-tarjeta"> FECHA PUBLICACION:</span>
              <span class="texto-de-tarjeta2">"01/01/2021"</span> <br />  <!-- AGREGAR AQUI EL {{FechaPublicacion}}  -->
              <span class="texto-de-tarjeta"> FECHA VENCIMIENTO:</span>
              <span class="texto-de-tarjeta2">"01/01/2021"</span>  <!-- AGREGAR AQUI EL {{FechaVencimiento}}  -->
            </v-card-subtitle>

            <v-card-actions class="hidden-md-and-down">
              <v-col cols="12" md="4">
                <v-dialog
                  v-model="eliminarDialog"
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#FF4365"  text v-bind="attrs" v-on="on"> Eliminar </v-btn>
                  </template>
                  <eliminarActividad @estado="eliminarDialog=$event" :idActividad="2" /> <!-- AGREGAR AQUI EL {{idActividad}}  -->
                </v-dialog>
              </v-col>

              <v-col cols="12" md="4">
                <v-dialog
                  v-model="editarDialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#FFD166" text v-bind="attrs" v-on="on"> Editar </v-btn>
                  </template>
                  <editar-actividad @estado="editarDialog=$event" :idActividad="2" />
                </v-dialog>
              </v-col>

              <v-col cols="12" md="4">
                <v-dialog
                  v-model="revisarDialog"
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#30DBA0" text v-bind="attrs" v-on="on"> Revisar </v-btn>
                  </template>
                  <eliminarActividad :idActividad="2" /> <!-- AGREGAR AQUI EL {{idActividad}}  -->
                </v-dialog>
              </v-col>      
            </v-card-actions>

            <!--                                VIZUALIZACION DE LOS BOTONES EN DISPITIVO MOVILES                     -->
            <v-row class="hidden-md-and-up mx-n4">
              <v-col cols="3" md="4">
                <v-dialog
                  v-model="eliminarDialog"
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#FF4365"  text  plain v-bind="attrs" v-on="on"> <v-icon size="20">mdi-delete</v-icon> </v-btn>
                  </template>
                  <eliminarActividad @estado="eliminarDialog=$event" :idActividad="2" /> <!-- AGREGAR AQUI EL {{idActividad}}  -->
                </v-dialog>
              </v-col>
              <v-col cols="3" md="4">
                <v-btn color="#FFD166" text plain>
                  <v-icon size="20">mdi-file-edit-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3" md="4">
                <v-btn color="#30DBA0" text plain>
                  <v-icon size="20">mdi-check-all</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EditarActividad from '../dialogs/editarActividad.vue';
import eliminarActividad from '../dialogs/eliminarActividad.vue';
export default {
  components: { 
    eliminarActividad,
    EditarActividad 
    },

  name: "actividades",

  data() {
    return {
      select: [],
      items: ["Ardillas", "Patos", "1ro B", "2do A"],
      eliminarDialog: false,
      editarDialog: false,
      revisarDialog: false,
    };
  },
  methods: {
    test() {
      console.log(this.select);
    },
  },
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

.texto-de-tarjeta {
  color: #adb9e3;
  font-weight: 800;
  font-size: 6px;
}
.texto-de-tarjeta2 {
  color: white !important;
  font-weight: 600 !important;
  font-size: 6px !important;
}
.titulo-de-tarjeta {
  color: #adb9e3;
  font-weight: 800;
  font-size: 6px;
}
.titulo-de-tarjeta2 {
  color: white;
  font-weight: 800;
  font-size: 6px;
}

@media screen and (min-width: 800px) {
  .texto-de-tarjeta {
    color: #adb9e3;
    font-weight: 800;
    font-size: 14px;
  }
  .texto-de-tarjeta2 {
    color: white !important;
    font-weight: 600 !important;
    font-size: 14px !important;
  }
  .titulo-de-tarjeta {
    color: #adb9e3;
    font-weight: 800;
    font-size: 20px;
  }
  .titulo-de-tarjeta2 {
    color: white;
    font-weight: 800;
    font-size: 20px;
  }
  .texto-tarjeta-settings {
    margin-top: 8px !important;
  }
}

.card-settings {
  height: auto;
}

@media screen and (min-width: 800px) {
  .card-settings {
    height: 260px;
  }
}

.title-nueva-activity {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  font-size: 11px;
}
@media screen and (min-width: 800px) {
  .texto-nueva-activity {
    text-align: center;
    width: 100%;
  }
  .title-nueva-activity {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    font-size: 22px;
  }
}
.card-title-text {
  font-family: "Montserrat";
  font-size: 20px;
  font-weight: 800;
}

.container {
  width: 100%;
  height: auto;
  font-family: "Montserrat";

  border-radius: 20px;
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
