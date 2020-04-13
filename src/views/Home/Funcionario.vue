<template>
  <v-layout row align-content-start align-start justify-start pa-6 mb-0 full-width>
    <v-flex>
      <FuncionarioList />
    </v-flex>
  </v-layout>
</template>

<script>
  import FuncionarioList from '@/module/Funcionario/FuncionarioList'

  export default {
    components: {
      FuncionarioList
    }
  }
</script>
