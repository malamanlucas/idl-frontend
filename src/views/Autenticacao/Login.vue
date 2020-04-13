<template>
  <page-base>
    <v-row align="center" no-gutter class="height">
      <v-col fill-height>
        <div class="display-1">Toda Honra ao Senhor Jesus Cristo</div>
        <div class="display-1">Toda Honra ao Senhor Jesus Cristo testes</div>
        <div class="display-1">Toda Honra ao Senhor Jesus Cristo</div>
      </v-col>
      <v-col align="center">
        <v-btn x-large color="primary">ENTRAR</v-btn>
        <!-- <login-form /> -->
      </v-col>
    </v-row>
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
