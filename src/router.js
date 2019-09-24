import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      alias: "/home",
      name: "home",
      meta: {
        forUsers: true
      },
      component: () =>
        import( /* webpackChunkName: "home" */ "./views/Home.vue"),
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
      path: "/register",
      name: "register",
      meta: {
        forVisitors: true
      },
      component: () =>
        import( /* webpackChunkName: "register" */ "./views/Register.vue")
    }
  ]
});

export default router