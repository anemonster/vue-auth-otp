import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Auth from "./helpers/Auth"

Vue.config.productionTip = false;
Vue.use(Auth)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.forVisitors)) {
    if (Vue.auth.isAuthenticated()) {
      next({
        path: "/home"
      })
    } else next()
  } else if (to.matched.some(record => record.meta.forUsers)) {
    if (!Vue.auth.isAuthenticated()) {
      next({
        path: "/login"
      })
    } else next()
  } else next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");