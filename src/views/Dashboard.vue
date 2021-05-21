<template>
    <div class="Dashboard">
        <v-app>
            <navbar />
            <div class="inside-content">
                <h1>eh we</h1>
                               
                

            </div>



        </v-app>    
    </div>
</template>

<script>
import navbar from "@/components/navbar/navbar.vue"

export default {
  name: "Dashboard",

  components: {
      navbar,

  },
};
</script>

<style scoped>
.inside-content{
    margin-left: 100px;
    margin-top: 100px;
}
    
</style>
