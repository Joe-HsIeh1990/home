import Vue from 'vue'
import Vuex from 'vuex'

import ProductsModules from './ProductsModules';
import AdminMemberModules from './AdminMemberModules';
import CardModules from './CardModules';
import HomeModules from './HomeModules';
import AlertModules from './AlertModules';
import OrderModules from './OrderModules';
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
  },
  mutations: {
    ISLOADING(state, status) {
      state.isLoading = status;
    },
  },
  actions: {
  },
  getters: {
    isLoading: state => state.isLoading,
  },
  modules: {
    ProductsModules,
    AdminMemberModules,
    CardModules,
    HomeModules,
    AlertModules,
    OrderModules

  }
})
