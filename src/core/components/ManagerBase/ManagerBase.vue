<template>
  <v-container fluid class="transparent">
    <slot name="modals"></slot>
    <v-row justify="space-between" no-gutters
      :class="{'my-3': $vuetify.breakpoint.smAndUp, 'mt-3': $vuetify.breakpoint.xsOnly}">
      <v-col cols="12" sm="10" md="8" lg="auto"
        :class="{'mb-3': $vuetify.breakpoint.xsOnly}">
        <v-row no-gutters>
          <v-col cols="12" sm="7" md="auto" class="mr-1 pt-1" order="2" order-sm="1">
            <slot name="textSearch"></slot>
          </v-col>
          <v-col cols="5" sm="4" md="4" order="1" order-sm="2">
             <!-- Filtro -->
            <slot name="filtroActions"></slot>
             <!-- Filtro -->
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="auto" class="text-right" align-self="start">
        <v-row no-gutters align="center"
          justify="end" justify-sm="space-between" class="mb-4">

          <v-col cols="auto">

            <v-tooltip left :disabled="$vuetify.breakpoint.xsOnly">
              <template v-slot:activator="{ on }">
                <v-fab-transition>
                  <v-btn class="text-none"  color="primary" dark fab
                    medium v-on="on" @click="$emit('on-click-add')">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-fab-transition>
              </template>
              <span class="tooltip-default">
                <slot name="labelTooltipAdd">
                  Adicionar uma nova empresa
                </slot>
              </span>
            </v-tooltip>

          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters class="ma-0 pa-0">
      <v-col>
        <v-lazy :min-height="200" transition="fade-transition" :options="{ threshold: .5 }">
          <slot name="list"></slot>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {

  }
</script>
