<template>
  <EmpresaStepper @input="$emit('input', arguments[0])" :value="value"
    @on-save="save" @on-cancel="cancelEdit" justifyButtons="end" :step="step">
    <template #stepLabel>
      <slot name="stepLabel"></slot>
    </template>
    <template #title>Editando sua empresa {{ empresa.razaoSocial }}</template>
    <template #subtitle>
      <v-row no-gutters>
        <v-col>
          Editando empresa {{ getGroupMessageIfExists }}
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

    <template #extraHeader>
      <div class="ml-10 mr-5 mt-10">
        <v-btn v-if="isBlocked" class="text-none" color="error" small disabled>
          Bloqueada
        </v-btn>

        <v-btn-toggle v-else class="text-none" color="primary"
          mandatory rounded v-model="status">
          <v-btn class="text-none" small :value="STATUS_EMPRESA.ATIVA">
            Ativa
          </v-btn>
          <v-btn class="text-none" small :value="STATUS_EMPRESA.INATIVA">
            Inativa
          </v-btn>
        </v-btn-toggle>
      </div>
    </template>

    <template>
      <EmpresaForm ref="empresaForm" />
    </template>

    <template #labelButtonCancel>Cancelar edição</template>
    <template #labelButtonSuccess>Salvar</template>
  </EmpresaStepper>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import EmpresaStepper from '@/module/Empresa/EmpresaStepper'
  import EmpresaForm from '@/module/Empresa/EmpresaForm'
  import { SET_STATUS_EMPRESA } from '@/store/modules/empresa'
  import { STATUS_EMPRESA } from '@/strings'

  export default {
    props: ['value', 'step'],
    data: () => ({
      STATUS_EMPRESA
    }),
    components: {
      EmpresaStepper,
      EmpresaForm
    },
    computed: {
      ...mapGetters('empresa', ['empresa', 'getGroupMessageIfExists']),
      status: {
        get() {
          return this.empresa.status
        },
        set(value) {
          this.setStatusEmpresa(value)
        }
      },
      isBlocked() {
        return this.status === STATUS_EMPRESA.BLOQUEADA
      },
      cnpj() {
        return this.empresa.cnpj
      }
    },
    methods: {
      ...mapMutations('empresa', {
        setStatusEmpresa: SET_STATUS_EMPRESA
      }),
      ...mapActions('empresa', ['searchEmpresasAndCorporacoes']),
      async save() {
        try {
          this.showLoading()
          await this.$refs.empresaForm.saveWrapper()
          await this.searchEmpresasAndCorporacoes()
          this.showSuccessOnSnackbar('Empresa atualizada com sucesso')
          this.$emit('on-save')
        } catch (e) {
          this.showErrorOnSnackbar(e)
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
