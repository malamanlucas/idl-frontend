<template>
  <v-layout column>
    <v-flex mb-3>
      <div class="subtitle-1" color="primary">
        {{ title }}
      </div>
    </v-flex>
    <v-flex>
      <v-data-iterator
        :items="items" disable-pagination hide-default-footer>

        <template #no-data>
          <div class="fixHeightAndScroll">
            <v-alert type="error">Não há {{ title }}</v-alert>
          </div>
        </template>

        <template #default="{ items }">
          <v-layout column class="fixHeightAndScroll">
            <v-flex shrink mb-1 v-for="item in items" :key="item.value">
              <v-card dark :disabled="item.disabled" height="40">
                <v-layout row wrap pa-0 px-2 ma-0 justify-space-between align-center fill-height>
                  <v-flex shrink class="text-truncate" xs8 sm10>
                    {{ item.label }}.
                  </v-flex>
                  <v-flex shrink>
                    <v-btn class="text-none"  v-if="!item.disabled" icon @click="remove(item)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-btn class="text-none"  v-else icon>
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
      </v-data-iterator>

      <v-layout justify-center mt-4>
        <v-btn class="text-none"  link color="primary" :loading="loading" :disabled="loading" @click="showModalAdder = true">
          <template #loader>
            <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
            Carregando {{ title }}...
          </template>
          <v-icon left>mdi-plus-circle</v-icon>
          {{ buttonLabel }}
        </v-btn>
      </v-layout>
    </v-flex>

    <items-adder-modal @on-items-change="$emit('on-items-change', arguments[0])"
      :allItems="allItems" :items="items" v-model="showModalAdder" :title="title" />

  </v-layout>
</template>

<style lang="scss">
  .fixHeightAndScroll {
    height: 200px;
    overflow-y: auto;
  }
</style>

<script>
  import ItemsAdderModal from '@/module/Empresa/EmpresaItem/Form/ItemsAdderModal'

  export default {
    props: ['title', 'items', 'buttonLabel', 'loading', 'allItems'],
    data: () => ({
      showModalAdder: false
    }),
    components: {
      ItemsAdderModal
    },
    methods: {
      remove(itemToDelete) {
        this.$delete(this.items, this.items.findIndex(item => item.value === itemToDelete.value))
      }
    }
  }
</script>
