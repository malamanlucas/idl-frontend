<template>
  <page-base>
    <template #header>
      <page-header @on-click-menu="drawer = !drawer" />
    </template>
    <template #navigation>
      <page-navigation v-model="drawer" />
    </template>

    <v-layout fill-height :px-10="$vuetify.breakpoint.smAndUp" py-10>
      <v-flex px-4>
        <modal-loading v-model="statuses.loading" />
        <modal-error v-model="statuses.errorOnModal" :message="statuses.errorMessage" />
        <snackbar-error v-model="statuses.errorOnSnackbar" :message="statuses.errorMessage" />
        <snackbar-success v-model="statuses.successOnSnackbar" :message="statuses.successMessage" />
        <router-view />
      </v-flex>
    </v-layout>

  </page-base>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PageHeader from '@/core/components/PageHeader'
  import PageNavigation from '@/core/components/PageNavigation'
  import ModalLoading from '@/core/components/ModalLoading'
  import ModalError from '@/core/components/ModalError'
  import SnackbarError from '@/core/components/SnackbarError'
  import SnackbarSuccess from '@/core/components/SnackbarSuccess'

  export default {
    data: () => ({
      drawer: false
    }),
    components: {
      PageHeader,
      PageNavigation,
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
