<template>
  <v-dialog
    v-model="$store.state.editarGrupoDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="#5d4f63">
        <v-btn icon dark @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title
          >Actual: {{ periodoGrupo[0] }}° "{{ identificadorGrupo }}" -
          {{ nombreGrupo }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            :disabled="dialog"
            :loading="dialog"
            dark
            text
            @click="dialog = true"
          >
            Guardar
          </v-btn>
          <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card color="#30dba0" class="pa-2">
              <v-card-text>
                GUARDANDO LOS CAMBIOS
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text class="container">
        <v-container>
          <v-row class="texto-form">
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="data in DatosGrupo"
              :key="data.id_grupo"
            >
              <v-text-field
                v-model="nombreGrupo"
                filled
                label="Nombre del grupo*"
                :value="nombreGrupo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="identificadorGrupo"
                :items="typeGrupo"
                label="Grupo"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="periodoGrupo"
                :items="typePeriodo"
                label="Grado"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-card-title class="text-h5">ALUMNOS</v-card-title>

          <!---->
          <v-row
            class="py-0 mx-5"
            v-for="alum in DatosAlumnos"
            :key="alum.id_alumno"
          >
            <v-col cols="12" md="2" class="py-0">
              <v-text-field
                v-model="alum.nombre"
                label="Nombre"
                outlined
                readonly
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="2" class="py-0">
              <v-text-field
                v-model="alum.appPat"
                label="Apellido paterno"
                outlined
                readonly
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="2" class="py-0">
              <v-text-field
                v-model="alum.appMat"
                label="Apellido materno"
                outlined
                readonly
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="2" class="py-0">
              <v-text-field
                v-model="alum.fechaNac"
                label="Fecha de nacimiento"
                outlined
                readonly
                type="date"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="2" class="py-0">
              <v-text-field
                v-model="alum.usuario"
                label="Usuario"
                outlined
                readonly
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="1" class="py-0">
              <v-text-field
                v-model="alum.contraseña"
                label="Contraseña"
                outlined
                readonly
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="1" class="py-0">
              <!--Meterle un @click="Eliminar alumno()"-->
              <v-btn
                color="#ff0000"
                height="60"
                class="mx-3"
                @click="Borrar(alum.id_alumno, alum.nombre)"
              >
                <v-icon> mdi-close-circle-outline </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" class="dividerAlumnos mt-n5 mb-2"> </v-col>
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
                color="#28262C"
                elevation="12"
                height="56"
                class="mx-4"
                @click="AddRow()"
              >
                <v-icon> mdi-plus </v-icon>
              </v-btn>
              <v-btn
                color="#28262C"
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
      </v-card-text>
    </v-card>
    <!-- Dialog para validar datos requeridos-->
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog1" width="500">
          <v-card>
            <v-card-title class="text-center grey lighten-2">
              ¿Seguro que desea eliminar el alumno?
            </v-card-title>

            <v-card-text>
              <br />
              <b>Usted eliminará el alumno: </b>
              <span style="color: #30dba0">
                {{ nombreAlumnoEliminar }}
                <!-- {{NombreActivdad}} -->
                .</span
              >
              <br />

              <br />Esto no solo hara que el alumno se elimine, sino también
              todo el contenido relacionado al alumno.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="#2403fc" text @click="dialog1 = false">
                Cancelar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="#FF4365" text @click="BorrarD(idAlumnoEliminar)">
                Si, Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- aqui acaba -->
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      guardar: false,
      dialog: false,
      dialog1: false,
      idAlumnoEliminar: 0,
      nombreAlumnoEliminar: "",

      nombreGrupo: "",
      identificadorGrupo: "",
      periodoGrupo: "",
      typePeriodo: ["1er grado", "2do grado", "3er grado"],
      typeGrupo: [
        "Grupo 'A'",
        "Grupo 'B'",
        "Grupo 'C'",
        "Grupo 'D'",
        "Grupo 'E'",
        "Grupo 'F'",
      ],
      DatosGrupo: [],
      DatosAlumnos: [],

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
    };
  },
  props: ["idGrupoDialog"],

  mounted() {
    //ObtenerDatos();
  },

  methods: {
    Borrar(id, nombre) {
      this.nombreAlumnoEliminar = nombre;
      this.idAlumnoEliminar = id;
      this.dialog1 = true;
    },
    BorrarD(id) {
      axios
        .delete("https://xicoclass.online/Alumno.php?id_alumno=" + id)
        .then((r) => {
          //DENTRO DEL .THEN() DE EXTIO VA ESTO:
          console.log(r);
          this.dialog1 = false;
          this.closeDialog();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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
    closeDialog() {
      this.$store.state.editarGrupoDialog = false;
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
    // AQUI VA EL GET PARA OBTENER LOS DEL Grupo WHERE idGrupo = idGrupoDialog , y Guardarlos En : nombreGrupo , identificadorGrupo periodoGrupo
    GrupoDatos() {
      axios
        .get(
          "https://xicoclass.online/Grupo.php?id_grupo=" + this.idGrupoDialog
        )
        .then((r) => {
          this.DatosGrupo = r.data;
          console.log(this.DatosGrupo);
          this.nombreGrupo = this.DatosGrupo[0].nombre;
          this.identificadorGrupo = this.DatosGrupo[0].grupo;
          this.periodoGrupo = this.DatosGrupo[0].periodo;
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get(
          "https://xicoclass.online/Grupo.php?id_grupos=" +
            this.idGrupoDialog +
            "&id_docentes=" +
            window.sessionStorage.getItem("id_docente")
        )
        .then((r) => {
          this.DatosAlumnos = r.data;
          console.log(this.DatosAlumnos);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    ObtenerDatos() {
      //LUEGO DE ESTO OBTENDRAS EL TOTAL DE ALUMNOS QUE TIENE EL GRUPO CON un COUNT() WHERE idGrupo = idGrupoDialog Y GUARDAS EL COUNT EN: contadorAlumnos
      //LUEGO DE ESTO GUARDAS A TODOS LOS ALUMNOS WHERE idGrupo = idGrupoDialog en inputs[] (Guardas El Id Del Alumno Que Traes En: this.idAlumnos.)
      for (var i = 0; i < this.contadorAlumnos; i++) {
        this.inputs[i].index = i;
      } //ESTO DEJALO POR Ahi.. :v
    },

    executeSave() {
      //AQUI VA EL POST PARA MODIFICAR LA EL CONTENIDO DE GRUPOS WHERE idGrupo SEA = idGrupoDialog
      axios
        .put(
          "https://xicoclass.online/Grupo.php?nombre=" +
            this.nombreGrupo +
            "&grupo=" +
            this.identificadorGrupo[7] +
            "&periodo=" +
            this.periodoGrupo[0] +
            "&id_grupo=" +
            this.idGrupoDialog
        )
        .then((r) => {
          //EN EL .THEN DE POST AL COMPLETAR EXITOSAMENTE AGREGAR EL:
          console.log(r.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      //------------------------------------------------------------------------------------------------------
      //AQUI VA EL POST PARA MODIFICAR EL CONTENIDO DE LOS ALUMNOS WHERE idAlumnos = this.inputs[n].idAlumno

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
          this.idGrupoDialog;
        axios
          .post("https://xicoclass.online/Alumno.php", parametros, config)
          .then((r) => {
            console.log(r);
            //EN EL .THEN DE POST AL COMPLETAR EXITOSAMENTE AGREGAR EL:
            this.Limpiar();
            this.closeDialog();
          })
          .catch((error) => {
            console.log(error);
          });
      } //cierra el for
      //cierra el if contalumnos = 0
    },
  },
  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => ((this.dialog = false), (this.guardar = true)), 4000);
    },
    guardar(val) {
      if (!val) return;
      this.executeSave();
    },
    idGrupoDialog(val) {
      if (val > 0) {
        return this.GrupoDatos();
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;0,800;0,900;1,700&display=swap");

.texto-form {
  margin-top: auto;
  margin-bottom: auto;
  height: auto;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}
.dividerAlumnos {
  background-color: #616161;
  height: 5px;
  border-radius: 5px;
}
</style>
