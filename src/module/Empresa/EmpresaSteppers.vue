<template>
  <div>
    <EmpresaCadastroCnpj v-model="steps.cadastroCnpj.active" :step="1"
      @input="onInputStep(arguments[0])" @on-insert="openStep('cadastroDados')" @on-edit="openStep('empresaEdicao')">
      <template #stepLabel>Identificação</template>
    </EmpresaCadastroCnpj>
    <EmpresaCadastroDados v-model="steps.cadastroDados.active" :step="2" @input="onInputStep(arguments[0])"
      @on-save="openStep('cadastroDadosSuccess')">
      <template #stepLabel>Dados Empresa</template>
    </EmpresaCadastroDados>
    <EmpresaEdicao v-model="steps.empresaEdicao.active" :step="null" @input="onInputStep(arguments[0])"
      @on-save="closeStep">
      <template #stepLabel>Dados Empresa</template>
    </EmpresaEdicao>

    <EmpresaSuccessStepper v-model="steps.cadastroDadosSuccess.active" :step="3" @input="onInputStep(arguments[0])"
      @on-save="openSetorStep">
      <template #stepLabel>Sucesso</template>
      <template #title>Cadastrando sua nova empresa</template>
      <template #subtitle>Você pode editar estes dados apenas alterando as informações nos formulários</template>
      <template #body>
        Parabéns, você cadastrou sua primeira empresa. Agora para que você comece a organizar os
        dado você precisa cadastrar os setores e funções para esta nova empresa.
      </template>
      <template #buttonCancel>&nbsp;</template>
      <template #labelSuccess>Cadastrar setores</template>
    </EmpresaSuccessStepper>

    <SetorModal v-model="steps.setor.active" :step="4" @input="onInputStep(arguments[0])"
      @on-save="openStep('setorSuccess')">
      <template #stepLabel>Setores</template>
      <template #labelSuccess>Seguir</template>
    </SetorModal>

    <SetorModal v-model="steps.setorEdicao.active" :step="null" @input="onInputStep(arguments[0])"
      @on-save="steps.setorEdicao.active = false">
      <template #stepLabel>Setores</template>
      <template #buttonCancel><span></span></template>
      <template #labelSuccess>Fechar</template>
    </SetorModal>

    <EmpresaSuccessStepper v-model="steps.setorSuccess.active" :step="4" @input="onInputStep(arguments[0])"
      @on-save="openFuncaoStep" @on-cancel="openSetorStep">
      <template #stepLabel>setores</template>
      <template #title>Sucesso</template>
      <template #subtitle>Seus setores foram cadastrados com sucesso</template>
      <template #body>
        Seus setores foram cadastrados, cadastre agora as suas funções para sua empresa.
      </template>
      <template #labelCancel>Voltar para Setores</template>
      <template #labelSuccess>Cadastrar funções</template>
    </EmpresaSuccessStepper>

    <FuncaoModal v-model="steps.funcao.active" :step="5" @input="onInputStep(arguments[0])"
      @on-cancel="openSetorStep">
      <template #stepLabel>Funçoes</template>
      <template #labelCancel>Voltar para Setores</template>
      <template #labelSuccess>Finalizar</template>
    </FuncaoModal>

    <FuncaoModal v-model="steps.funcaoEdicao.active" :step="null" @input="onInputStep(arguments[0])">
      <template #stepLabel>Funçoes</template>
      <template #buttonCancel><span></span></template>
      <template #labelSuccess>Fechar</template>
    </FuncaoModal>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import EmpresaCadastroCnpj from '@/module/Empresa/EmpresaCadastroCnpj'
  import EmpresaEdicao from '@/module/Empresa/EmpresaEdicao'
  import EmpresaCadastroDados from '@/module/Empresa/EmpresaCadastroDados'
  import EmpresaSuccessStepper from '@/module/Empresa/EmpresaSuccessStepper'
  import FuncaoModal from '@/module/Funcao/FuncaoModal'
  import SetorModal from '@/module/Setor/SetorModal'
  import { SET_EMPRESA_ITEM_MODULE_ACTIVE } from '@/store/modules/common'

  export default {
    props: ['activeStep'],
    data: () => ({
      steps: {
        cadastroCnpj: {
          active: false,
        },
        cadastroDados: {
          active: false
        },
        cadastroDadosSuccess: {
          active: false
        },
        empresaEdicao: {
          active: false
        },
        setor: {
          active: false
        },
        setorEdicao: {
          active: false
        },
        setorSuccess: {
          active: false
        },
        funcao: {
          active: false
        },
        funcaoEdicao: {
          active: false
        }
      }
    }),
    watch: {
      activeStep(value) {
        Object.keys(this.steps).forEach((key) => {
          this.steps[key].active = false
        })
        if (value !== null) {
          this.steps[value].active = true
        }
      }
    },
    components: {
      EmpresaSuccessStepper,
      EmpresaEdicao,
      EmpresaCadastroDados,
      EmpresaCadastroCnpj,
      FuncaoModal,
      SetorModal
    },
    methods: {
      ...mapMutations('common', {
        setModule: SET_EMPRESA_ITEM_MODULE_ACTIVE
      }),
      onInputStep(value) {
        if (value === false) {
          this.closeStep()
        }
      },
      openSetorStep() {
        this.setModule('setor')
        this.openStep('setor')
      },
      openFuncaoStep() {
        this.setModule('funcao')
        this.openStep('funcao')
      },
      closeStep() {
        this.$emit('update:activeStep', null)
      },
      openStep(value) {
        this.$emit('update:activeStep', value)
      }
    }
  }
</script>
