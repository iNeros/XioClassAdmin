import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import firebase from 'firebase'

Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

firebase.initializeApp({
    apiKey: "AIzaSyBJ1T3z7etFCO38QpGl8UQvqcYCAWRPs6c",
    authDomain: "xicoclassproject-579bb.firebaseapp.com",
    projectId: "xicoclassproject-579bb",
    storageBucket: "xicoclassproject-579bb.appspot.com",
    messagingSenderId: "396970834685",
    appId: "1:396970834685:web:bd23a246b1676f014a9c94",
    measurementId: "G-925M3LDKTF"
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
