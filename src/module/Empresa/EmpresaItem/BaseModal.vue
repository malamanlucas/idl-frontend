<template>
  <v-row no-gutters class="mt-10">
    <v-col cols="12">
      <form-edicao v-if="isEditing" v-model="formActive" @on-save="finishForm" @on-cancel="isEditing = false" />
      <form-cadastro v-else v-model="formActive" @on-save="finishForm" />

      <v-row no-gutters>
        <v-col cols="12" class="my-5">
          <v-row no-gutters justify="space-between">
            <v-col>
              <v-text-field prepend-inner-icon="mdi-magnify" rounded autofocus
                ref="textSearch"
                outlined label="Pesquisar" flat v-model="nameSearch"></v-text-field>
            </v-col>
            <v-col cols="auto" class="ml-5">
              <v-row no-gutters>
                <v-col cols="auto" class="ml-3">
                  <v-btn class="text-none"  color="primary" @click="startForm"
                    prepend-icon="mdi-magnify" x-large >
                    <v-icon left>mdi-magnify</v-icon>
                    <slot name="buttonLabelAddNewItem">NOVA UNDEFINED</slot>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <base-list @on-edit="startEditing(arguments[0])">
        <template #headerName>
          <slot name="headerName"></slot>
        </template>
      </base-list>
    </v-col>
  </v-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { isEmpty, isNil } from 'lodash'
  import BaseList from '@/module/Empresa/EmpresaItem/BaseList'
  import FormEdicao from '@/module/Empresa/EmpresaItem/Form/FormEdicao'
  import FormCadastro from '@/module/Empresa/EmpresaItem/Form/FormCadastro'
  import { COMMON_STATUS } from '@/strings'
  import empresaItemMixin from '@/module/Empresa/EmpresaItem/empresa-item-mixin'

  export default {
    mixins: [empresaItemMixin],
    data: () => ({
      formActive: false,
      isEditing: false,
      COMMON_STATUS
    }),
    components: {
      FormCadastro,
      FormEdicao,
      BaseList
    },
    computed: {
      ...mapGetters('empresa', ['empresa', 'empresaRegistered']),
      getFiltro() {
        return isEmpty(this.module) ? {} : this.$store.getters[`${this.module}/getFiltro`]
      },
      status: {
        get() {
          return this.getFiltro.status
        },
        set(status) {
          this.setFiltro({ status })
        }
      },
      nameSearch: {
        get() {
          return this.getFiltro.name
        },
        set(name) {
          this.setFiltro({ name })
        }
      },
      idEmpresa() {
        if (!isNil(this.empresa.id)) {
          return this.empresa.id
        }
        return this.empresaRegistered.id
      }
    },
    methods: {
      setFiltro(payload) {
        this.$store.commit(`${this.module}/SET_FILTRO`, payload)
      },
      async startEditing(id) {
        try {
          this.showLoading()
          await this.$store.dispatch(`${this.module}/loadById`, { idEmpresa: this.idEmpresa, id })
          this.isEditing = true
          await this.$nextTick()
          this.startForm()
        } catch (e) {
          console.log(e)
          this.showErrorOnSnackbar(e)
        } finally {
          this.hideLoading()
        }
      },
      startForm() {
        this.formActive = true
      },
      async finishForm() {
        this.formActive = false
        this.isEditing = false
        await this.searchWrapper()
      },
      async searchWrapper() {
        try {
          this.showLoading()
          await this.$store.dispatch(`${this.module}/search`, { idEmpresa: this.idEmpresa })
        } catch (e) {
          console.log(e)
          this.showErrorOnSnackbar(e)
        } finally {
          this.hideLoading()
        }
      }
    },
    async mounted() {
      this.searchWrapper()
      await this.$nextTick()
      this.$refs.textSearch.focus()
    }
  }
</script>
