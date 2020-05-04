<template>
  <v-navigation-drawer
      right permanent
      :mini-variant="true"
      mini-variant-width="80"
      app
    >
      <v-list>
        <v-list-item class="pa-0 ma-0 override pointer"
          v-for="versao in versionsCompare"
          :key="versao.id" ripple
        >
          <v-tooltip left close-delay="500">
            <template #activator="{ on }">
              <div class="px-2" v-on="on">
                {{ versao.abreviacao }}
              </div>
            </template>
            <span>
              {{ versao.nome }}
            </span>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<style lang="scss">
  .v-navigation-drawer--mini-variant {
    .v-list-item {
      &.override {
        justify-content: start;
      }
    }
  }
</style>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'PageNavigation',
    props: ['value'],
    computed: {
      ...mapGetters('sentenca', ['mainVersion', 'versionsCompare']),
      iconToggleCollapse() {
        return this.isCollapsed ? 'mdi-arrow-right' : 'mdi-arrow-left'
      }
    }
  }
</script>
