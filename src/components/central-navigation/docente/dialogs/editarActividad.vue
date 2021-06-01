<template>
    <v-card>
        <v-toolbar
          dark
          color="#5d4f63"
        >
          <v-btn
            icon
            dark
            @click="closeDialog()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Editar Actividad</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="executeSave()"
            >
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text class="container"> 
          <v-container>
            <v-row class="texto-form">
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  filled
                  label="Nombre de la actividad"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  filled
                  label="Grupo al que se le sera asignada"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  filled
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  filled
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  filled
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        
      </v-card>
</template>

<script>
export default {
    data(){
        return{
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
        }
    },
    methods:{
        closeDialog(){
            this.$emit("estado",false);
        },

        executeSave(){
            //AQUI VA EL POST PARA GUARDAR TODOS LOS DATOS 


            //EN EL .THEN DE POST AL COMPLETAR EXITOSAMENTE AGREGAR EL:
            this.closeDialog()
        }

    }
    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;0,800;0,900;1,700&display=swap');

.texto-form{
    margin-top: auto;
    margin-bottom: auto;
    height: auto;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
}


</style>