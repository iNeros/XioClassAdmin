<template>
  <div class="text-center">
    <v-dialog v-model="$store.state.eliminarAvisoDialog" width="500">
      <v-card v-for="item in AvisoEliminar" :key="item.id_avisos">
        <v-card-title class="text-center grey lighten-2">
          ¿Seguro que desea eliminar la Actividad?
        </v-card-title>

        <v-card-text>
          <br />
          <b>Usted borrará el aviso: </b>
          <span style="color: #30dba0">
            {{ item.nombre }}
            <!-- {{NombreActivdad}} -->
            .</span
          >
          <br />

          <br />Esto no solo hara que el aviso ya no sea visible si no que
          eliminará por completo los archivos cargados y datos del mismo.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="#2403fc" text @click="closeDialog()"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#FF4365" text @click="executeEliminar(idAviso)">
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
      AvisoEliminar: [],
    };
  },
  props: ["idAviso"],

  methods: {
    InitialTest() {
      return 0;
    },

    //Aqui Se Optiene La Info Basica De La Actividad Apartir Del: idAviso
    obtenerInfo() {
      axios
        .get("https://xicoclass.online/Avisos.php?id_avisos=" + this.idAviso)
        .then((r) => {
          this.AvisoEliminar = r.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    executeEliminar(id) {
      axios
        .delete("https://xicoclass.online/Avisos.php?id_avisos=" + id)
        .then((r) => {
          //DENTRO DEL .THEN() DE EXTIO VA ESTO:
          console.log(r);
          console.log(id);
          this.closeDialog();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    closeDialog() {
      this.AvisoEliminar = "";
      this.$store.state.eliminarAvisoDialog = false;
    },
  },

  mounted() {
    this.InitialTest();
  },

  watch: {
    idAviso(val) {
      if (val > 0) {
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
