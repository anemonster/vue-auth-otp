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
      component: () =>
        import( /* webpackChunkName: "home" */ "./views/Home.vue"),
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