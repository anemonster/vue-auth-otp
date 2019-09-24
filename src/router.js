import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: Home,
      meta: {
        forUsers: true
      }
    },
    {
      path: "/login",
      name: "login",
      meta: {
        forVisitors: true
      },
      component: () =>
        import( /* webpackChunkName: "login" */ "./views/Login/Login.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

export default router