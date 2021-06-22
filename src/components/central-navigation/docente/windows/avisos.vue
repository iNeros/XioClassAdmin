<template>
  <div class="avisos">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="titulo-seccion">CREAR UN NUEVO AVISO</h1>
        </v-col>
        <v-col class="diver" cols="12"></v-col>
        <v-col>
          <v-card
            color="#EDF2EF"
          >
            <v-card-title></v-card-title>
            <v-form>
              <v-container>
                <v-row class="mx-5">
                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="nombreAviso"
                        label="NOMBRE DEL AVISO*"
                        placeholder=""
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="2" class="py-0">
                      <v-text-field
                        v-model="fechaPublicacion"
                        label="FECHA DE PUBLICACION*"
                        outlined
                        type="date"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="py-0">
                      <v-file-input
                        id="archivoAvisos"
                        chips
                        type="file"
                        label="ARCHIVOS ADJUNTOS"
                        truncate-length="15"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                  <v-row class="mx-5">
                    <v-col cols="12" md="8">
                      <v-textarea
                        v-model="descripcionAviso"
                        name="AvisoDescripcion"
                        label="DESCRIPCION DEL AVISO*"
                        hint="Breves descripciones son más atractivas de leer"
                      ></v-textarea>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="enlace1"
                        label="Enlaces"
                        outlined
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="enlace2"
                        label="Enlaces"
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
              </v-container>
            </v-form>

            <v-card-actions class="px-10">
              <v-btn
                text
                color="#F97068"
              >
                LIMPIAR
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="#8AEA92"
              >
                GUARDAR
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h1 class="titulo-seccion">TODOS LOS AVISOS</h1>
          <v-col class="diver-red" cols="12" lg="12"> </v-col>
        </v-col>
        <template>
          <div class="tabla-avisos">
            <v-data-table
              :headers="encabezadosTabla"
              :items="contenidoTabla"
              :items-per-page="5"
              class="tabla-avisos elevation-12 mx-5"
            >
              <template v-slot:[`item.estado`]="{ item }">
                <v-switch
                  color="#8AEA92"
                  v-model="item.estado"
                  @click="CambiarEstado(item)"  
                ></v-switch> <!--Agregar AQUI el POST para Cambiar Estado: !item.estado  -->
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  @click="ElminarAviso(item)"
                  color="#F97068"
                >
                  mdi-delete-forever
                </v-icon>
              </template>
            </v-data-table>
          </div>
        </template>
      </v-row>
    </v-container>
    <EliminarAviso :idAviso="idAvisoAEliminar"/>
  </div>
</template>

<script>
import EliminarAviso from '../dialogs/avisos/EliminarAviso.vue';
export default {
  components: { 
    EliminarAviso
  },
  name: "avisos",
  data(){
    return{
      nombreAviso: "",
      fechaPublicacion: "",
      descripcionAviso: "",
      enlace1: "",
      enlace2: "",
      enlaces: "",



      idAvisoAEliminar: 0,
      encabezadosTabla: [
          {
            text: 'Fecha Publicacion',
            align: 'start',
            value: 'fechaPublica',
          },
          { text: 'Titulo Aviso', value: 'titulo', sortable: false },
          { text: 'Mostrandose', value: 'estado', sortable: false, },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],
      contenidoTabla: [
        {
          id: 8,
          titulo: 'Aviso De Prueba Aqui',
          fechaPublica: '10/07/2021',
          estado: true,
        },
        {
          id: 23,
          titulo: 'Aviso De Prueba 2 Aqui',
          fechaPublica: '10/08/2021',
          estado: false,
        }
      ],
    }
  },

  methods: {
    ElminarAviso(id){
      this.idAvisoAEliminar = id;
      this.$store.state.eliminarAvisoDialog = true;
      console.log(this.idAvisoAEliminar.id);
    }
  }





};
</script>

<style scoped>
.tabla-avisos{
  width: 100%!important;
}

.titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  color: #23395b;
  font-size: 26px;
  margin-bottom: 5px;
  width: 100%;
}
@media screen and (min-width: 800px) {
  .titulo-seccion {
    font-family: "Montserrat";
    font-weight: 800;
    font-size: 40px;
    margin-bottom: 5px;
    width: 100%;
    color: #23395b;
  }
}
.full-width{
  width: 100vw;
}
.diver {
  width: 100%;
  height: 5px;
  background-color: #64dd17 !important;
  border-radius: 20px;
}

.diver-red {
  width: 100%;
  height: 5px;
  background-color: #f44336 !important;
  border-radius: 20px;
}
</style>
