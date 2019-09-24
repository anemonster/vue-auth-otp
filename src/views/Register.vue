<template>
  <div class="container">
    <div class="row pt-5 mt-5">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <p>
              <b>Register</b>
            </p>
            <div class="alert alert-danger" role="alert" v-if="errors.message !== ''">
              <div v-for="message in errors.message">{{ message }}</div>
            </div>
            <form action method="post" v-on:keyup.enter.prevent="register()">
              <div class="form-group has-feedback">
                <input
                  v-model="form.username"
                  type="text"
                  name="username"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('username') }"
                  placeholder="No hp"
                />
              </div>
              <div class="form-group has-feedback">
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                  placeholder="Password"
                />
              </div>
              <div class="form-group has-feedback">
                <input
                  v-model="form.country"
                  type="text"
                  name="country"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('country') }"
                  placeholder="country"
                />
              </div>
              <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                  <button
                    type="button"
                    class="btn btn-primary btn-block"
                    @click="register()"
                  >Register</button>
                </div>
                <div class="col-3"></div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="mt-3 text-center">
                    Sudah memiliki Akun?
                    <router-link to="/login">Login Sekarang</router-link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Form from "vform";
import moment from "moment";
import bootstrap from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(bootstrap);

export default {
  data() {
    return {
      errors: {
        message: ""
      },
      form: new Form({
        username: "",
        password: "",
        country: ""
      })
    };
  },
  methods: {
    register() {
      const data = new FormData();
      data.append("phone", this.form.username);
      data.append("password", this.form.password);
      data.append("country", this.form.country);
      data.append("latlong", 1);
      data.append("device_token", 1);
      data.append("device_type", 1);
      console.log(data);

      axios({
        url: "http://localhost:8080/api/v1/register",
        method: "post",
        data
      })
        .then(response => {
          if (response.status === 201) {
            this.registerData = response.data.data.user;
            const token_expiration = moment().unix() + 7200;
            this.$auth.setToken(
              response.data.data.user.access_token,
              token_expiration
            );
          }
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors.message = error.response.data.error.errors;
          }
        });
    }
  }
};
</script>
