<template>
  <div class="text-center">
    <v-dialog v-model="$store.state.eliminarNoticiaDialog" width="35%">
      <v-card v-for="item in NoticiaEliminar" :key="item">
        <v-card-title class="text-center grey lighten-2">
          ¿Seguro que desea eliminar la Noticia Global?
        </v-card-title>

        <v-card-text>
          <br />
          <b>Usted borrará la Noticia Global: </b>
          <span style="color: #30dba0">
            <!-- {{Nombre Imagen}} -->
            {{ item.nombre }}
            .</span
          >
          <br />

          <br />Esto hará que se borre totalmente la Noticia Global.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="#2403fc" text @click="closeDialog()"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#FF4365" text @click="executeEliminar(idNoticia)">
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
      NoticiaEliminar: [],
    };
  },
  props: ["idNoticia"],

  methods: {
    InitialTest() {
      return 0;
    },

    //Aqui Se Optiene La Info Basica De La Actividad Apartir Del: idAviso
    obtenerInfo() {
      axios
        .get(
          "https://xicoclass.online/Noticias_globales.php?id_noticias=" +
            this.idNoticia
        )
        .then((r) => {
          this.NoticiaEliminar = r.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    executeEliminar(id) {
      axios
        .delete(
          "https://xicoclass.online/Noticias_globales.php?id_noticias=" + id
        )
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
      this.NoticiaEliminar = "";
      this.$store.state.eliminarNoticiaDialog = false;
    },
  },

  mounted() {
    this.InitialTest();
  },

  watch: {
    idNoticia(val) {
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
