<template>
    <div class="evaluarNoviembre"> 
        <v-dialog v-model="$store.state.evaluarNoviembreDialog" width="500">
            <v-card>
                <v-card-title class="text-center grey lighten-2">
                Evaluar El Desempeño Del Alumno: <b></b>
                </v-card-title>

                <v-card-text class="pa-0">
                    <v-sheet
                        class="mx-auto"
                        elevation="0"
                        max-width="800"
                    >
                        <v-slide-group
                        v-model="model"
                        class="pa-4"
                        show-arrows
                        >
                        <v-slide-item
                            v-for="(index,id) in options"
                            :key="id"
                            v-slot="{ active, toggle }"
                        >
                            <v-card
                            :color="active ? 'primary' : 'grey lighten-1'"
                            class="ma-2 text-center pt-3"
                            height="100"
                            width="100"
                            @click="toggle"
                            >
                            <span class="mini-text">{{index.name}}</span>
                            <v-row
                                class="mt-1"
                                justify="center"
                            >
                                <v-scale-transition>
                                
                                </v-scale-transition>
                            </v-row>
                            </v-card>
                        </v-slide-item>
                        </v-slide-group>

                        <v-expand-transition>
                        <v-sheet
                            v-if="model != null"
                            height="200"
                            tile
                        >
                            <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                            >
                            <v-col cols="12">
                                <h3 class="text-center">
                                    Escribe La Evaluacion Del Mes
                                </h3>
                            </v-col>
                            <v-col cols="11" class="mb-2"> 
                                <v-textarea
                                v-if="model==0"
                                outlined
                                label="Evaluación: Lenguaje y Comunicacion"
                                value=""
                                v-model="dataValues[0].text"
                                ></v-textarea>

                                <v-textarea
                                v-if="model==1"
                                outlined
                                label="Evaluación: Pensamiento Matematico"
                                value=""
                                v-model="dataValues[1].text"
                                ></v-textarea>

                                <v-textarea
                                v-if="model==2"
                                outlined
                                label="Evaluación: Exploracion y Comprension Del Mundo"
                                value=""
                                v-model="dataValues[2].text"
                                ></v-textarea>

                                <v-textarea
                                v-if="model==3"
                                outlined
                                label="Evaluación: Arte"
                                value=""
                                v-model="dataValues[3].text"
                                ></v-textarea>

                                <v-textarea
                                v-if="model==4"
                                outlined
                                label="Evaluación: Educación Socioemocional"
                                value=""
                                v-model="dataValues[4].text"
                                ></v-textarea>

                                <v-textarea
                                v-if="model==5"
                                outlined
                                label="Evaluación: Educacion Fisica"
                                value=""
                                v-model="dataValues[5].text"
                                ></v-textarea>
                            </v-col>
                            </v-row>
                        </v-sheet>
                        </v-expand-transition>
                    </v-sheet>
                </v-card-text>

                <v-divider class="mt-6"></v-divider>

                <v-card-actions>
                    <v-btn color="#cf3259" text @click="closeDialog()"> Cancelar </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="#2403fc" text @click="GuardarCambios()"> Guardar Cambios </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "evaluarNoviembre",
    
    data(){
        return{
            model: null,
            options: [
                {id: 0, name: "Lenguaje y Comunicación"},
                {id: 1, name: "Pensamiento Matematico"},
                {id: 2, name: "Exploración y Comprensión Del Mundo"},
                {id: 3, name: "Arte"},
                {id: 4, name: "Educación Socioemocional"},
                {id: 5, name: "Eduación Fisica"},
            ],
            dataValues: [
                {id: 0, text: ""},
                {id: 1, text: ""},
                {id: 2, text: ""},
                {id: 3, text: ""},
                {id: 4, text: ""},
                {id: 5, text: ""},
            ],

        }
    },
    props: ["alumnoId"],

    methods: {

        closeDialog(){
            this.$store.state.evaluarNoviembreDialog = false;      
        },
        getData(){
            console.log(this.alumnoId);
            const id_docente = sessionStorage.getItem("id_docente");
            let calificaciones = [];
            firebase
            .firestore()
            .collection("evaluacionesJunio")
            .where('id_docente', '==', id_docente)
            .where('id_alumno', '==', this.alumnoId)
            .orderBy('id_local')
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((calificacion) => {
                let currentID = calificacion.id;
                let appObj = { ...calificacion.data(), ["id"]: currentID };
                calificaciones[appObj.id_local] = appObj;
                });
                console.log(calificaciones);
            }); 
            console.log("LO QUE QUIERES PROBAR:");
            console.log(calificaciones);              
        },


        async GuardarCambios(){
            //Guardar Los Cambios

        }
    },

    mounted(){
    },

    watch: {
        alumnoId(val) {
            if (val > 0) {
                return this.getData();
            }
        },

    }
    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
.mini-text{
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 700;
}

</style>