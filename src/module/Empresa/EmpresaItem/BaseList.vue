<template>
  <v-flex>
    <v-data-table item-key="id" :items-per-page="itemsPerPage"
      :page.sync="page" @page-count="pageCount = $event"
      :headers="headers" :items="itemsFiltered" hide-default-footer>

      <template #header.name="{ header }">
        <slot name="headerName">{{ header.text }}</slot>
      </template>

      <template #no-data>
        <v-alert prominent type="error">
          #no-data Hugo modifique essa mensagem fazendo favor.
        </v-alert>
      </template>

      <template #no-results>
        #no-data Hugo modifique essa mensagem fazendo favor.
      </template>

      <template #item.status="{ item }">
        <v-chip :color="item.status === 1 ? 'primary': 'warning'">
          {{ item.status === 1 ? 'Ativada': 'Desativada' }}
        </v-chip>
      </template>

      <template #item.editar="{ item }">
        <v-btn class="text-none"  color="primary" @click="$emit('on-edit', item.id)">Editar</v-btn>
      </template>

    </v-data-table>

    <v-layout justify-end mt-5>
      <v-flex>
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="totalVisible"
          circle
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
  import empresaItemMixin from '@/module/Empresa/EmpresaItem/empresa-item-mixin'

  export default {
    mixins: [empresaItemMixin],
    data: () => ({
      headers: [
        { text: 'Undefined', value: 'name' },
        { text: 'SITUAÇÃO', value: 'status' },
        { text: 'EDITAR', value: 'editar', sortable: false }
      ],
      itemsPerPage: 4,
      totalVisible: 7,
      pageCount: 0,
      page: 1
    }),
    computed: {
      itemsFiltered() {
        return this.$store.getters[`${this.module}/itemsFiltered`]
      }
    }
  }
</script>
