<template>
  <v-dialog retain-focus max-width="900" @keydown.esc="cancelEdit"
    persistent no-click-animation :value="value" @input="$emit('input', arguments[0])">
    <v-card class="py-4 px-10" v-if="isDialogOpen">
      <v-row no-gutters justify="space-between">
        <v-col class="headline font-weight-regular">
          <slot name="title">title</slot>
        </v-col>
        <v-col cols="auto">
          <v-row no-gutters>
            <v-col>
              <slot name="extraHeader"></slot>
            </v-col>
            <v-col>
              <close-icon @on-click="cancelEdit" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <div class="body-2">
            <slot name="subtitle">title</slot>
          </div>
        </v-col>
      </v-row>

      <EmpresaLineStepper v-if="step" class="mt-5 mb-6" :actualStep="step">
        <template #stepLabel>
          <slot name="stepLabel"></slot>
        </template>
      </EmpresaLineStepper>

      <v-row no-gutters>
        <v-col>
          <slot></slot>
        </v-col>
      </v-row>

      <slot name="actions">
        <v-row no-gutters align="center" :justify="justifyButtons" class="mt-5">
          <slot name="buttonCancel">
            <v-col cols="auto">
              <v-btn class="text-none" text outlined color="warning" @click="$emit('on-cancel')">
                <slot name="labelButtonCancel">
                  Cancelar
                </slot>
              </v-btn>
            </v-col>
          </slot>
          <slot name="buttonSuccess">
            <v-col cols="auto" class="ml-7">
              <v-btn class="text-none" color="primary" @click="$emit('on-save')">
                <slot name="labelButtonSuccess">
                  Salvar
                </slot>
              </v-btn>
            </v-col>
          </slot>
        </v-row>
      </slot>
    </v-card>
  </v-dialog>
</template>

<script>
  import EmpresaLineStepper from '@/module/Empresa/EmpresaLineStepper'
  import mixinModalCommon from '@/module/mixin-modal-common'

  export default {
    mixins: [mixinModalCommon],
    props: {
      justifyButtons: {
        type: String,
        default: 'center'
      },
      value: Boolean,
      step: Number
    },
    components: {
      EmpresaLineStepper
    },
    methods: {
      cancelEdit() {
        this.$emit('input', false)
      }
    }
  }
</script>
