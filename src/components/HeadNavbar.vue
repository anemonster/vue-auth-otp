<template>
  <b-container class="header clearfix">
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="/">
        <img
          width="30px"
          height="30px;"
          src="../assets/logo.png"
          class="d-inline-block align-top"
          alt="Kitten"
        />
        VueApp
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>User&nbsp;</template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </b-container>
</template>

<script>
import Vue from "vue";
import bootstrap from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(bootstrap);

export default {
  name: "HeadNavbar"
};
</script>

<style scoped>
</style>
