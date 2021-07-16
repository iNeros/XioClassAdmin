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
                      label="NOMBRE DEL AVISO*"
                      placeholder=""
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field v-model="enlace1" label="Enlace" filled outlined>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" class="py-0 pr-0" >
                    <v-text-field
                      filled
                      v-model="fechaPublicacionGlobal"
                      label="FECHA DE PUBLICACION"
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
                      label="DESCRIPCION DEL AVISO*"
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
                <v-icon @click="EliminarNoticia(item.id_noticias)" color="#F97068">
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
        <v-carousel height="auto" hide-delimiter-background show-arrows-on-hover>
          <template v-slot:prev="{ on, attrs }">
            <v-btn color="#B2FF59" v-bind="attrs" v-on="on">←</v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn color="#7E57C2" v-bind="attrs" v-on="on">→</v-btn>
          </template>
          <v-carousel-item
            eager
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
            @click="Alerta(item.src)"
          >
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="4"> 
        <template>
          <div class="tabla-avisos ">
            <v-data-table
              :headers="encabezadosTablaSliders"
              :items="Imagenes1"
              :items-per-page="5"
              class="tabla-avisos elevation-12 mx-5"
              height="250"
            >
              <template v-slot:[`item.actions`]="{ item }"
                ><!--HELP MINERO-->
                <v-icon @click="EliminarImagen(item.ide)" color="#F97068">
                  mdi-delete-forever
                </v-icon>
              </template>
            </v-data-table>
            <div class="px-5">
              <v-btn 
              class="mt-6"
              block 
              color="teal"
              dark
              @click="Alerta()"
              >
                Agregar Imagen
              </v-btn>
            </div>
            
            
          </div>
        </template>

          
        
      </v-col>
    </v-row>
    <EliminarNoticia :idNoticia="idNoticiaEliminar" />
    <EliminarImagen :idImagen="idImagenEliminar" />
  </div>
</template>

<script>
import EliminarNoticia from "../dialogs/overview/EliminarNoticia.vue";
import EliminarImagen from "../dialogs/overview/EliminarImagen.vue";
import axios from 'axios'
export default {
    components: {
    EliminarNoticia,
    EliminarImagen,
  },
  name: "docente-overview",
  data(){
    return{
      nombreAvisoGlobal: "",
      fechaPublicacionGlobal: "",
      descripcionAvisoGlobal: "",
      enlace1: "",
      idNoticiaEliminar: 0,
      idImagenEliminar:0,
      
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
      Imagenes1 : [
        {fecha: "17/07/2021" , nombre: "Ejemplo" ,ide: 1}
      ],

      items: [
        {
          src: require("@/assets/media/carusel/carusel1.png"),
        },
        {
          src: require("@/assets/media/carusel/carusel2.png"),
        },
        {
          src: require("@/assets/media/carusel/carusel3.png"),
        },
      ],
    }
  },

methods: {
    EliminarImagen(id) {
      this.idImagenEliminar = id;
      this.$store.state.eliminarImagenDialog = true;
    },
    EliminarNoticia(id) {
      this.idNoticiaEliminar = id;
      this.$store.state.eliminarNoticiaDialog = true;
    },
    Alerta(id){
window.alert(id);
    },
    AvisosGet() {
      axios
        .get(
          "https://xicoclass.online/Noticias_globales.php"
        )
        .then((r) => {
          this.Avisos1 = r.data;
          console.log(this.Avisos1);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    Enviar() {
      if (this.grupoSelect == "" || this.nombreAviso == "" || this.fechaPublicacion == "") {
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
          "&estado="+
          this.fechaPublicacionGlobal;
        axios
          .post("https://xicoclass.online/Noticias_globales.php", parametros, config)
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
  background-color: #ACDDE7 !important;
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
