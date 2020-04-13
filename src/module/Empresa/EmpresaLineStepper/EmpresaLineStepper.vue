<template>
  <v-row no-gutters align="center">
    <v-col cols="auto">
      <slot name="stepLabel">Label</slot>
    </v-col>
    <v-col class="mx-5 bla">
      <div class="steppers">
        <div v-for="step in (totalSteps - 1)" :key="step" class="step override"
          :class="[{'step--done': step < actualStep}, {'step--todo': step >= actualStep}]">
          <div class="step__fixer"></div>
        </div>
      </div>
    </v-col>
    <v-col cols="auto">
      {{ actualStep }} de {{ totalSteps }}
    </v-col>
  </v-row>
</template>

<style lang="scss" src="./EmpresaLineStepper.scss"></style>

<script>
  export default {
    props: {
      actualStep: {
        type: Number,
        default: 1
      },
      totalSteps: {
        type: Number,
        default: 6
      }
    }
  }
</script>
