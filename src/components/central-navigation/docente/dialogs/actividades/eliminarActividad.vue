<template>
  <div class="text-center">
    <v-dialog v-model="$store.state.eliminarActividadDialog" width="500">
      <v-card>
        <v-card-title class="text-center grey lighten-2">
          ¿Seguro Que Desea Eliminar La Actividad?
        </v-card-title>

        <v-card-text>
          <br />
          <b>Usted Borrara La Actividad:</b>
          <span style="color: #30dba0">
            {{ idActividad }}
            <!--{{NombreActivdad}}-->
            .</span
          >
          <br />
          <b>Para el Grupoo:</b>
          <span style="color: #30dba0">
            <!--{{NombreActivdad}}-->
            .</span
          >
          <br />

          <br />Esto hara que los archivos que usted y los alumnos hayan subido
          tambien se eliminen, ¿desea continuar?
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
export default {
  data() {
    return {};
  },
  props: ["idActividad"],

  methods: {
    obtenerInfo() {
      //Aqui Se Optiene La Info Basica De La Actividad Apartir Del: idActividad
    },

    executeEliminar() {
      //EL POST PARA ELIMINAR LA ACTIVIDAD VA AQUI....

      //DENTRO DEL .THEN() DE EXTIO VA ESTO:
      this.closeDialog();
    },

    closeDialog() {
      this.$store.state.eliminarActividadDialog = false;
    },
  },

  mounted() {
    //Mandar a llama a obtenerInfo()
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;600;800&display=swap");

.text-center{
  font-family: "Montserrat";
  font-weight: 600;

}

</style>
