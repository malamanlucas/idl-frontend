<template>
  <EmpresaStepper @input="$emit('input', arguments[0])" :value="value"
    @on-cancel="cancelEdit" justifyButtons="end" :step="step">
    <template #stepLabel>
      <slot name="stepLabel"></slot>
    </template>

    <BaseModal v-if="isDialogOpen">
      <template #titleModal>SETORES</template>
      <template #headerName>SETOR</template>
      <template #buttonLabelAddNewItem>NOVO SETOR</template>
      <template #enables>Ativos</template>
      <template #disables>Inativos</template>
    </BaseModal>

    <template #title>Setores</template>
    <template #subtitle>Adicione, edite e exclua um setor para essa empresa: {{ getActualRazaoSocial }}</template>

    <template #actions>
      <v-row no-gutters justify="end">
        <v-col cols="auto">
          <v-btn v-if="!isEmptyList" class="text-none" color="primary" @click="$emit('on-save')">
            <slot name="labelSuccess"></slot>
          </v-btn>
        </v-col>
      </v-row>
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
      ...mapGetters('empresa', ['empresa', 'empresaRegistered', 'getActualRazaoSocial']),
      ...mapGetters('setor', ['isEmptyList'])
    },
    methods: {
      cancelEdit() {
        this.$emit('input', false)
      }
    }
  }
</script>
