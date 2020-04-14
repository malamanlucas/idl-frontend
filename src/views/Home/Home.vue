<template>
  <page-base>
    <v-row no-gutters class="pa-10 height">
      <v-col>
        <modal-loading v-model="statuses.loading" />
        <modal-error v-model="statuses.errorOnModal" :message="statuses.errorMessage" />
        <snackbar-error v-model="statuses.errorOnSnackbar" :message="statuses.errorMessage" />
        <snackbar-success v-model="statuses.successOnSnackbar" :message="statuses.successMessage" />
        <router-view />
      </v-col>
    </v-row>
  </page-base>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ModalLoading from '@/core/components/ModalLoading'
  import ModalError from '@/core/components/ModalError'
  import SnackbarError from '@/core/components/SnackbarError'
  import SnackbarSuccess from '@/core/components/SnackbarSuccess'

  export default {
    components: {
      ModalLoading,
      ModalError,
      SnackbarError,
      SnackbarSuccess
    },
    computed: {
      ...mapGetters('dashboard', ['statuses'])
    },
    methods: {
      // showModalWithError(message) {
        // this.errorMessage = message
        // this.globalErrorOnModal = true
      // }
    }
  }
</script>
