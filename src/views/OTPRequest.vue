<template>
  <div class="container">
    <div class="row pt-5 mt-5">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors.message !== ''">
              <div v-for="message in errors.message">{{ message }}</div>
            </div>
            <form action method="post" v-on:keyup.enter.prevent="verifyOTP()">
              <div class="row mt-5">
                <div class="col-lg-3">
                  <input
                    v-model="form.otp.otp1"
                    name="otp1"
                    ref="otp1"
                    type="text"
                    class="form-control text-center"
                    size="1"
                    maxlength="1"
                    v-on:keyup.capture.prevent="filled()"
                  />
                </div>
                <div class="col-lg-3">
                  <input
                    v-model="form.otp.otp2"
                    name="otp2"
                    ref="otp2"
                    type="text"
                    class="form-control text-center"
                    size="1"
                    maxlength="1"
                    v-on:keyup.capture.prevent="filled()"
                  />
                </div>
                <div class="col-lg-3">
                  <input
                    v-model="form.otp.otp3"
                    name="otp3"
                    ref="otp3"
                    type="text"
                    class="form-control text-center"
                    size="1"
                    maxlength="1"
                    v-on:keyup.capture.prevent="filled()"
                  />
                </div>
                <div class="col-lg-3">
                  <input
                    v-model="form.otp.otp4"
                    name="otp4"
                    ref="otp4"
                    type="text"
                    class="form-control text-center"
                    size="1"
                    maxlength="1"
                    v-on:keyup.capture.prevent="filled()"
                  />
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-3"></div>
                <div class="col-6">
                  <button
                    type="button"
                    class="btn btn-primary btn-block"
                    @click="verifyOTP()"
                  >Verifikasi</button>
                </div>
                <div class="col-3"></div>
              </div>
              <div class="row mt-2">
                <div class="col-lg-12">
                  <div class="mt-3 text-center">
                    <router-link v-on:click.native="getOTP" to>Kirim Ulang Kode Verifikasi</router-link>
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
        user_id: "",
        otp: {
          otp1: "",
          otp2: "",
          otp3: "",
          otp4: ""
        }
      })
    };
  },
  methods: {
    filled() {
      this.form.otp.otp1 !== "" &&
      this.form.otp.otp2 !== "" &&
      this.form.otp.otp3 !== "" &&
      this.form.otp.otp4 !== ""
        ? this.verifyOTP()
        : "";
    },
    getOTP() {
      this.errors.message = "";

      let phone = this.$route.query.phone;
      const data = new FormData();
      data.append("phone", phone);
      axios({
        url: "http://localhost:8080/api/v1/register/otp/request",
        method: "post",
        data
      })
        .then(response => {
          if (response.status === 201) {
            this.form.user_id = response.data.data.user.id;
          }
        })
        .catch(error => {
          this.errors.message = error.response.data.error.errors;
        });
    },
    verifyOTP() {
      this.errors.message = "";
      const data = new FormData();
      let otpCode =
        this.form.otp.otp1 +
        this.form.otp.otp2 +
        this.form.otp.otp3 +
        this.form.otp.otp4;
      this.getOTP();
      data.append("user_id", this.form.user_id);
      data.append("otp_code", otpCode);

      axios({
        url: "http://localhost:8080/api/v1/register/otp/match",
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
          }
        })
        .catch(error => {
          this.errors.message = error.response.data.error.errors;
        });
    }
  }
};
</script>