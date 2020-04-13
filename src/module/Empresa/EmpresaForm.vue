<template>
  <v-form @submit.prevent>
    <v-layout row wrap ma-0 pa-0>
      <v-flex pa-2 xs12 sm12 md12 lg6 xl6>
        <v-text-field label="Razão Social" placeholder="Razão Social" autofocus
          v-model="empresa.razaoSocial" @keydown.enter="saveWrapper"
          :error="$v.empresa.razaoSocial.$dirty && $v.empresa.razaoSocial.$invalid" @blur="$v.empresa.razaoSocial.$touch()" />
      </v-flex>
      <v-flex pa-2 xs12 sm12 md12 lg6 xl6>
        <v-text-field @keydown.enter="saveWrapper"
          :error="$v.empresa.endereco.$dirty && $v.empresa.endereco.$invalid" @blur="$v.empresa.endereco.$touch()"
          v-model="empresa.endereco" label="Endereço" placeholder="Rua Candido Portnari" />
      </v-flex>
      <v-flex pa-2 xs6 sm6 md2 lg2 xl4>
        <v-text-field @keydown.enter="saveWrapper"
          :error="$v.empresa.cnae.$dirty && $v.empresa.cnae.$invalid" @blur="$v.empresa.cnae.$touch()"
          v-model="empresa.cnae" label="CNAE" placeholder="00-000-000"
          type="tel" v-mask="theMask.cnaeMask" />
      </v-flex>
      <v-flex pa-2 xs6 sm6 md4 lg4 xl4>
        <v-text-field @keydown.enter="saveWrapper"
          :error="$v.empresa.cep.$dirty && $v.empresa.cep.$invalid" @blur="$v.empresa.cep.$touch()"
          v-model="empresa.cep" label="CEP" placeholder="00000-00"
          type="tel" v-mask="theMask.cepMask" />
      </v-flex>
      <v-flex pa-2 xs12 sm6 md4 lg6 xl4>
        <v-text-field @keydown.enter="saveWrapper"
          :error="$v.empresa.bairro.$dirty && $v.empresa.bairro.$invalid" @blur="$v.empresa.bairro.$touch()"
          v-model="empresa.bairro" label="Bairro" placeholder="JD. America" />
      </v-flex>
      <v-flex pa-2 xs12 sm6 md2 lg4 xl4>
        <v-text-field @keydown.enter="saveWrapper"
          :error="$v.empresa.numero.$dirty && $v.empresa.numero.$invalid" @blur="$v.empresa.numero.$touch()"
          v-model="empresa.numero" label="Número" placeholder="520" />
      </v-flex>
      <v-flex pa-2 xs12 sm6 md6 lg4 xl4>
        <v-autocomplete label="Estado" @keydown.enter="saveWrapper"
          :error="$v.empresa.uf.$dirty && $v.empresa.uf.$invalid" @blur="$v.empresa.uf.$touch()"
          v-model="empresa.uf"
          :items="estadosOptions" placeholder="SP" no-data-text="Nenhum estado encontrado"
          auto-select-first clearable @change="onChangeEstado" />
      </v-flex>
      <v-flex pa-2 xs12 sm6 md6 lg4 xl4 pb-10>
        <v-autocomplete label="Cidade" :loading="loadingCidade"
          :items="cidades" placeholder="Campinas"
          item-text="nome" return-object no-data-text="Nenhuma cidade encontrada"
          auto-select-first clearable @keydown.enter="saveWrapper"
          :error="$v.empresa.cidade.$dirty && $v.empresa.cidade.$invalid" @blur="$v.empresa.cidade.$touch()"
          v-model="empresa.cidade" @change="$v.empresa.cidade.$touch()"
          :filter="autocompleteFilterCidade" />
      </v-flex>
    </v-layout>

  </v-form>
</template>

<script>
  import { cloneDeep, isNil } from 'lodash'
  import { mapGetters, mapActions } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required, minLength } from 'vuelidate/lib/validators/'
  import strings from '@/strings'
  import locationService from '@/services/location'
  import { theMask } from '@/core/utils/maskHelpers'
  import { compareTextLettersOnly, equalsTextLettersOnly } from '@/core/utils/comparatorUtils'

  export default {
    mixins: [validationMixin],
    data: () => ({
      theMask,
      loadingCidade: false,
      estadosOptions: [],
      cidades: [],
      empresa: {
        cidade: {
          id_cidade: null
        }
      }
    }),
    computed: {
      ...mapGetters('empresa', {
        getEmpresa: 'empresa',
        empresaFound: 'empresaFound'
      })
    },
    validations: {
      empresa: {
        razaoSocial: {
          required
        },
        cnae: {
          required,
          minLength: minLength(10)
        },
        endereco: {
          required
        },
        cep: {
          required,
          minLength: minLength(9)
        },
        bairro: {
          required
        },
        numero: {
          required
        },
        uf: {
          required
        },
        cidade: {
          id_cidade: {
            required
          }
        }
      }
    },
    methods: {
      ...mapActions('empresa', ['save']),
      autocompleteFilterCidade(cidade, queryText) {
        return compareTextLettersOnly(cidade.nome, queryText)
      },
      onChangeEstado() {
        this.$v.empresa.uf.$touch()
        this.loadCidades()
      },
      async loadCidades(resetCity = true) {
        this.loadingCidade = true
        this.cidades.splice(0, this.cidades.length)
        if (resetCity) {
          this.empresa.cidade = null
        }
        await this.$nextTick()
        try {
          const response = await locationService.buscaCidades(this.empresa.uf)
          response.data.forEach(cidade => this.cidades.push(cidade))
          await this.$nextTick()
        } catch (e) {
          console.error(e);
        } finally {
          this.loadingCidade = false
        }
      },
      async loadEmpresaIfExists() {
        if (this.empresaFound) {
          this.empresa = cloneDeep(this.getEmpresa)
          await this.loadCidades(false)
          if (!isNil(this.empresa.uf)) {
            this.selectCidade()
            if (isNil(this.empresa.cidade)) {
              this.showErrorOnSnackbar('Houve um problema no carregamento cidade, por favor selecione-a manualmente.')
            }
          } else {
            this.showErrorOnSnackbar('Houve um problema no carregamento da cidade e do estado, por favor selecione-os manualmente.')
          }
        }
      },
      selectCidade() {
        let cidadeFound = this.cidades.find(cidade => cidade.id_cidade === this.getEmpresa.cidade.id_cidade)
        if (isNil(cidadeFound)) { // try find by name
          [cidadeFound] = this.cidades.filter((cidade) => {
            const { nome } = cidade
            const cidadeNomeEmpresa = this.getEmpresa.cidade.nome
            return equalsTextLettersOnly(nome, cidadeNomeEmpresa) || compareTextLettersOnly(nome, cidadeNomeEmpresa)
          })
          console.log(cidadeFound)
        }
        this.empresa.cidade = cidadeFound
      },
      async saveWrapper() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          try {
            await this.save(this.empresa)
            this.$emit('on-save')
          } catch (e) {
            console.error(e)
            throw e
          }
        } else {
          throw 'Há erros no formulário'
        }
      }
    },
    beforeMount() {
      this.estadosOptions = strings.estados
      this.loadEmpresaIfExists()
    },
    mounted() {
      this.$v.$touch()
    }
  }
</script>
