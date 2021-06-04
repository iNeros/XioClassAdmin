import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminWindowsSelected: 1,

    crearActividadDialog: false,
    editarActividadDialog: false,
    eliminarActividadDialog: false,
    revisarActividadDialog: false,
  },
  mutations: {
    setWindowsOfUserAdmin(state) {
      state.adminWindowsSelected = 0;
    },
    setWindowsOfUserDocente(state) {
      state.adminWindowsSelected = 10;
    },
    //#region MUTATIONS FOR ADMIN
    // 1= Overview , 2=Docentes , 3=AvisosGenerales , 4=ContenidoGeneral , 5=Inscripciones
    setOverview(state) {
      state.adminWindowsSelected = 1;
    },
    setDocentes(state) {
      state.adminWindowsSelected = 2;
    },
    setAvisosGene(state) {
      state.adminWindowsSelected = 3;
    },
    setContenidoGene(state) {
      state.adminWindowsSelected = 4;
    },
    setInscripcion(state) {
      state.adminWindowsSelected = 5;
    },
    //#endregion MUTATIONS FOR DOCENTES

    //#region
    dsetOverview(state) {
      state.adminWindowsSelected = 10;
    },
    dsetAlumnos(state) {
      state.adminWindowsSelected = 11;
    },
    dsetAvisos(state) {
      state.adminWindowsSelected = 12;
    },
    dsetActividades(state) {
      state.adminWindowsSelected = 13;
    },
    dsetGrupos(state) {
      state.adminWindowsSelected = 14;
    },
    //#endregion
  },
  actions: {},
  modules: {},
});
