<template>
<div class="text-center">
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.registroDocenteDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.state.registroDocenteDialog= false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.state.registroDocenteDialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: [],

  methods: {
    InitialTest() {
      this.ActEliminar[0] = {
        nombre: "",
        idGrupo: "",
      };
    },

    //Aqui Se Optiene La Info Basica De La Actividad Apartir Del: idActividad
    obtenerInfo() {
      axios
        .get(
          "https://xicoclass.online/Actividades.php?id_actividad=" +
            this.idActividad
        )
        .then((r) => {
          this.ActEliminar = r.data;
          this.ActityName = this.ActEliminar[0].nombre;
          this.ActivityGrupo = this.ActEliminar[0].id_grupo;
          console.log(this.ActEliminar[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    executeEliminar(id) {
      //EL POST PARA ELIMINAR LA ACTIVIDAD VA AQUI....
      axios
        .delete("https://xicoclass.online/Actividades.php?id_actividad=" + id)
        .then((r) => {
          //DENTRO DEL .THEN() DE EXTIO VA ESTO:
          this.closeDialog();
          console.log(r.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    closeDialog() {
      this.$store.state.registroDocenteDialog = false;
    },
  },

  mounted() {
    this.InitialTest();
  },
/*
  watch: {
    idActividad(val) {
      if (val > 0) {
        return this.obtenerInfo();
      }
    },
  },*/
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;600;800&display=swap");

.text-center {
  font-family: "Montserrat";
  font-weight: 600;
}
</style>