import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* router */
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import routes from './routes'
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/* router end*/

import store from './store'

router.beforeEach((to, from, next) => {
  if(!to.meta.middleware){
    return next();
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context
  })
});

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
