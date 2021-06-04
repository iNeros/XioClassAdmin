<template>
  <div class="text-center">
    <v-dialog
      v-model="$store.state.revisarActividadDialog"
      width="500"
      scrollable
    >
        <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="dialogm1"
            column
          >
            <v-radio
              label="Bahamas, The"
              value="bahamas"
            ></v-radio>
            <v-radio
              label="Bahrain"
              value="bahrain"
            ></v-radio>
            <v-radio
              label="Bangladesh"
              value="bangladesh"
            ></v-radio>
            <v-radio
              label="Barbados"
              value="barbados"
            ></v-radio>
            <v-radio
              label="Belarus"
              value="belarus"
            ></v-radio>
            <v-radio
              label="Belgium"
              value="belgium"
            ></v-radio>
            <v-radio
              label="Belize"
              value="belize"
            ></v-radio>
            <v-radio
              label="Benin"
              value="benin"
            ></v-radio>
            <v-radio
              label="Bhutan"
              value="bhutan"
            ></v-radio>
            <v-radio
              label="Bolivia"
              value="bolivia"
            ></v-radio>
            <v-radio
              label="Bosnia and Herzegovina"
              value="bosnia"
            ></v-radio>
            <v-radio
              label="Botswana"
              value="botswana"
            ></v-radio>
            <v-radio
              label="Brazil"
              value="brazil"
            ></v-radio>
            <v-radio
              label="Brunei"
              value="brunei"
            ></v-radio>
            <v-radio
              label="Bulgaria"
              value="bulgaria"
            ></v-radio>
            <v-radio
              label="Burkina Faso"
              value="burkina"
            ></v-radio>
            <v-radio
              label="Burma"
              value="burma"
            ></v-radio>
            <v-radio
              label="Burundi"
              value="burundi"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-col cols="12" md="4">
                <v-btn
                    color="#FF4365"
                    text
                    @click="closeDialog()"
                >
                    Cerrar
                </v-btn>
            </v-col>
            <v-col cols="12" md="4"></v-col>
            <v-col cols="12" md="4">
                <v-btn
                    color="#30DBA0"
                    text
                    @click="executeRevisar()"
                >
                    Guardar
                </v-btn>
            </v-col>
          
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: ['idActividadRevisar'],

    methods: {
        obtenerInfo(){
            //Aqui Se Optiene La Info Basica De La Actividad Apartir Del: idActividad
            
        },

        executeRevisar(){
          //EL POST PARA ELIMINAR LA ACTIVIDAD VA AQUI....


          //DENTRO DEL .THEN() DE EXTIO VA ESTO:
          this.closeDialog();
        },

        closeDialog(){
             this.$store.state.revisarActividadDialog = false;
        }
    },

    mounted(){
      //Mandar a llama a obtenerInfo()
      
    }

    
  }
</script>

<style scoped>

</style>