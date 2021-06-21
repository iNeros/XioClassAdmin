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
           {{ ActityName }}
            <!-- {{NombreActivdad}} -->
            .</span
          >
          <br />
          <b>Para el Grupo:</b>
          <span style="color: #30dba0">
           {{ ActivityGrupo }} .
            <!--{{NombreActivdad}}-->
            </span
          >
          <br />

          <br />Esto hara que los archivos que usted y los alumnos hayan subido
          tambien se eliminen, ¿desea continuar?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="#2403fc" text @click="closeDialog()"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="#FF4365"
            text
            @click="executeEliminar(idActividad)"
          >
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
      ActEliminar: [],

      ActityName: "",
      ActivityGrupo: "",

    };
  },
  props: ["idActividad"],

  methods: {

    InitialTest(){
      this.ActEliminar[0]={
        nombre: "",
        idGrupo: "",
      }
    },

    //Aqui Se Optiene La Info Basica De La Actividad Apartir Del: idActividad
    obtenerInfo() {
      axios
        .get(
          "https://xicoclass.online/Actividades.php?id_actividad=" +
            this.idActividad
        )
        .then((r) => {
          this.ActEliminar  = r.data;
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
      this.ActEliminar = "";
      this.$store.state.eliminarActividadDialog = false;
    },
    
  },

  mounted() {
    this.InitialTest();
  },


  watch: {
    idActividad(val){
      if(val > 0){
        return this.obtenerInfo();
      }
    }

  }

};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;600;800&display=swap");

.text-center {
  font-family: "Montserrat";
  font-weight: 600;
}
</style>
