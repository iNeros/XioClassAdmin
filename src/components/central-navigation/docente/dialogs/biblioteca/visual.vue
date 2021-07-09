<template>
  <div class="visual">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="titulo-seccion">AGREGAR VIDEO</h1>
          <v-col class="diver" cols="12" lg="12"></v-col>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title></v-card-title>
            <v-form>
              <v-container>
                <v-row class="mx-5">
                  <v-col cols="12" md="12" class="py-0">
                    <v-text-field
                      v-model="nombreVideo"
                      label="NOMBRE DEL VIDEO"
                      placeholder=""
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-5">
                  <v-col>
                    <v-text-field
                      v-model="link"
                      label="ENLACE DEL VIDEO"
                      outlined
                    >
                    </v-text-field>
                    <!--
                    <v-list-group cols="12" md="4">
                      <template v-slot:activator>
                        <v-list-item-title>Tipo de Video</v-list-item-title>
                      </template>
                      <div v-for="n in type" :key="n">
                        <v-list-item
                          class="menu-text"
                          >
                          {{n}}
                        </v-list-item>
                      </div>
                    </v-list-group>
                    -->
                    <v-select
                      v-model="tipoVideo"
                      :items="type"
                      label="Tipo de Video"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>

            <v-card-actions class="px-10">
              <v-btn text color="#F97068" @click="limpiar()"> LIMPIAR </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="#8AEA92" @click="enviar()"> GUARDAR </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h1 class="titulo-seccion">TODOS LOS VIDEOS</h1>
          <v-col class="diver-red" cols="12" lg="12"> </v-col>
        </v-col>

        <v-col cols="12">
          <template>
            <div class="tabla-documentos">
              <v-data-table
                :headers="encabezadosTabla"
                :items="datos"
                :items-per-page="5"
                class="tabla-visual elevation-12 mx-5"
              >
                <template v-slot:[`item.actions`]="{ item }"
                  ><!--HELP MINERO-->
                  <v-icon @click="eliminarVisualMethod(item.id_visual)" color="#F97068">
                    mdi-delete-forever
                  </v-icon>
                </template>
              </v-data-table>
            </div>
          </template>
        </v-col>
      </v-row>
    </v-container>
    <eliminarVisual :idVisual="idVisualAEliminar" />
  </div>
</template>

<script>
import axios from "axios";

import eliminarVisual from "@/components/central-navigation/docente/dialogs/biblioteca/eliminarVisual.vue";

export default {
  components: {
    eliminarVisual,
  },
  name: "visual",
  data() {
    return {
      nombreVideo: "",
      link: "",
      tipoVideo: "",
      type: ["1.- Cuento", "2.- Clases", "3.- Reforzamiento"],
      datos: [],
      idVisualAEliminar: 0,
      encabezadosTabla: [
        {
          text: "Titulo",
          align: "start",
          value: "titulo",
        },
        { text: "Ruta", value: "url", sortable: false },
        { text: "Grado", value: "periodoAsociado" },
        { text: "Tipo", value: "tipo" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    limpiar() {
      this.nombreVideo = "";
      this.link = "";
      this.tipoVideo = "";
    },
    enviar() {
      let url = this.link;
      let bandera = 0;
      let conver = "";
      let config = "";
      let parametros = "";
      //let conver = url.replace("watch?v=", "embed/");   ESTO FUNCIONABA AQUI ANTES
      //conver = conver.split("&");                       X2
      //this.nombreVideo = conver[0];
      //this.nombreVideo = this.tipoVideo[0];
      //return conver[0];
      if (this.nombreVideo == "" || this.link == "" || this.tipoVideo == "") {
        //CAMBIAR ESTA WINDOW ALERT POR ALGO MÁS PERRON AND THATS IT..
        window.alert("Todos los campos son requeridos.");
      } else {
        if(url.indexOf('www.youtube.com') > 0){
          bandera = 1;
        }
        if(url.indexOf('youtu.be') > 0){
          bandera = 2;
        }
        switch(bandera){
          case 1:
            conver = url.replace("watch?v=", "embed/");
            conver = conver.split("&");
            config = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            };
            parametros =
              "titulo=" +
              this.nombreVideo +
              "&url=" +
              conver[0] +
              "&periodoAsociado=1" +
              "&tipo=" +
              this.tipoVideo[0];
            axios
              .post("https://xicoclass.online/Visual.php", parametros, config)
              .then((r) => {
                console.log(r);
              })
              .catch((error) => {
                console.log(error);
              });
            this.limpiar();
            window.alert("El video se subió correctamente.");
            break;
          case 2:
            conver = url.replace("youtu.be/", "www.youtube.com/embed/");
            config = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            };
            parametros =
              "titulo=" +
              this.nombreVideo +
              "&url=" +
              conver +
              "&periodoAsociado=1" +
              "&tipo=" +
              this.tipoVideo[0];
            axios
              .post("https://xicoclass.online/Visual.php", parametros, config)
              .then((r) => {
                console.log(r);
              })
              .catch((error) => {
                console.log(error);
              });
            this.limpiar();
            window.alert("El video se subió correctamente.");
            break;
          default:
            window.alert("El video es requerido de Youtube.");
            break;
        }
      }
    },
    eliminarVisualMethod(id) {
      this.idVisualAEliminar = id;
      this.$store.state.eliminarVisualDialog = true;
      console.log(this.idVisualAEliminar.id);
    },
    obtenerVisual() {
      axios
        .get("https://xicoclass.online/Visual.php")
        .then((r) => {
          this.datos = r.data;
          console.log(this.datos);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.obtenerVisual();
  },
};
</script>

<style scoped>
.titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  color: #23395b;
  font-size: 26px;
  margin-bottom: 5px;
  width: 100%;
}

.diver {
  width: 100%;
  height: 5px;
  background-color: #64dd17 !important;
  border-radius: 20px;
}

.diver-red {
  width: 100%;
  height: 5px;
  background-color: #f44336 !important;
  border-radius: 20px;
}
</style>
