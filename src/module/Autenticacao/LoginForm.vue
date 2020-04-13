<template>
  <v-layout row fill-height justify-center align-center>
    <v-flex xs8>
      <v-layout column>
        <v-flex mb-7>
          <div class="display-1">Faça seu login</div>
        </v-flex>

        <v-flex>
          <v-text-field
            :error="$v.username.$dirty && $v.username.$invalid" @blur="$v.username.$touch()"
            label="LOGIN" v-model="username" placeholder=" " @keydown.enter="doLogin"
            autocomplete="new-password" />
        </v-flex>
        <v-flex>
          <v-text-field :type="showPassword ? 'text' : 'password'"
            :error="$v.password.$dirty && $v.password.$invalid" @blur="$v.password.$touch()"
            @click:append="showPassword = !showPassword"
            autocomplete="new-password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="SENHA" @keydown.enter="doLogin" v-model="password" placeholder=" "></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-alert type="error" v-show="hasErrorInService">
            Parece que estes dados ainda não estão cadastrados. Por favor verifique sua senha e login, ou entre em contato com nosso suporte
          </v-alert>
        </v-flex>
        <v-flex xs12>
          <v-layout column align-center mx-10>
            <v-btn class="text-none"  :loading="loading" color="primary" block x-large @click="doLogin">Entrar</v-btn>
            <v-flex mt-7>
              <div
                class="overline primary--text text--darken-2 font-weight-bold link"
              >Ops! Esqueci meus dados</div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mixin as focusMixin } from 'vue-focus'
  import Cookies from 'js-cookie'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators/'

  export default {
    // inject: ['$validator'],
    mixins: [focusMixin, validationMixin],
    data: () => ({
      username: '',
      password: '',
      showPassword: false,
      hasErrorInService: false,
      loading: false
    }),
    computed: {
      Cookies() {
        return Cookies
      }
    },
    validations: {
      username: {
        required
      },
      password: {
        required
      }
    },
    methods: {
      ...mapActions('autenticacao', ['login']),
      async doLogin() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          try {
            this.loading = true
            await this.login({ username: this.username, password: this.password })
            this.hideAllMessages()
            this.$router.push({ name: 'home' })
            this.hasErrorInService = false
            console.log(this);
          } catch (e) {
            this.hasErrorInService = true
          } finally {
            this.loading = false
          }
        }
      }
    }
  }
</script>
