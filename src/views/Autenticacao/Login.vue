<template>
  <page-base>
    <v-layout row align-start justify-start fill-height>
      <v-flex xs5 class="left" pa-3 style="height: 100%">
        <v-layout column fill-height>
          <v-flex shrink>
            <v-img contain width="110" src="logo.png"></v-img>
          </v-flex>
          <v-flex grow>
            <v-layout align-center fill-height>
              <v-layout column align-center justify-center>
                <v-flex>Ajudando você a cuidar da <br /> saúde de seus funcionários</v-flex>
                <v-flex my-5 px-5>
                  <v-img height="300" contain src="asoplus.png"></v-img>
                </v-flex>
                <v-flex>Não tem uma conta? Registre-se</v-flex>
              </v-layout>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs7 style="height: 100%">
        <login-form />
      </v-flex>
    </v-layout>
  </page-base>
</template>

<script>
import LoginForm from '@/module/Autenticacao/LoginForm'

export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="scss">
  .x {
    color: #3367d6; // primary
    color: #424242; // secondary
    color: #82B1FF; // accent
    color: #FF5252; // error
    color: #2196F3; // info
    color: #4CAF50; // success
    color: #FFC107; // warning
  }

  .link {
    text-decoration: underline;
    cursor: pointer;
  }
  .left {
    background-color: rgba(62,87,173,.93);
  }
</style>
