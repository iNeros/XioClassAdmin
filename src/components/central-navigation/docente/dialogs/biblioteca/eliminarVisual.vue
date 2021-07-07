<template>
  <div class="text-center">
    <v-dialog v-model="$store.state.eliminarVisualDialog" width="500">
      <v-card v-for="item in visualEliminar" :key="item.id_visual">
        <v-card-title class="text-center grey lighten-2">
          ¿Seguro que desea eliminar este Video?
        </v-card-title>

        <v-card-text>
          <br />
          <b>Usted borrará el video: </b>
          <span style="color: #30dba0">
            {{ item.titulo }}
            <!-- {{NombreActivdad}} -->
            .</span
          >
          <br />

          <br />Esto no solo hará que el video ya no sea visible si no que
          eliminará por completo datos del mismo.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="#2403fc" text @click="closeDialog()"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#FF4365" text @click="executeEliminar(idVisual)">
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
      visualEliminar: [],
    };
  },
  props: ["idVisual"],

  methods: {
    InitialTest() {
      return 0;
    },

    //Aqui Se Optiene La Info Basica De La Actividad Apartir Del: idAviso
    obtenerInfo() {
      axios
        .get("https://xicoclass.online/Visual.php?id_visual=" + this.idVisual)
        .then((r) => {
          this.visualEliminar = r.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    executeEliminar(id) {
      axios
        .delete("https://xicoclass.online/Visual.php?id_visual=" + id)
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
      this.visualEliminar = "";
      this.$store.state.eliminarVisualDialog = false;
    },
  },

  mounted() {
    this.InitialTest();
  },

  watch: {
    idVisual(val) {
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
