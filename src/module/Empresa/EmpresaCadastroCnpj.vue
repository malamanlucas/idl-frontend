<template>
  <EmpresaStepper @input="$emit('input', arguments[0])" :value="value"
    @on-save="save" @on-cancel="cancelEdit" :step="step">
    <template #stepLabel>
      <slot name="stepLabel"></slot>
    </template>
    <template>
      <v-row no-gutters justify="center">
        <v-col class="mb-5" cols="6" v-if="hasError">
          <v-alert outlined color="primary" dismissible>
            <div>
              Adicione um CNPJ válido para seguir com o cadastro. Se você tiver algum problema solicite
              <span style="text-decoration: underline">atendimento de um de nossos analistas</span>
            </div>
          </v-alert>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-form @submit.prevent="save">
            <v-text-field v-mask="theMask.cnpjMask" v-model="cnpj" autofocus
              label="Informe o CNPJ:" placeholder="Digite aqui o cnpj da empresa:"
              :error="$v.cnpj.$dirty && $v.cnpj.$invalid" @blur="$v.cnpj.$touch()" />
          </v-form>
        </v-col>
      </v-row>
    </template>

    <template #title>Cadastrando sua nova empresa {{ getGroupMessageIfExists }} </template>
    <template #subtitle>Você pode editar estes dados apenas alterando as informações nos formulários</template>

    <template #labelButtonCancel>Cancelar adição</template>
    <template #labelButtonSuccess>Seguir</template>
  </EmpresaStepper>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { required, minLength } from 'vuelidate/lib/validators/'
  import { validationMixin } from 'vuelidate'
  import { theMask } from '@/core/utils/maskHelpers'
  import EmpresaStepper from '@/module/Empresa/EmpresaStepper'

  export default {
    props: ['value', 'step'],
    mixins: [validationMixin],
    data: () => ({
      theMask,
      loading: false,
      hasError: false,
      cnpj: ''
    }),
    validations: {
      cnpj: {
        required,
        minLength: minLength(18)
      }
    },
    components: {
      EmpresaStepper
    },
    computed: {
      ...mapGetters('empresa', ['getGroupMessageIfExists'])
    },
    watch: {
      value(value) {
        if (value === true) {
          this.clean()
        }
      }
    },
    methods: {
      ...mapActions('empresa', ['populateEmpresa', 'cancel']),
      cancelEdit() {
        this.$emit('input', false)
      },
      async save() {
        this.hasError = false
        if (!this.$v.$invalid) {
          try {
            this.showLoading()
            const response = await this.populateEmpresa(this.cnpj)
            if (response.isRegistered) {
              this.$emit('on-edit')
              } else {
              this.$emit('on-insert')
            }
          } catch (e) {
            if (e.response.status === 500) {
              this.showErrorOnSnackbar('Ocorreu um erro interno ao processar sua solicitação')
            } else {
              this.hasError = true
            }
          } finally {
            this.hideLoading()
          }
        }
      },
      clean() {
        this.cnpj = ''
        this.$v.$reset()
        this.cancel()
      }
    }
  }
</script>
