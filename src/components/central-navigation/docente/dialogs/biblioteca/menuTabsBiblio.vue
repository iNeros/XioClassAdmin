<template>
  <div class="menuTabs">
      <v-tabs grow class="menu-tabs" color="#23395b">
        <v-tab @click="setImpreso()">
          Impresos
        </v-tab>
        <v-tab @click="setVisual()">
          Visuales
        </v-tab>
      </v-tabs>
  </div>
</template>

<script>
export default {
  name: "menuTabsBiblio",
  data() {
    return {};
  },
  methods: {
    setImpreso() {
      this.$store.commit("setImpresoTab");
    },
    setVisual() {
      this.$store.commit("setVisualTab");
    },    
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
.menu-tabs {
  max-width: 100% !important;
  min-width: 800px !important;
  margin-left: auto;
  margin-right: auto;
  font-weight: 900;
}
</style>
