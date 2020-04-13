<template>
  <v-menu offset-y :close-on-content-click="closeOnClick">
    <template v-slot:activator="{ on }">
      <span class="activator column-header" v-on="on">{{ text }}</span>
    </template>
    <v-list>
      <v-list-item-group
        v-model="selected"
        multiple
      >
        <v-list-item @click="closeOnClick = false" v-for="item in items" :key="item.id">
          <template v-slot:default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                v-model="active"
                color="primary"
                @click="toggle"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
      <v-list-item>
        <v-btn @click="apply" block color="primary" dark>
          <v-icon left>mdi-filter-plus</v-icon>
          Filtrar
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { isEmpty } from 'lodash'
import { mapMutations, mapGetters } from 'vuex';
import { SET_FILTROS } from '@/store/modules/funcionario'

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    column: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    selected: [],
    closeOnClick: false
  }),
  computed: {
    ...mapGetters('funcionario', ['filtros'])
  },
  methods: {
    ...mapMutations('funcionario', {
      setFiltros: SET_FILTROS
    }),
    apply() {
      this.closeOnClick = true
      this.setFiltros({ column: this.column, value: this.selected })
      this.$emit('on-reload')
    },
    selectedFilters() {
      if (!isEmpty(this.filtros)) {
        const filtro = this.filtros.find(f => f.column === this.column)
        this.selected = filtro.value
      }
    }
  },
  mounted() {
    this.selectedFilters()
  }
};
</script>
