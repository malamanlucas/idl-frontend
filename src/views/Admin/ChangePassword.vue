<template>
  <v-row>
    <v-col cols="12" class="title font-weight-bold">
      Alterar senha do usuário
    </v-col>
    <v-col>
      <v-form>
        <v-text-field :error="$v.username.$dirty && $v.username.$invalid" @blur="$v.username.$touch()"
          label="Login" v-model="username" placeholder="Exemplo: email@bla.com"
          autocomplete="new-password" />
        <v-text-field :type="showPassword ? 'text' : 'password'"
            :error="$v.password.$dirty && $v.password.$invalid" @blur="$v.password.$touch()"
            @click:append="showPassword = !showPassword" autocomplete="new-password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="New Password" v-model="password" placeholder="Exemplo: 123"></v-text-field>
        <v-btn :disabled="isInvalid" color="primary" @click="save">
          Trocar senha
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { get } from 'lodash'
  import { required } from 'vuelidate/lib/validators/'
  import adminService from '@/services/admin'

  export default {
    mixins: [validationMixin],
    data: () => ({
      username: '',
      password: '',
      showPassword: false
    }),
    validations: {
      username: {
        required
      },
      password: {
        required
      }
    },
    computed: {
      isInvalid() {
        return this.$v.$invalid
      }
    },
    methods: {
      async save() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          try {
            this.showLoading()
            await adminService.changePasswordOfUser(this.username, this.password)
            this.showSuccessOnSnackbar('Senha alterada com sucesso!')
          } catch (e) {
            this.showErrorOnSnackbar(get(e, 'response.data.err.message', e))
          } finally {
            this.hideLoading()
          }
        } else {
          this.showErrorOnSnackbar('Há erros no formulário')
        }
      }
    },
    mounted() {
      this.$v.$touch()
    }
  }
</script>
