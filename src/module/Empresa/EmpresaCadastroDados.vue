<template>
  <EmpresaStepper @input="$emit('input', arguments[0])" :value="value"
    @on-save="save" @on-cancel="cancelEdit" justifyButtons="end" :step="step">
    <template #stepLabel>
      <slot name="stepLabel"></slot>
    </template>
    <template #title>Cadastrando sua nova empresa {{ getGroupMessageIfExists }} </template>
    <template #subtitle>
      <v-row no-gutters>
        <v-col>
          Você pode editar estes dados apenas alterando as informações nos formulários
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto" class="font-weight-bold">
          CNPJ:
        </v-col>
        <v-col cols="auto" class="ml-2">
          {{ cnpj | cnpj }}
        </v-col>
      </v-row>
    </template>

    <template>
      <EmpresaForm ref="empresaForm" />
    </template>

    <template #labelButtonCancel>Cancelar adição</template>
    <template #labelButtonSuccess>Seguir</template>
  </EmpresaStepper>
</template>

<script>
  import { get } from 'lodash'
  import { mapActions, mapGetters } from 'vuex'
  import EmpresaStepper from '@/module/Empresa/EmpresaStepper'
  import EmpresaForm from '@/module/Empresa/EmpresaForm'

  export default {
    props: ['value', 'step'],
    components: {
      EmpresaStepper,
      EmpresaForm
    },
    computed: {
      ...mapGetters('empresa', ['empresa', 'getGroupMessageIfExists']),
      cnpj() {
        return this.empresa.cnpj
      }
    },
    methods: {
      ...mapActions('empresa', ['searchEmpresasAndCorporacoes']),
      async save() {
        try {
          this.showLoading()
          await this.$refs.empresaForm.saveWrapper()
          await this.searchEmpresasAndCorporacoes()
          this.$emit('on-save')
        } catch (e) {
          this.showErrorOnSnackbar(get(e, 'response.data.err.message', e))
        } finally {
          this.hideLoading()
        }
      },
      cancelEdit() {
        this.$emit('input', false)
      }
    }
  }
</script>
