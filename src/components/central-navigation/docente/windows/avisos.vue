<template>
  <div class="avisos">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="titulo-seccion">CREAR UN NUEVO AVISO</h1>
        </v-col>
        <v-col class="diver" cols="12"></v-col>
        <v-col>
          <v-card elevation="18">
            <v-card-title></v-card-title>
            <v-form>
              <v-container>
                <v-row class="mx-5">
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="nombreAviso"
                      label="NOMBRE DEL AVISO*"
                      placeholder=""
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      v-model="fechaPublicacion"
                      label="FECHA DE PUBLICACION"
                      outlined
                      type="datetime-local"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mx-5">
                  <v-col cols="12" md="8">
                    <v-textarea
                      v-model="descripcionAviso"
                      name="AvisoDescripcion"
                      label="DESCRIPCION DEL AVISO*"
                      hint="Breves descripciones son más atractivas de leer"
                    ></v-textarea>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="enlace1" label="Enlace" outlined>
                    </v-text-field>
                    <v-select
                      v-model="grupoSelect"
                      :items="grupos"
                      label="Selecciona grupo"
                      item-text="nombre"
                      item-key="grupos"
                      item-value="id_grupo"
                      full-width
                      height="55"
                      solo
                      dense
                    ></v-select>
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
      </v-row>
      <v-row>
        <v-col cols="12">
          <h1 class="titulo-seccion">TODOS LOS AVISOS</h1>
          <v-col class="diver-red" cols="12" lg="12"> </v-col>
        </v-col>
        <template>
          <div class="tabla-avisos">
            <v-data-table
              :headers="encabezadosTabla"
              :items="Avisos1"
              :items-per-page="5"
              class="tabla-avisos elevation-12 mx-5"
            >
              <template v-slot:[`item.actions`]="{ item }"
                ><!--HELP MINERO-->
                <v-icon @click="EliminarAviso(item.id_avisos)" color="#F97068">
                  mdi-delete-forever
                </v-icon>
              </template>
            </v-data-table>
          </div>
        </template>
      </v-row>
    </v-container>
    <EliminarAviso :idAviso="idAvisoAEliminar" />
    <!-- Dialog para validar datos requeridos-->
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Campos requeridos </v-card-title>
            <v-card-text>
              Verifíca que hayas llenado todos los campos requeridos.<br />
              Título - Grupo - Fecha.
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
import EliminarAviso from "../dialogs/avisos/EliminarAviso.vue";
import axios from "axios";
export default {
  components: {
    EliminarAviso,
  },
  name: "avisos",
  data() {
    return {
      nombreAviso: "",
      fechaPublicacion: "",
      descripcionAviso: "",
      enlace1: "",
      enlaces: "",
      grupos: "",
      grupoSelect: "",
      dialog: false,
      nameG: "",

      idAvisoAEliminar: 0,
      encabezadosTabla: [
        {
          text: "Fecha Publicacion",
          align: "start",
          value: "fecha",
        },
        { text: "Titulo Aviso", value: "nombre", sortable: false },
        { text: "Grupo", value: "nombreG", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      Avisos1: [],
      //
    };
  },

  methods: {
    EliminarAviso(id) {
      this.idAvisoAEliminar = id;
      this.$store.state.eliminarAvisoDialog = true;
      console.log(this.idAvisoAEliminar.id);
    },
    Elimina(id) {
      window.alert(id);
      console.log(id);
    },
    AvisosGet() {
      axios
        .get(
          "https://xicoclass.online/Avisos.php?id_docente=" +
            window.sessionStorage.getItem("id_docente")
        )
        .then((r) => {
          this.Avisos1 = r.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    gruposGet() {
      axios
        .get(
          "https://xicoclass.online/Grupo.php?id_docente=" +
            window.sessionStorage.getItem("id_docente")
        )
        .then((r) => {
          this.grupos = r.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    Enviar() {
      if (
        this.grupoSelect == "" ||
        this.nombreAviso == "" ||
        this.fechaPublicacion == ""
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
          this.nombreAviso +
          "&descripcion=" +
          this.descripcionAviso +
          "&urls=" +
          this.enlace1 +
          "&fecha=" +
          this.fechaPublicacion +
          "&id_grupo=" +
          this.grupoSelect;
        axios
          .post("https://xicoclass.online/Avisos.php", parametros, config)
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
      this.nombreAviso = "";
      this.descripcionAviso = "";
      this.enlace1 = "";
      this.fechaPublicacion = "";
      this.grupoSelect = "";
    },
  },
  mounted() {
    this.AvisosGet();
    this.gruposGet();
  },
};
</script>

<style scoped>
.tabla-avisos {
  width: 100% !important;
}

.titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  color: #23395b;
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
.full-width {
  width: 100vw;
}
.diver {
  width: 100%;
  height: 5px;
  background-color: #f57c00 !important;
  border-radius: 20px;
}

.diver-red {
  width: 100%;
  height: 5px;
  background-color: #0091ea !important;
  border-radius: 20px;
}
</style>
