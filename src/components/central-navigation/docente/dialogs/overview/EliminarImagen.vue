<template>
  <div class="text-center">
    <v-dialog v-model="$store.state.eliminarImagenDialog" width="500">
      <v-card>
        <v-card-title class="text-center grey lighten-2">
          ¿Seguro que desea eliminar la Imagen?
        </v-card-title>

        <v-card-text>
          <br />
          <b>Usted borrará la imagen definitivamente </b>
          <span style="color: #30dba0"> .</span>
          <br />

          <br />Esto hará que se elimine por completo la imagen del sistema.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="#2403fc" text @click="closeDialog()"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#FF4365" text @click="executeEliminar(idImagen)">
            Si, Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      ImagenEliminar: [],
    };
  },
  props: ["idImagen"],

  methods: {
    InitialTest() {
      return 0;
    },

    executeEliminar(id) {
      firebase
        .firestore()
        .collection("carruselPrincipal")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.closeDialog();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    closeDialog() {
      this.ImagenEliminar = "";
      this.$store.state.eliminarImagenDialog = false;
    },
  },

  mounted() {
    this.InitialTest();
  },
  /*
  watch: {
    idImagen(val) {
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
