<template>
  <div class="actividades">
    <v-container fluid>
      <v-row>
        <!-- AGREGAR AQUI EL {{idActividad}}  -->
        <!--#region ESTA CARD ES ESTATICA , ESTE ES EL BOTON PARA AGREGAR UNA ACTIVIDAD NUEVA --->
        <h1 class="titulo-seccion">ACTIVIDADES RECIENTES</h1>
        <v-col class="diver" cols="12" lg="12"> </v-col>
        <v-col sm="12" lg="3">
          <v-card color="#23395B" dark height="280" width="280" elevation="12" rounded="circle" class="ma-auto">
            <v-card-title class="texto-nueva-activity">
              <span
                class="title-nueva-activity"
                style="color: #adb9e3; font-weight: 800"
              >
                AGREGAR <br> NUEVA <br> ACTIVIDAD
              </span>
            </v-card-title>

            <v-card-actions>
              <v-btn
                class="mx-auto"
                height="120"
                text
                plain
                @click="ShowCrearActividadDialog()"
              >
                <v-icon size="100">mdi-sticker-plus-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <!--#endregion-->

        <!--#region AQUI VAN LAS 3 CARDS QUE SE DESPLEGARAN EN ACTIVIDADES RECIENTES -->
        <v-col class="mx-0 px-1" cols="12" sm="12" lg="3" v-for="n in preview" :key="n.id_actividad"> <!-- AQUI VA UN V-FOR PARA DESPLEGAR LOS 3 PRIMEROS RESULTADOS (MAS RECIENTES)--->
          <v-card color="#23395B" dark class="card-settings" elevation="12">
            <v-card-title class="card-title-text">
              <span class="titulo-de-tarjeta">GRUPO: </span>
              <span class="titulo-de-tarjeta2">"{{n.id_grupo}}"</span>
              <v-spacer></v-spacer>
              <div class="hidden-md-and-down">
                <v-icon size="24" right v-if="false" >mdi-check-all</v-icon> <!-- AQUI VA UN V-IF DE SI YA ESTA REVISADA LA ACTIVIDAD -->
              </div>
            </v-card-title>

            <v-card-subtitle class="texto-tarjeta-settings">
              <span class="texto-de-tarjeta">ACTIVIDAD: {{n.id_actividad}} </span> <br />
              <span class="texto-de-tarjeta2">
                "{{n.nombre}}"
                <!-- AGREGAR AQUI EL {{NombreActividad}}  -->
              </span>
              <br />
              <br />
              <span class="texto-de-tarjeta"> FECHA PUBLICACION:</span>
              <span class="texto-de-tarjeta2">"{{n.fecha_inicio}}"</span> <br />
              <!-- AGREGAR AQUI EL {{FechaPublicacion}}  -->
              <span class="texto-de-tarjeta"> FECHA VENCIMIENTO:</span>
              <span class="texto-de-tarjeta2">"{{n.fecha_fin}}"</span>
              <!-- AGREGAR AQUI EL {{FechaVencimiento}}  -->
            </v-card-subtitle>

            <v-card-actions class="hidden-sm-and-down">
                <v-btn color="#FF4365" text @click="ShowEliminarDialog(n.id_actividad)"><!-- SUSTITUIR El Numero 6 POR EL {{IdActividad}}  -->
                  Eliminar
                </v-btn>
                <v-spacer/>
                <v-btn color="#FFD166" text @click="ShowEditarDialog(n.id_actividad)">
                  Editar
                </v-btn>
                <!-- SUSTITUIR LA n POR EL {{IdActividad}}  -->
                <v-spacer/>
                <v-btn color="#30DBA0" text @click="ShowRevisarDialog(n.id_actividad)">
                  Revisar
                </v-btn>
                <!-- SUSTITUIR LA n POR EL {{IdActividad}}  -->
            </v-card-actions>

            <!--                                VIZUALIZACION DE LOS BOTONES EN DISPITIVO MOVILES                     -->
            <v-row class="hidden-md-and-up mx-n4">  
                <v-btn color="#FF4365" text plain @click="ShowEliminarDialog(n.id_actividad)">
                  <v-icon size="20">mdi-delete</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="#FFD166" text plain @click="ShowEditarDialog(n.id_actividad)">
                  <v-icon size="20">mdi-file-edit-outline</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="#30DBA0" text plain @click="ShowRevisarDialog(n.id_actividad)">
                  <v-icon size="20">mdi-check-all</v-icon>
                </v-btn>
            </v-row>
          </v-card>
        </v-col>

        <!--#endregion-->
      </v-row>
      <!--#region ACTIVIDADES POR GRUPO ******************************************************************-->
      <v-row>
        <h1 class="titulo-seccion mt-6">ACTIVIDADES POR GRUPO</h1>
        <v-col class="diver-red" cols="12" lg="12"> </v-col>
        <template>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="11">
                <v-combobox
                  v-model="Filtro"
                  :items="items"
                  label="SELECCIONA LOS GRUPOS"
                  multiple
                  outlined
                  dense
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="1">
                <v-btn
                  width="100%"
                  text
                  color="#D81E5B"
                  v-on:click="FiltrarResultados()"
                >
                  <v-icon left>mdi-magnify</v-icon> FILTRAR
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <v-col cols="12" sm="12" lg="3" v-for="Act in todos" :key="Act.id_actividad">
          <!-- AQUI VA UN V-FOR PARA DESPLEGAR TODAS LAS ACTIVIDADES  --->
          <v-card color="#23395B" dark class="card-settings" elevation="12">
            <v-card-title class="card-title-text">
              <span class="titulo-de-tarjeta">GRUPO: </span>
              <span class="titulo-de-tarjeta2"> "{{ Act.id_grupo }}"</span>
              <v-spacer></v-spacer>
              <div class="hidden-md-and-down">
                <v-icon size="24" right v-if="Act.estado=='Activo'" >mdi-check-all</v-icon>  <!-- AQUI VA UN V-IF DE SI YA ESTA REVISADA LA ACTIVIDAD -->
              </div>
            </v-card-title>

            <v-card-subtitle class="texto-tarjeta-settings">
              <span class="texto-de-tarjeta">ACTIVIDAD: {{ Act.nombre }} </span>
              <br />
              <span class="texto-de-tarjeta2">
                {{ Act.descripcion }}
                <!-- AGREGAR AQUI EL {{NombreActividad}}  -->
              </span>
              <br />
              <br />
              <span class="texto-de-tarjeta"> FECHA PUBLICACION:</span>
              <span class="texto-de-tarjeta2">"{{ Act.fecha_inicio }}"</span>
              <br />
              <!-- AGREGAR AQUI EL {{FechaPublicacion}}  -->
              <span class="texto-de-tarjeta"> FECHA VENCIMIENTO:</span>
              <span class="texto-de-tarjeta2">"{{ Act.fecha_fin }}"</span>
              <!-- AGREGAR AQUI EL {{FechaVencimiento}}  -->
            </v-card-subtitle>

            <v-card-actions class="hidden-sm-and-down">
              <v-btn color="#FF4365" text @click="ShowEliminarDialog(Act.id_actividad)"><!-- SUSTITUIR El Numero 6 POR EL {{IdActividad}}  -->
                  Eliminar
                </v-btn>
                <v-spacer/>
                <v-btn color="#FFD166" text @click="ShowEditarDialog(Act.id_actividad)">
                  Editar
                </v-btn>
                <!-- SUSTITUIR LA n POR EL {{IdActividad}}  -->
                <v-spacer/>
                <v-btn color="#30DBA0" text @click="ShowRevisarDialog(Act.id_actividad)">
                  Revisar
                </v-btn>
            </v-card-actions>

            <!--                                VIZUALIZACION DE LOS BOTONES EN DISPITIVO MOVILES                     -->
            <v-row class="hidden-md-and-up mx-n4">  
                <v-btn color="#FF4365" text plain @click="ShowEliminarDialog(Act.id_actividad)">
                  <v-icon size="20">mdi-delete</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="#FFD166" text plain @click="ShowEditarDialog(Act.id_actividad)">
                  <v-icon size="20">mdi-file-edit-outline</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="#30DBA0" text plain @click="ShowRevisarDialog(Act.id_actividad)">
                  <v-icon size="20">mdi-check-all</v-icon>
                </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <!--#endregion -->
      <agregarActividad />
      <eliminarActividad :idActividad="idActividad" />
      <editarActividad :idActividadEdit="idActividad" />
      <revisarActividad :idActividadRevisar="idActividad" />
    </v-container>
  </div>
</template>

<script>
import agregarActividad from "../dialogs/actividades/agregarActividad.vue";
import editarActividad from "../dialogs/actividades/editarActividad.vue";
import eliminarActividad from "../dialogs/actividades/eliminarActividad.vue";
import revisarActividad from "../dialogs/actividades/revisarActividad.vue";
import axios from "axios";

export default {
  components: {
    eliminarActividad,
    editarActividad,
    agregarActividad,
    revisarActividad,
  },

  name: "actividades",

  data() {
    return {
      todos: [],
      preview:[],
      Filtro:[],
      items: [],
      idActividad: 0,
      cantidadDeActividades: 3,
    };
  },

  methods: {
    CargaInicial() {
      // AQUI VAS A METER EL GET QUE TE RECUPERE TODAS LAS ACTIVIDADES INDEPENDIENTEMENTE DEL GRUPO Y LAS GUARDE EN: ITEMS
      axios
        .get(
          "https://xicoclass.online/Actividades.php?id_docente=" +
            window.sessionStorage.getItem("id_docente")
        )
        .then((r) => {
          this.todos = r.data;
          console.log(this.todos);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    CargaInicial2() {
      axios
        .get(
          "https://xicoclass.online/Actividades.php?id_docenteP="+
            window.sessionStorage.getItem("id_docente")
        )
        .then((r) => {
          this.preview = r.data;
          console.log(this.preview);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    FiltrarResultados() {
      // AQUI VAS A SOBRE ESCRIBIR EL VALOR DE ITEAMS DEPENDIENDO DE LOS GRUPOS SELECCIONADOS ( LOS CUALES ESTAN EN SELECT ) ...
      console.log(this.Filtro);
    },

    ShowEliminarDialog(id) {
      this.idActividad = id;
      this.$store.state.eliminarActividadDialog = true;
    },

    ShowEditarDialog(id) {
      this.idActividad = id;
      this.$store.state.editarActividadDialog = "true";
    },

    ShowCrearActividadDialog() {
      this.$store.state.crearActividadDialog = "true";
    },

    ShowRevisarDialog(id) {
      this.idActividad = id;
      this.$store.state.revisarActividadDialog = "true";
    },
  },

  mounted() {
    this.CargaInicial();
    this.CargaInicial2();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;600;800&display=swap");

.titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 26px;
  margin-bottom: 5px;
  width: 100%;
}
@media screen and (min-width: 800px) {
  .titulo-seccion {
    font-family: "Montserrat";
    font-weight: 800;
    font-size: 40px;
    margin-bottom: 5px;
    width: 100%;
    color: #23395b;
  }
}

.texto-de-tarjeta {
  color: #adb9e3;
  font-weight: 800;
  font-size: 10px;
}
.texto-de-tarjeta2 {
  color: white !important;
  font-weight: 600 !important;
  font-size: 10px !important;
}
.titulo-de-tarjeta {
  color: #adb9e3;
  font-weight: 800;
  font-size: 10px;
}
.titulo-de-tarjeta2 {
  color: white;
  font-weight: 800;
  font-size: 10px;
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
  width: 100vw;
  height: auto;
  font-family: "Montserrat";

  border-radius: 20px;
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
