<template>
  <div class="text-center">
    <v-dialog v-model="$store.state.revisarCalificacionDialog" width="500">
      <v-card>
        <v-card-title class="text-center grey lighten-2">
          Desglose De Calificaciones Para El Alumno: <b style="color: #0960e3">{{alumnoName}}</b> 
        </v-card-title>

        <v-card-text class="pa-0">
            <v-data-table
            :headers="encabezadosCalificaciones"
            :items="calificacionesData"
            :items-per-page="20"
            class="tabla-avisos elevation-12 mx-0"
            height="auto"
            >
            </v-data-table>
            
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#2403fc" text @click="closeDialog()"> Listo </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
    name: "revisarCalificaciones",
    data(){
        return{
            encabezadosCalificaciones: [
                {
                    text: "Actividad",
                    align: "start",
                    value: "id_actividad", 
                    sortable: false
                },
                { text: "Titulo", value: "nombreActividad", sortable: false},
                { text: "Calificacion", value: "calificacion", sortable: false },
                { text: "Nota(Opcional)", value: "descripcion", sortable: false },
            ]

        }
    },
    props: ["alumnoId","alumnoName","calificacionesData"],

    methods: {
        closeDialog(){
            this.$store.state.revisarCalificacionDialog = false;      
        }
    },
    mounted(){

    },
    
}
</script>

<style scoped>

</style>