<template>
  <div class="text-center">
    <v-dialog v-model="$store.state.eliminarGrupoDialog" width="500">
      <v-card v-for="delit in GrupoDelete" :key="delit.id_grupo">
        <v-card-title class="text-center grey lighten-2">
          ¿Seguro que desea eliminar el grupo?
        </v-card-title>

        <v-card-text>
          <br />
          <b>Usted eliminará el grupo: </b>
          <span style="color: #30dba0">
            {{ delit.nombre }}
            .</span
          >

          <br />Esto hara que el grupo y todos los datos relacionados del grupo
          {{ delit.nombre }} "{{ delit.grupo }}" {{ delit.periodo }}° tambien se
          eliminen, ¿desea continuar?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="#2403fc" text @click="closeDialog()"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#FF4365" text @click="executeEliminar()">
            Si, Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      GrupoDelete: [],
    };
  },
  props: ["idGrupoDialog"],

  methods: {
    obtenerInfo() {
      //Aqui Se Optiene La Info Basica De La Actividad Apartir Del: idGrupoDialog
      axios
        .get(
          "https://xicoclass.online/Grupo.php?id_grupo=" + this.idGrupoDialog
        )
        .then((r) => {
          this.GrupoDelete = r.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    executeEliminar() {
      //EL POST PARA ELIMINAR LA ACTIVIDAD VA AQUI....
      axios
        .delete(
          "https://xicoclass.online/Grupo.php?id_grupo=" + this.idGrupoDialog
        )
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
      this.$store.state.eliminarGrupoDialog = false;
    },
  },

  mounted() {
    //Mandar a llama a obtenerInfo()
  },
  watch: {
    idGrupoDialog(val) {
      if (val > 0) {
        console.log("Entre DESDE EL WATCH")
        return this.obtenerInfo();
        
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;600;800&display=swap");

.text-center {
  font-family: "Montserrat";
  font-weight: 600;
}
</style>
