<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12 mb-8">
        <div
          class="title font-weight-regular grey--text mb-1">
          Minhas <span class="font-weight-bold">Empresas</span>
        </div>
        <div class="body-2 grey--text text--lighten-2">
          Módulos de gerenciamento das empresas, abaixo estão listados as empresas cadastradas
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-tabs slider-color="primary"
          height="80"
          v-model="activeTab"
          show-arrows
          transition="fade"
          background-color="transparent"
          color="grey"
          outlined>
          <v-tab v-for="itemTab in itensTab" :key="itemTab.value" :href="`#${itemTab.value}`"
            :class="[{ 'px-7': $vuetify.breakpoint.smAndUp}, { 'px-1': $vuetify.breakpoint.xs}]"
            background-color="transparent">
            <MenuTabContent :itemTab="itemTab" />
          </v-tab>

          <v-tabs-items v-model="activeTab" class="transparent mt-10">
            <v-tab-item v-for="itemTab in itensTab" :key="itemTab.value"
              :value="itemTab.value"
              :transition="false" :reverse-transition="false">
              <keep-alive>
                <component v-if="itemTab.value === activeTab" :is="activeComponent" />
              </keep-alive>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { get, isNil } from 'lodash'
  import { mapActions, mapGetters } from 'vuex'
  import MenuTabContent from '@/module/EmpresasCorporacoes/MenuTabContent'
  import EmpresaManager from '@/module/Empresa/EmpresaManager'
  import CorporacaoManager from '@/module/Corporacao/CorporacaoManager'
  import EmpresaCadastroDados from '@/module/Empresa/EmpresaCadastroDados'
  import EmpresaSuccessStepper from '@/module/Empresa/EmpresaSuccessStepper'

  export default {
    components: {
      MenuTabContent,
      EmpresaManager,
      EmpresaSuccessStepper,
      EmpresaCadastroDados,
      CorporacaoManager
    },
    data: () => ({
      activeTab: null,
      itensTab: [
        { value: 'empresa', label: 'Minhas empresas', component: 'EmpresaManager' },
        { value: 'grupo', label: 'Meus grupos', component: 'CorporacaoManager' }
      ]
    }),
    computed: {
      ...mapGetters('empresa', ['hasCorporacoes']),
      isTabActive() {
        return !isNil(this.activeTab)
      },
      activeComponent() {
        if (this.activeTab === null) {
          return null
        }
        if (this.activeTab === 'empresa') {
          return 'EmpresaManager'
        }
        return 'CorporacaoManager'
      }
    },
    methods: {
      ...mapActions('empresa', ['searchEmpresasAndCorporacoes']),
      async loadEmpresasCorporacoes() {
        try {
          this.showLoading()
          await this.searchEmpresasAndCorporacoes()
          if (this.hasCorporacoes) {
            this.activeTab = 'grupo'
          }
        } catch (error) {
          this.showErrorOnSnackbar(get(error, 'response.data.err.message'))
          throw error
        } finally {
          this.hideLoading()
        }
      }
    },
    async mounted() {
      await this.loadEmpresasCorporacoes()
    }
  }
</script>
