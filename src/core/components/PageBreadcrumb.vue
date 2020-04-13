<template>
  <div>
    <v-breadcrumbs class="mt-5 ml-5" :items="items" :large="small" :divider="divider">
      <template v-if="customDiv" v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
      divider: '/',
      dividers: ['/', '\\', '.', ';', '>', '-'],
      large: false,
      customDiv: true,
    }),
  }
</script>
