<template>
  <div class="avisos">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="titulo-seccion">CREAR UN NUEVO AVISO</h1>
        </v-col>
        <v-col class="diver" cols="12"></v-col>
        <v-col>
          <v-card color="#9e9e9e">
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
                    <v-list-group cols="12" md="4">
                      <template v-slot:activator>
                        <v-list-item-title>Selecciona grupo</v-list-item-title>
                      </template>
                      <div v-for="n in grupos" :key="n.id_grupo">
                        <v-list-item
                          class="menu-text"
                          @click="grupo(n.id_grupo)"
                          ><!--CHECAR SI VA A QUEDAR ASÍ, EL CÓMO SE MUESTRA LA LISTA, CON LOS 3 DATOS..-->
                          Nombre:{{ n.nombre }} Grupo:{{ n.grupo }} Periodo:{{
                            n.periodo
                          }}
                        </v-list-item>
                      </div>
                    </v-list-group>
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

      idAvisoAEliminar: 0,
      encabezadosTabla: [
        {
          text: "Fecha Publicacion",
          align: "start",
          value: "fecha",
        },
        { text: "Titulo Aviso", value: "nombre", sortable: false },
        { text: "Grupo", value: "id_grupo", sortable: false },
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
    grupo(id) {
      return (this.grupoSelect = id);
    },
    Enviar() {
      if (this.grupoSelect == "") {
        //CAMBIAR ESTA WINDOW ALERT POR ALGO MÁS PERRON AND THATS IT..
        window.alert("El grupo es requerido");
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
