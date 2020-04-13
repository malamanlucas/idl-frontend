import Vue from 'vue'
import VueTheMask, { mask } from 'vue-the-mask'
import { mapActions } from 'vuex'
import PageBase from './components/PageBase'
import CloseIcon from './components/CloseIcon'
import '@/core/filters'
import './core.scss'

Vue.directive(mask)

Vue.component('page-base', PageBase);
Vue.component('close-icon', CloseIcon);
Vue.use(VueTheMask)

Vue.mixin({
  methods: {
    ...mapActions('dashboard',
    ['showLoading', 'hideLoading', 'showErrorOnModal',
    'hideErrorOnModal', 'showErrorOnSnackbar', 'hideErrorOnSnackbar',
    'showSuccessOnSnackbar', 'hideSuccessOnSnackbar', 'hideAllMessages'])
  }
})
