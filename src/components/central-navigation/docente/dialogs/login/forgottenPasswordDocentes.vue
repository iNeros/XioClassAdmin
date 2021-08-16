<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.forgottenPasswordDialog" max-width="450">
      <template v-slot:activator="{ on, attrs }">
        <p>
          ¿Olvidaste Tu Contraseña? <br />
          Haz Click
          <a
            v-bind="attrs"
            v-on="on"
            style="color: yellow; text-decoration: underline"
            >Aqui</a
          >
        </p>
      </template>
      <v-card>
        <v-card-title style="font-size: 18px">
          ¿Olvidaste Tu Contraseña?
        </v-card-title>
        <v-card-text style="font-size: 20px"
          >Si olvidaste tu contraseña puedes restablecerla desde tu correo
          electronico.
        </v-card-text>

        <div class="input-correo">
          <v-text-field prepend-icon="mdi-email" label="Correo" v-model="mail">
          </v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="btn-enviar green darken-1" dark @click="recPassword()">
            Enviar contraseña
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "forgottenPassword",
  data() {
    return {
      mail: "",
      dialog: false,
    };
  },
  methods: {
    recPassword() {
      axios
        .get("https://xicoclass.online/Mail.php?mail=" + this.mail)
        .then((r) => {
          console.log(r);
          this.$store.state.forgottenPasswordDialog = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.input-correo {
  margin-left: 20px !important;
  margin-right: 40px !important;
}
.btn-enviar {
  margin-right: 20px !important;
  margin-bottom: 10px !important;
}
</style>
