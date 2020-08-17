import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth';
import userModule from './modules/users';
import productModule from './modules/products';
import productCategoryModule from './modules/product_categories';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth:authModule,
    users:userModule,
    products:productModule,
    product_category:productCategoryModule,
  }
})
