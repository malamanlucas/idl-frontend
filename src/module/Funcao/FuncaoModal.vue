<template>
  <EmpresaStepper @input="$emit('input', arguments[0])" :value="value"
    @on-cancel="$emit('on-cancel')" @on-save="$emit('input', false)" justifyButtons="end" :step="step">
    <template #stepLabel>
      <slot name="stepLabel"></slot>
    </template>

    <BaseModal v-if="isDialogOpen">
      <template #titleModal>FUNÇÕES</template>
      <template #headerName>FUNÇÃO</template>
      <template #buttonLabelAddNewItem>NOVA FUNÇÃO</template>
      <template #enables>Ativas</template>
      <template #disables>Inativas</template>
    </BaseModal>

    <template #title>Funções</template>
    <template #subtitle>Adicione, edite e exclua uma função para essa empresa: {{ getActualRazaoSocial }}</template>

    <template #labelButtonSuccess>
      <slot name="labelSuccess"></slot>
    </template>

    <template #buttonCancel>
      <slot name="buttonCancel"></slot>
    </template>

    <template #buttonSuccess v-if="isEmptyList">&nbsp;</template>

    <template #labelButtonCancel>
      <slot name="labelCancel"></slot>
    </template>
  </EmpresaStepper>
</template>

<script>
  import { mapGetters } from 'vuex'
  import EmpresaStepper from '@/module/Empresa/EmpresaStepper'
  import BaseModal from '@/module/Empresa/EmpresaItem/BaseModal'
  import mixinModalCommon from '@/module/mixin-modal-common'

  export default {
    mixins: [mixinModalCommon],
    props: ['value', 'step'],
    components: {
      EmpresaStepper,
      BaseModal
    },
    computed: {
      ...mapGetters('empresa', ['empresa', 'getActualRazaoSocial']),
      ...mapGetters('funcao', ['isEmptyList'])
    }
  }
</script>
