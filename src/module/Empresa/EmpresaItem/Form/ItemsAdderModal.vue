<template>
  <v-dialog retain-focus  :value="value" @input="$emit('input', arguments[0])" max-width="900"
    @keydown.esc="cancelEdit" @click:outside="cancelEdit"
    persistent no-click-animation internal-activator>
    <v-card>
      <v-container pa-5 pb-0>
        <div>Manutenção dos {{ title }}</div>

        <v-layout row wrap justify-start mx-auto px-3 align-center>
          <v-flex shrink xs12 sm4 md4 lg3 xl2 v-for="item in allItems"
            :mx-10="$vuetify.breakpoint.smAndDown" :key="item.value" :disabled="item.disabled">
            <v-checkbox v-model="selecteds" :label="item.label" :value="item"
               :value-comparator="valueComparator" :disabled="isDisabled(item.value)"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-layout justify-center pb-5>
          <v-btn class="text-none"  @click="cancelEdit" color="info">
            SAIR
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
  .force-center-checkbox {
    justify-content: center;
  }
</style>

<script>
  import { cloneDeep, get } from 'lodash'

  export default {
    props: ['value', 'allItems', 'title', 'items'],
    computed: {
      selecteds: {
        get() {
          return this.items
        },
        set(items) {
          this.$emit('on-items-change', items)
        }
      }
    },
    methods: {
      deactive() {
        this.$emit('input', false)
      },
      cancelEdit() {
        this.deactive()
      },
      valueComparator(a, b) {
        return a.value === b.value
      },
      isDisabled(value) {
        return get(this.selecteds.find(e => e.value === value), 'disabled', false)
      }
    },
    mounted() {
      this.newItems = cloneDeep(this.items)
    }
  }
</script>
