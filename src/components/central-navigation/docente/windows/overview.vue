<template>
  <div class="docente-overview">
    <v-col>
      <h1 class="titulo-seccion">NOTICIAS GLOBALES</h1>
      <v-col class="diver" cols="12" lg="12"> </v-col>
    </v-col>
    <v-row justify="space-around">
      <v-col cols="12" md="5">
        <v-card elevation="18" class="my-10 ml-8">
          <v-card-title></v-card-title>
          <v-form>
            <v-container class="pa-0">
              <v-row class="mx-5">
                <v-col cols="12" md="5" class="py-0">
                  <v-text-field
                    filled
                    v-model="nombreAvisoGlobal"
                    label="TITULO AVISO GLOBAL*"
                    placeholder=""
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                  <v-text-field
                    v-model="enlace1"
                    label="Enlace"
                    filled
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3" class="py-0 pr-0">
                  <v-text-field
                    filled
                    v-model="fechaPublicacionGlobal"
                    label="FECHA DE PUBLICACION*"
                    outlined
                    type="date"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mx-5">
                <v-col cols="12" md="12">
                  <v-textarea
                    filled
                    v-model="descripcionAvisoGlobal"
                    name="AvisoDescripcion"
                    label="DESCRIPCION AVISO GLOBAL*"
                    hint="Breves descripciones son más atractivas de leer"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-card-actions class="px-10">
            <v-btn text color="#ff3d00" @click="Limpiar()"> LIMPIAR </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="#1EFC1E" @click="Enviar()"> GUARDAR </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <template>
          <div class="tabla-avisos my-10 ml-8">
            <v-data-table
              :headers="encabezadosTabla"
              :items="Avisos1"
              :items-per-page="5"
              class="tabla-avisos elevation-12 mx-5"
              height="303"
            >
              <template v-slot:[`item.actions`]="{ item }"
                ><!--HELP MINERO-->
                <v-icon
                  @click="EliminarNoticia(item.id_noticias)"
                  color="#F97068"
                >
                  mdi-delete-forever
                </v-icon>
              </template>
            </v-data-table>
          </div>
        </template>
      </v-col>
    </v-row>
    <v-col cols="12">
      <h1 class="titulo-seccion">ADMINISTRAR CONTENIDO</h1>
      <v-col class="diver-red" cols="12" lg="12"> </v-col>
    </v-col>
    <v-row class="my-4">
      <v-col cols="12" md="8">
        <v-carousel height="350" hide-delimiter-background show-arrows-on-hover>
          <template v-slot:prev="{ on, attrs }">
            <v-btn color="#B2FF59" v-bind="attrs" v-on="on">←</v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn color="#7E57C2" v-bind="attrs" v-on="on">→</v-btn>
          </template>
          <v-carousel-item
            eager
            v-for="(item, i) in Imagenes1"
            :key="i"
            :src="item.url_img"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="4">
        <template>
          <div class="tabla-avisos">
            <v-data-table
              :headers="encabezadosTablaSliders"
              :items="Imagenes1"
              :items-per-page="5"
              class="tabla-avisos elevation-12 mx-5"
              height="200"
            >
              <template v-slot:[`item.actions`]="{ item }"
                ><!--HELP MINERO-->
                <v-icon @click="EliminarImagen(item.id)" color="#F97068">
                  mdi-delete-forever
                </v-icon>
              </template>
            </v-data-table>
            <v-row class="mt-2">
              <v-col cols="10">
                <v-file-input
                  class="mt-2 mb-n4"
                  label="Subir Imagen"
                  filled
                  accept="img"
                  v-model="UploadImg"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="mt-5"
                  color="teal"
                  dark
                  @click="subirImagen()"
                  icon
                >
                  <v-icon> mdi-upload</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-col>
    </v-row>
    <EliminarNoticia :idNoticia="idNoticiaEliminar" />
    <EliminarImagen :idImagen="idImagenEliminar" />
    <!-- Dialog para validar datos requeridos-->
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Campos requeridos </v-card-title>
            <v-card-text>
              Verifíca que hayas llenado todos los campos requeridos.<br />
              Título - Descripción - Fecha.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- aqui acaba -->
  </div>
</template>

<script>
import EliminarNoticia from "../dialogs/overview/EliminarNoticia.vue";
import EliminarImagen from "../dialogs/overview/EliminarImagen.vue";
import axios from "axios";
import firebase from "firebase";

export default {
  components: {
    EliminarNoticia,
    EliminarImagen,
  },
  name: "docente-overview",
  data() {
    return {
      nombreAvisoGlobal: "",
      fechaPublicacionGlobal: "",
      descripcionAvisoGlobal: "",
      enlace1: "",
      idNoticiaEliminar: 0,
      idImagenEliminar: 0,
      dialog: false,
      UploadImg: [],

      encabezadosTabla: [
        {
          text: "Título Noticia",
          align: "start",
          value: "nombre",
        },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Enlace", value: "ruta_archivo", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],

      encabezadosTablaSliders: [
        {
          text: "Fecha De Carga",
          align: "start",
          value: "fecha",
        },
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],

      Avisos1: [],

      Imagenes1: [],
    };
  },

  methods: {
    async obtenerImagenes() {
      const imagenes = [];
      await firebase
        .firestore()
        .collection("carruselPrincipal")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((imagen) => {
            let currentID = imagen.id;
            let appObj = { ...imagen.data(), ["id"]: currentID };
            imagenes.push(appObj);
          });
          this.Imagenes1 = imagenes;
          for (var i = 0; i < this.Imagenes1.length; i++) {
            this.Imagenes1[i].fecha = this.fechaFormato(
              this.Imagenes1[i].fecha
            );
          }
          console.log(this.Imagenes1);
        });
    },

    fechaFormato(miliseconds) {
      if (miliseconds) {
        const fecha = new Date(miliseconds);
        // fecha.setMilliseconds = miliseconds * 1000;
        let mes = "";
        if (fecha.getMonth() + 1 < 10) {
          mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
        } else {
          mes = fecha.getMonth() + 1;
        }

        let dia = "";
        if (fecha.getDate() < 10) {
          dia = fecha.getDate().toString().padStart(2, "0");
        } else {
          dia = fecha.getDate();
        }
        return dia + "/" + mes + "/" + fecha.getFullYear();
      }
    },

    async subirImagen() {
      if (this.UploadImg != null) {
        const file = this.UploadImg;
        const response = await firebase
          .storage()
          .ref(`/CarouselHome/${file.name}`)
          .put(file);
        const url = await response.ref.getDownloadURL();
        console.log("archivo disponible en: ", url);
        await firebase.firestore().collection("carruselPrincipal").add({
          fecha: Date.now(),
          nombre: this.UploadImg.name,
          url_img: url,
        });
        //window.location.reload();
      }
      this.UploadImg = null;
    },

    EliminarImagen(id) {
      this.idImagenEliminar = id;
      this.$store.state.eliminarImagenDialog = true;
    },
    EliminarNoticia(id) {
      this.idNoticiaEliminar = id;
      this.$store.state.eliminarNoticiaDialog = true;
    },

    AvisosGet() {
      axios
        .get("https://xicoclass.online/Noticias_globales.php")
        .then((r) => {
          this.Avisos1 = r.data;
          console.log(this.Avisos1);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    Enviar() {
      if (
        this.nombreAvisoGlobal == "" ||
        this.descripcionAvisoGlobal == "" ||
        this.fechaPublicacionGlobal == ""
      ) {
        //CAMBIAR ESTA WINDOW ALERT POR ALGO MÁS PERRON AND THATS IT..
        this.dialog = true;
      } else {
        let config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
        let parametros =
          "nombre=" +
          this.nombreAvisoGlobal +
          "&descripcion=" +
          this.descripcionAvisoGlobal +
          "&ruta_archivo=" +
          this.enlace1 +
          "&estado=" +
          this.fechaPublicacionGlobal;
        axios
          .post(
            "https://xicoclass.online/Noticias_globales.php",
            parametros,
            config
          )
          .then((r) => {
            console.log(r);
          })
          .catch((error) => {
            console.log(error);
          });
        this.Limpiar();
      } //cierra el else
    },
    Limpiar() {
      this.descripcionAvisoGlobal = "";
      this.nombreAvisoGlobal = "";
      this.fechaPublicacionGlobal = "";
      this.enlace1 = "";
    },
  },
  mounted() {
    this.AvisosGet();
    this.obtenerImagenes();
  },
};
</script>

<style scoped>
.titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 26px;
  margin-bottom: 5px;
  width: 100%;
  color: #23395b;
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
@media screen and (min-width: 800px) {
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
}
.diver {
  width: 100%;
  height: 5px;
  background-color: #acdde7 !important;
  border-radius: 20px;
}

.diver-red {
  width: 100%;
  height: 5px;
  background-color: #c2185b !important;
  border-radius: 20px;
}

.dividerAlumnos {
  background-color: #616161;
  height: 10px;
  border-radius: 15px;
}
</style>
