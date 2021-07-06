<template>
  <div class="alumnos">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="titulo-seccion">CREAR UN GRUPO</h1>
          <v-col class="diver" cols="12" lg="12"> </v-col>
        </v-col>
        <v-col cols="12">
          <v-card color="#9e9e9e" dark>
            <v-card-title class="text-h5"> </v-card-title>

            <v-form>
              <v-container>
                <v-row class="mx-5">
                  <v-col cols="12" md="8" class="py-0">
                    <v-text-field
                      v-model="nombreGrupo"
                      label="Nombre del grupo"
                      placeholder="Ejemplo: grupo ardillas."
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="py-0">
                    <v-text-field
                      v-model="identificadorGrupo"
                      label="Identificador del grupo"
                      placeholder="Ejemplo: A,B,C, etc."
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" class="py-0">
                    <v-text-field
                      v-model="periodoGrupo"
                      label="Periodo"
                      placeholder="1 , 2 , 3 , etc"
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-card-title class="text-h5"> AGREGAR ALUMNOS </v-card-title>
                <v-row class="py-0 mx-5" v-for="(input, k) in inputs" :key="k">
                  <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                      outlined
                      label="Nombre*"
                      v-model="inputs[k].nombre"
                      placeholder="Nombre del alumno"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                      outlined
                      label="Apellido paterno*"
                      v-model="inputs[k].appPat"
                      placeholder="Primer apellido del alumno"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                      outlined
                      label="Apellido materno"
                      v-model="inputs[k].appMat"
                      placeholder="Segundo apellido del alumno"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                      outlined
                      label="Fecha de nacimiento"
                      v-model="inputs[k].FechaNac"
                      type="date"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="dividerAlumnos mt-n5 mb-2"> </v-col>
                </v-row>

                <v-row justify="space-around">
                  <div>
                    <v-btn
                      color="#64DD17"
                      elevation="12"
                      height="56"
                      class="mx-4"
                      @click="AddRow()"
                    >
                      <v-icon> mdi-plus </v-icon>
                    </v-btn>
                    <v-btn
                      color="#D50000"
                      elevation="12"
                      height="56"
                      class="mx-4"
                      @click="RemoveRow()"
                      v-show="contadorAlumnos > 0"
                    >
                      <v-icon> mdi-minus </v-icon>
                    </v-btn>
                  </div>
                </v-row>
              </v-container>
            </v-form>

            <v-card-actions>
              <v-btn class="mx-3" text color="#ff3d00" @click="Limpiar()">
                LIMPIAR
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="mx-3" text color="#1EFC1E" @click="postGrupo()">
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
        <v-col
          cols="12"
          md="3"
          sm="6"
          v-for="Grupos in GruposDocente"
          :key="Grupos.id_grupo"
        >
          <v-card max-width="300" outlined color="#9e9e9e" dark>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Grupo: {{ Grupos.id_grupo }}
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ Grupos.periodo }}° - "{{ Grupos.grupo }}" -
                  {{ Grupos.nombre }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >Edita para visualizar los alumnos
                  inscritos</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn
                text
                color="#ff3d00"
                @click="EliminarDialog(Grupos.id_grupo)"
              >
                <!-- AQUI LE PASAMOS EL IdGrupo Como Parametro -->
                Eliminar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                right
                color="#E57C04"
                @click="EditarDialog(Grupos.id_grupo)"
              >
                Editar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <eliminarGrupo :idGrupoDialog="idGrupo" />
    <!-- AQUI SE LE PASA EL idGrupo Como PROP -->
    <editarGrupo :idGrupoDialog="idGrupo" />
  </div>
</template>

<script>
import editarGrupo from "../dialogs/alumnos/editarGrupo.vue";
import eliminarGrupo from "../dialogs/alumnos/eliminarGrupo.vue";
import axios from "axios";

export default {
  name: "alumnos",
  components: {
    editarGrupo,
    eliminarGrupo,
  },
  data() {
    return {
      nombreGrupo: "",
      identificadorGrupo: "",
      periodoGrupo: "",
      MaxG: "",
      GruposDocente: [],

      inputs: [
        {
          index: 0,
          nombre: "",
          appPat: "",
          appMat: "",
          FechaNac: "",
        },
      ],

      contadorAlumnos: 0,

      idGrupo: "",
    };
  },
  methods: {
    Limpiar() {
      this.nombreGrupo = "";
      this.identificadorGrupo = "";
      this.periodoGrupo = "";
      this.inputs = [
        {
          index: 0,
          nombre: "",
          appPat: "",
          appMat: "",
          FechaNac: "",
        },
      ];
    },

    EliminarDialog(id) {
      this.idGrupo = id;
      this.$store.state.eliminarGrupoDialog = "true";
    },

    EditarDialog(id) {
      this.idGrupo = id;
      this.$store.state.editarGrupoDialog = "true";
    },

    AddRow() {
      this.contadorAlumnos++;
      this.inputs.push({
        index: this.contadorAlumnos,
        nombre: "",
        appPat: "",
        appMat: "",
        FechaNac: "",
      });
      console.log(this.inputs[this.contadorAlumnos - 1].nombre);
    },
    RemoveRow() {
      this.inputs.splice(this.inputs.length - 1);
      this.contadorAlumnos--;
      console.log(this.inputs);
    },

    postGrupo() {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      let parametros =
        "nombre=" +
        this.nombreGrupo +
        "&grupo=" +
        this.identificadorGrupo +
        "&periodo=" +
        this.periodoGrupo +
        "&id_docente=" +
        window.sessionStorage.getItem("id_docente");
      axios
        .post("https://xicoclass.online/Grupo.php", parametros, config)
        .then((r) => {
          console.log(r);
          this.MaxGrupo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MaxGrupo() {
      axios
        .get("https://xicoclass.online/Grupo.php?MaxGrupo")
        .then((r) => {
          this.MaxG = r.data;
          this.postAlumno();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postAlumno() {
      for (var j = 0; j <= this.contadorAlumnos; j++) {
        //AQUI DENTRO IRA EL POST QUE CREARA LA N CANTIDAD DE ALUMNOS: obteniendo los datos de inputs[j].
        let config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
        let parametros =
          "nombre=" +
          this.inputs[j].nombre +
          "&appPat=" +
          this.inputs[j].appPat +
          "&appMat=" +
          this.inputs[j].appMat +
          "&fechaNac=" +
          this.inputs[j].FechaNac +
          "&id_grado=" +
          this.MaxG[0].id_grupo;
        axios
          .post("https://xicoclass.online/Alumno.php", parametros, config)
          .then((r) => {
            console.log(r);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.Limpiar();
    },
    GruposDoc() {
      axios
        .get(
          "https://xicoclass.online/Grupo.php?id_docente=" +
            window.sessionStorage.getItem("id_docente")
        )
        .then((r) => {
          this.GruposDocente = r.data;
          console.log(this.GruposDocente);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.GruposDoc();
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
  background-color: #6a1b9a !important;
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
