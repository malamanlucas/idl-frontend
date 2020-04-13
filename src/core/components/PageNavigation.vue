<template>
  <div>
    <v-navigation-drawer
        :value="value"
        @input="$emit('input', arguments[0])"
        app
        clipped
        :mini-variant="isCollapsed"
        >
        <v-list nav flat>
          <v-list-item-group
          active-class="blue--text text--accent-4"
          >
            <v-list-item
            active-class="blue--text text--accent-4"
              :to="{ name: item.routeName }"
              v-for="item in items"
              :key="item.title"
              link>
              <v-list-item-icon>
                <v-btn class="text-none mr-2 ml-2" icon color="blue" >
                  <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="body-3">{{ item.title }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
          <v-btn
            absolute
            bottom
            class="mr-2 ml-2 text-none"
            icon
            right
            color="blue-grey lighten-3"
            @click="isCollapsed = !isCollapsed">
            <v-icon>{{ iconToggleCollapse }}</v-icon>
          </v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'PageNavigation',
  props: ['value'],
  data: () => ({
    isCollapsed: false,
    colors: [
      'primary',
      'warning',
      'info',
      'red',
      'teal',
    ],
    items: [
      { title: 'Administrador', icon: 'mdi-apps', routeName: 'admin' },
      { title: 'Dashboard', icon: 'mdi-apps', routeName: 'dashboard' },
      { title: 'Funcionários', icon: 'mdi-account-multiple', routeName: 'funcionario' },
      { title: 'Minhas Empresas', icon: 'mdi-store', routeName: 'empresa' },
      { title: 'Relatórios', icon: 'mdi-chart-bar', routeName: 'report' }
    ]
  }),
  computed: {
    iconToggleCollapse() {
      return this.isCollapsed ? 'mdi-arrow-right' : 'mdi-arrow-left'
    }
  }
}
</script>
