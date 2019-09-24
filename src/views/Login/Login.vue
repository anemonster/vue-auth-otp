<template>
  <div class="container">
    <div class="row pt-5 mt-5">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body login-card-body">
            <p class="login-box-msg">
              <b>Login</b>
            </p>
            <div class="alert alert-danger" role="alert" v-if="errors.message !== ''">
              <div v-for="message in errors.message">{{ message }}</div>
            </div>
            <form action method="post" v-on:keyup.enter.prevent="login()">
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
              <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                  <button type="button" class="btn btn-primary btn-block" @click="login()">Login</button>
                </div>
                <div class="col-3"></div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="mt-3 text-center">
                    Belum memiliki Akun?
                    <router-link to="/register">Register Sekarang</router-link>
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
import Swal from "sweetalert2";
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
        password: ""
      })
    };
  },
  methods: {
    getCredentials(access_token) {
      let token = access_token;
      axios({
        url: "http://localhost:8080/api/v1/oauth/credentials",
        method: "get",
        params: {
          access_token: token
        }
      }).then(response => {
        console.log(response.data);
      });
    },

    login() {
      const data = new FormData();
      data.append("phone", this.form.username);
      data.append("password", this.form.password);
      data.append("latlong", 1);
      data.append("device_token", 1);
      data.append("device_type", 1);

      axios({
        url: "http://localhost:8080/api/v1/oauth/sign_in",
        method: "post",
        data
      })
        .then(response => {
          if (response.status === 201) {
            const token_expiration = moment().unix() + 7200;
            this.$auth.setToken(
              response.data.data.user.access_token,
              token_expiration
            );
            this.$router.push("/home");
            Swal.fire({
              position: "top-end",
              type: "success",
              title: "Login success",
              showConfirmButton: false,
              timer: 1500
            });
            // this.getCredentials(response.data.data.user.access_token);
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
