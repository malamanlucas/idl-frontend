<template>
  <v-container>
    <v-autocomplete
      outlined
      :value="filtros"
      @input="addFiltros"
      :items="items"
      chips
      multiple
      return-object
      hide-selected
      hide-no-data
      hide-details
      dense
      ref="autocomplete__search"
      item-value="column"
      prepend-icon="mdi-database-search"
      label="Adicionar um Filtro"
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          {{ `${data.item.text}${findValue(data.item.column)}` }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <v-list-item-content @click="onSelect(data.item)">{{ data.item.text }}</v-list-item-content>
      </template>
    </v-autocomplete>
    <v-dialog persistent v-model="dialog" max-width="250">
      <form @submit.prevent="submit">
        <v-card>
          <v-card-title class="headline FuncionarioListSearch__card">
            <span>{{ selected.text }}</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeModal">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              required
              label="Começa com"
              v-model="search"
              @input="$v.search.$touch()"
              @blur="$v.search.$touch()"
              :error-messages="searchErrors"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit" color="primary" text>APLICAR</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { SET_FILTROS } from '@/store/modules/funcionario'

export default {
  mixins: [validationMixin],
  data: () => ({
    selected: {},
    dialog: false,
    search: '',
    items: [{ text: 'Nome', column: 'nome' }, { text: 'Empresa', column: 'empresa' }]
  }),
  validations: {
    search: { required }
  },
  computed: {
    ...mapGetters('funcionario', ['filtros']),
    searchErrors() {
      const errors = []
      if (!this.$v.search.$dirty) return errors
      !this.$v.search.required && errors.push('Campo Obrigatório')
      return errors
    }
  },
  methods: {
    ...mapMutations('funcionario', {
      setFiltros: SET_FILTROS
    }),
    ...mapActions('funcionario', ['buscaFuncionarios']),
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.$v.$reset()

      const filtros = this.filtros.map((filtro) => {
        if (filtro.column === this.selected.column) {
          return { ...this.selected, value: this.search }
        }
        return filtro
      })
      this.dialog = false
      this.search = ''
      this.setFiltros(filtros)
      this.buscaFuncionarios()
    },
    closeModal() {
      const filtros = [...this.filtros]
      filtros.pop()
      this.setFiltros(filtros)

      this.selected = {}
      this.dialog = false
    },
    findValue(column) {
      const filtro = this.filtros.find(filtro => filtro.column === column)

      if (filtro.value) {
        return `: "${filtro.value}"`
      }

      return ''
    },
    onSelect(selected) {
      this.$refs.autocomplete__search.blur()
      this.selected = selected
      this.dialog = true
    },
    addFiltros(filtros) {
      this.setFiltros(filtros)
    },
    remove(item) {
      const filtros = this.filtros.filter(filtro => filtro.column !== item.column)
      this.setFiltros(filtros)
      this.buscaFuncionarios()
    }
  }
};
</script>

<style scoped>
.FuncionarioListSearch__card {
  background-color: #006bf2;
}

.FuncionarioListSearch__card span {
  color: #FFF;
}
</style>
