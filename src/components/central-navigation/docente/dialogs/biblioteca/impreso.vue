<template>
  <div class="impreso">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="titulo-seccion">SUBIR DOCUMENTO</h1>
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
                      v-model="nombreDocumento"
                      label="NOMBRE DEL DOCUMENTO"
                      placeholder=""
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row class="mx-8">
                  <!--
                                <v-col cols="12" md="8" class="py-0">
                                    <v-text-field v-model="documentoSubido" label="DOCUMENTO A SUBIR" outlined disabled>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" class="py-0">
                                    <v-btn class="btnBuscar" rounded>BUSCAR</v-btn>
                                </v-col>
                                -->

                  <input
                    id="files"
                    type="file"
                    ref="ArchivoImpreso"
                    label="Agregar archivos"
                  />
                </v-row>

                <v-row class="mx-5">
                  <v-col>
                    <v-select
                      v-model="tipoDocumento"
                      :items="type"
                      label="Tipo de Documento"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="mx-5">
                  <v-col>
                    <!--
                                    <v-list-group cols="12" md="4">
                                    <template v-slot:activator>
                                        <v-list-item-title>Tipo de Documento</v-list-item-title>
                                    </template>
                                    <div v-for="n in type" :key="n">
                                        <v-list-item class="menu-text">
                                        {{ n }}
                                        </v-list-item>
                                    </div>
                                    </v-list-group>
                                    -->
                    <v-select
                      v-model="periodoAsociado"
                      :items="typePeriodo"
                      label="Periodo"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-card-actions class="px-10">
              <v-btn text color="#ff3d00" @click="limpiar()"> LIMPIAR </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="#1EFC1E" @click="guardar = true">
                GUARDAR
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h1 class="titulo-seccion">TODOS LOS DOCUMENTOS</h1>
          <v-col class="diver-red" cols="12" lg="12"> </v-col>
        </v-col>

        <v-col cols="12">
          <template>
            <div class="tabla-documentos">
              <v-data-table
                :headers="encabezadosTabla"
                :items="datos"
                :items-per-page="5"
                class="tabla-impreso elevation-12 mx-5"
              >
                <template v-slot:[`item.actions`]="{ item }"
                  ><!--HELP MINERO-->
                  <v-icon
                    @click="eliminarVisualMethod(item.id_impreso)"
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
    </v-container>
    <eliminarImpreso :idImpreso="idImpresoAEliminar" />
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import eliminarImpreso from "@/components/central-navigation/docente/dialogs/biblioteca/eliminarImpreso.vue";

export default {
  components: {
    eliminarImpreso,
  },
  name: "impreso",
  data() {
    return {
      nombreDocumento: "",
      tipoDocumento: "",
      periodoAsociado: "",
      type: [
        "1.- Cuento",
        "2.- Recortable",
        "3.- Mi álbum",
        "4.- Valores",
        "5.- Otro",
      ],
      typePeriodo: ["1er grado", "2do grado", "3er grado"],
      datos: [],
      encabezadosTabla: [
        {
          text: "Titulo",
          align: "start",
          value: "titulo",
        },
        //{ text: 'Ruta', value: 'ruta', sortable: false },
        { text: "Grado", value: "periodoAsociado" },
        { text: "Tipo", value: "tipo" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      guardar: false,
      Archivos: [],
      urlFile: "",
      idImpresoAEliminar: 0,
    };
  },
  methods: {
    limpiar() {
      this.nombreDocumento = "";
      this.tipoDocumento = "";
      this.periodoAsociado = "";
      this.Archivos = null;
      this.urlFile = [];
      this.files = "";
    },
    eliminarVisualMethod(id) {
      this.idImpresoAEliminar = id;
      this.$store.state.eliminarImpresoDialog = true;
      console.log(this.idImpresoAEliminar.id);
    },
    obtenerImpreso() {
      axios
        .get("https://xicoclass.online/Impreso.php")
        .then((r) => {
          this.datos = r.data;
          console.log(this.datos);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    executeSave() {
      this.subirArchivo();
    },
    async subirArchivo() {
      try {
        const { files } = this.$refs.ArchivoImpreso;
        const file = files[0];
        this.Archivos[0] = files[0];
        if (file) {
          const response = await firebase
            .storage()
            .ref(`/Impreso/1/${file.name}`)
            .put(file);
          const url = await response.ref.getDownloadURL();
          this.urlFile = url;
          console.log("archivo disponible en ", this.urlFile);
        } else {
          console.log("falta el archivo");
        }
      } catch (error) {
        console.error(error);
      }
      this.Actividad();
    },
    Actividad() {
      var encodedData = btoa("" + this.urlFile);
      let config1 = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      console.log(this.urlFile);
      const parametros1 =
        "titulo=" +
        this.nombreDocumento +
        "&ruta=" +
        encodedData +
        "&tipo=" +
        this.tipoDocumento[0] +
        "&periodoAsociado=" +
        this.periodoAsociado[0];

      axios
        .post("https://xicoclass.online/Impreso.php", parametros1, config1)
        .then((r) => {
          console.log(r);
        })
        .catch((error) => {
          console.log(error);
        });
      this.limpiar();
    },
  },
  watch: {
    guardar(val) {
      if (!val) return;
      this.executeSave();
    },
  },
  mounted() {
    this.obtenerImpreso();
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
.btnBuscar {
  font-family: "Monserrat";
  width: 80%;
  height: 100%;
  margin-bottom: auto;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 18px;
}
/*.tabla-impreso {
  width: 100% !important;
}*/
</style>
