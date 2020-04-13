<template>
  <v-content>
    <slot name="navigation"></slot>
    <slot name="header"></slot>
    <!-- <page-breadcrumb></page-breadcrumb> -->
    <v-container mx-0 pa-0 fill-height fluid>
      <slot></slot>
    </v-container>
  </v-content>
</template>

<script>
export default {
}
</script>
