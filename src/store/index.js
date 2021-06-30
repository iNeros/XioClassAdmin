import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminWindowsSelected: 1,

    //#region Variables Para Grupos
    editarGrupoDialog: false,
    eliminarGrupoDialog: false,
    //#endregion

    //#region  Variables Para Actividades
    crearActividadDialog: false,
    editarActividadDialog: false,
    eliminarActividadDialog: false,
    revisarActividadDialog: false,
    //#endregion

    //#region  Variables Para Avisos
    eliminarAvisoDialog: false,
    //#endregion

    //#region  Variables Para BIBLIOTECA
    tabsBiblio: 1,
    //#endregion
    
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

    //#region Mutations FOR DOCENTE
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
    dsetBiblioteca(state) {
      state.adminWindowsSelected = 14;
    },
    //#endregion

    //#region Mutations FOR BIBLIOTECA
    setImpresoTab(state) {
      state.tabsBiblio = 1;
    },
    setVisualTab(state) {
      state.tabsBiblio = 2;
    },
    //#endregion
  },
  actions: {},
  modules: {},
});
