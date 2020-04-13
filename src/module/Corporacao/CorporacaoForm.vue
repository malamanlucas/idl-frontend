<template>
  <v-dialog retain-focus max-width="900" @keydown.esc="cancelEdit"
    persistent no-click-animation :value="value">
    <v-card class="py-4 px-10" v-if="isDialogOpen">
      <v-row no-gutters align="center" justify="space-between">
        <v-col>
          <span class="headline font-weight-regular">
            <slot name="title">
              Adicionar
            </slot>
          </span>
          <span class="headline font-weight-bold">Grupo de empresas</span>
        </v-col>
        <v-col cols="auto">
          <close-icon @on-click="cancelEdit" />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <div class="body-2">
            Crie um grupo de empresas
          </div>
        </v-col>
      </v-row>

      <v-row no-gutters class="my-10">
        <v-col>
          <v-text-field :value="nome"
            @input="$emit('update:nome', arguments[0])"
            flat autofocus
            hide-details
            :error="$v.nome.$dirty && $v.nome.$invalid" @blur="$v.nome.$touch()"
            label="Nome Grupo"
            placeholder="Nome Grupo"
            solo-inverted
        ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters align="center" justify="space-between">
        <v-col cols="6" class="mr-2">
          <div class="d-block">
            <div class="title text-truncate">Selecione as empresas deste grupo</div>
          </div>
        </v-col>
        <v-col>
          <v-text-field v-model="razaoSocial"
            flat hide-details
            label="Pesquisar"
            placeholder="Buscar uma empresa"
            color="primary"
            background-color="primarysoft2"
            prepend-inner-icon="mdi-magnify"
            rounded
            solo-inverted
          ></v-text-field>
        </v-col>
      </v-row>

      <template v-if="isLoaded">
        <v-row no-gutters>
          <v-col cols="12">
            <v-lazy :options="{ threshold: 1 }" :min-height="200"
              transition="fade-transition">
              <v-data-table @toggle-select-all="onToggleSelectAll(arguments[0].value)"
                v-model="empresasToInsertWrapper"
                show-select @page-count="pageCount = $event"
                class="elevation-1"
                :dense="false" item-key="id"
                :fixed-header="true" :items-per-page="itemsPerPage" :page.sync="page"
                :headers="headers" :items="itemsFiltered" hide-default-footer
                  >
              </v-data-table>
            </v-lazy>
          </v-col>
          <v-col align="center" cols="12">
            <v-pagination
              v-model="page"
              :total-visible="totalVisible"
              :lengthPagination="pageCount"
              circle
              color="primary"
              class="paginnation-default"
            ></v-pagination>
          </v-col>
        </v-row>

        <v-row no-gutters align="center" justify="end" class="mt-5">
          <v-col cols="auto">
            <v-btn class="text-none" text outlined color="warning" @click="cancel">
              Cancelar
            </v-btn>
          </v-col>
          <v-col cols="auto" class="ml-7">
            <v-btn class="text-none" color="primary" @click="saveWrapper" :disabled="isFormInvalid">
              <slot name="labelButtonSuccess">
                Cadastrar grupo de empresas
              </slot>
            </v-btn>
          </v-col>
        </v-row>
      </template>

    </v-card>
  </v-dialog>
</template>

<script>
  import { required } from 'vuelidate/lib/validators/'
  import { validationMixin } from 'vuelidate'
  import { sortBy, toArray, cloneDeep } from 'lodash'
  import empresaService from '@/services/empresa'
  import { compareTextLettersOnly } from '@/core/utils/comparatorUtils'
  import mixinModalCommon from '@/module/mixin-modal-common'

  export default {
    mixins: [mixinModalCommon, validationMixin],
    props: ['value', 'empresasToInsert', 'empresasToList', 'nome'],
    data: () => ({
      headers: [
        { text: 'Todas as empresas', value: 'razaoSocial' }
      ],
      empresasWithoutCorporacao: null,
      itemsPerPage: 4,
      pageCount: 0,
      totalVisible: 7,
      page: 1,
      razaoSocial: ''
    }),
    watch: {
      value(value) {
        this.onChangeActive(value)
      }
    },
    validations: {
      nome: {
        required
      }
    },
    computed: {
      empresasToInsertWrapper: {
        get() {
          return this.empresasToInsert
        },
        set(value) {
          this.$emit('update:empresasToInsert', value)
        }
      },
      isLoaded() {
        return this.empresasWithoutCorporacao !== null
      },
      allItems() {
        if (!this.isLoaded) {
          return []
        }
        const empresasToListWrapper = toArray(this.empresasToList)
        return this.empresasWithoutCorporacao
                      .filter(e => !empresasToListWrapper.some(i => i.id === e.id))
                      .concat(empresasToListWrapper)
      },
      itemsFiltered() {
        if (!this.isLoaded) {
          return []
        }
        let empresasFiltered = this.allItems

        if (this.razaoSocial.length > 0) {
          empresasFiltered = empresasFiltered.filter(e => compareTextLettersOnly(e.razaoSocial, this.razaoSocial))
        }
        return sortBy(empresasFiltered, ['razaoSocial'])
      },
      isFormInvalid() {
        return this.$v.$invalid
      }
    },
    methods: {
      cancelEdit() {
        this.$emit('input', false)
      },
      cancel() {
        this.cancelEdit()
        this.$emit('on-cancel')
      },
      async loadEmpresasWithoutCorporacao() {
        this.empresasWithoutCorporacao = (await empresaService.search(false)).data
      },
      saveWrapper() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.$emit('on-save')
        } else {
          this.showErrorOnSnackbar('Há erros no formulário')
        }
      },
      onToggleSelectAll(shouldSelectAll) {
        if (shouldSelectAll) {
          this.empresasToInsertWrapper = cloneDeep(this.allItems)
        } else {
          this.empresasToInsertWrapper = []
        }
      },
      async onChangeActive(active) {
        this.empresasWithoutCorporacao = null
        if (active) {
          try {
            this.showLoading()
            await this.loadEmpresasWithoutCorporacao()
          } catch (e) {
            this.showErrorOnSnackbar(e)
          } finally {
            this.hideLoading()
          }
        }
      }
    },
    mounted() {
      this.$v.$touch()
    }
  }
</script>
