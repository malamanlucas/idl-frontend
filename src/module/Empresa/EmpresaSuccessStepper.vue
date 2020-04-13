<template>
  <EmpresaStepper @input="$emit('input', arguments[0])" :value="value"
    @on-cancel="$emit('on-cancel')" @on-save="$emit('on-save')" justifyButtons="end" :step="step">
    <template #stepLabel>
      <slot name="stepLabel"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #subtitle>
      <slot name="subtitle"></slot>
    </template>

    <template>
      <v-alert color="accent" class="my-10">
        <v-row no-gutters align="center">
          <v-col cols="auto" class="mr-3">
            <v-avatar size="80" color="primarysoft2">
              <v-icon large color="primary">mdi-google-circles-extended</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="font-weight-bold title">
                  Sucesso!
                </div>
              </v-col>
              <v-col cols="12">
                <div class="body-2">
                  <slot name="body"></slot>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="body-1 font-weight-bold">Vamos lá?</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-alert>
    </template>

    <template #labelButtonSuccess>
      <slot name="labelSuccess"></slot>
    </template>

    <template #buttonCancel>
      <slot name="buttonCancel"></slot>
    </template>

    <template #labelButtonCancel>
      <slot name="labelCancel"></slot>
    </template>
  </EmpresaStepper>
</template>

<script>
  import EmpresaStepper from '@/module/Empresa/EmpresaStepper'

  export default {
    props: ['value', 'step'],
    components: {
      EmpresaStepper
    }
  }
</script>
