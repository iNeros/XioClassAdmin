<template>
    <div class="actividades">
        <v-container fluid>
            <v-row class="container" >
                <!--#region ESTA CARD ES ESTATICA , ESTE ES EL BOTON PARA AGREGAR UNA ACTIVIDAD NUEVA --->
                <h1 class="titulo-seccion"> ACTIVIDADES RECIENTES </h1>
                <v-col class="diver" cols="12" lg="12">
                </v-col>
                <v-col sm="12" lg="3">
                    <v-card    
                        color="#37718E"
                        dark
                        height="250"
                    >  
                        <v-card-title class="text-h5">
                        Unlimited music now
                        </v-card-title>

                        <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

                        <v-card-actions>
                        <v-btn text>
                            Listen Now
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <!--#endregion-->

                <v-col sm="12" lg="3"> <!-- AQUI VA UN V-FOR PARA DESPLEGAR LAS ULTIMAS 3 ACTIVIDADES --->
                    <v-card    
                        color="#385F73"
                        dark
                        height="250"
                    >  
                        <v-card-title class="text-h5">
                        GRUPO: "NOMBRE DEL GRUPO"
                        </v-card-title>

                        <v-card-subtitle class="mt-1">
                            <span>ACTIVIDAD: </span> <br> 
                            <span> "NOMBRE DE LA ACTIVIDAD VA A ESTAR AQUI" </span> <br> <br>
                            <span> FECHA PUBLICACION:</span> <span >"01/01/2021"</span>  <br>
                            <span> FECHA VENCIMIENTO:</span> <span >"01/01/2021"</span>  <br> 
                        </v-card-subtitle>

                        <v-card-actions>
                        <v-btn text>
                            Listen Now
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                    
            </v-row>

            <v-row>
                
            </v-row>

        </v-container>
    </div>  
</template>


<script>
export default {
    name: "actividades"
}
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");

.titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  color: white;
  font-size: 26px;
  margin-bottom: 5px;
  width: 100%;
}
@media screen and (min-width: 800px) {
  .titulo-seccion {
  font-family: "Montserrat";
  font-weight: 800;
  color: white;
  font-size: 40px;
  margin-bottom: 5px;
  width: 100%;
  margin-left: 20px;
  }
}

.container{
    width: 100%;
    height: auto;
    
    border-radius: 20px;
}

@media screen and (min-width: 800px) {
  .diver{
    width: 100%;
    height: 5px;
    background-color:#30DBA0!important;
    border-radius: 20px;
    margin-left: 20px;
}
}
.diver{
    width: 100%;
    height: 5px;
    background-color:#30DBA0!important;
    border-radius: 20px;
}




</style>