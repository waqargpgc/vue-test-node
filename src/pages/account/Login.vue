<template>
  <div class="vld-parent">
    <div class="page-header clear-filter" filter-color="orange">
      <div class="page-header-image" style="background-image: url('img/login.jpg')"></div>
      <div class="content">
        <div class="container">
          <div class="col-md-5 ml-auto mr-auto">
            <card type="login" plain>
              <div slot="header" class="logo-container">
                <img v-lazy="'img/now-logo.png'" alt />
              </div>
              <form @submit.prevent="LoginUser">
                <div>
                  <fg-input
                    v-model="login.email"
                    class="no-border input-lg"
                    addon-left-icon="now-ui-icons ui-1_email-85"
                    placeholder="Email..."
                  ></fg-input>
                  <small
                    class="text-danger"
                    v-if="(!$v.login.email.required || !$v.login.email.email) && $v.login.email.$dirty"
                  >Email is required</small>
                </div>

                <div>
                  <fg-input
                    v-model="login.password"
                    type="password"
                    class="no-border input-lg"
                    addon-left-icon="now-ui-icons ui-1_lock-circle-open"
                    placeholder="Password..."
                  ></fg-input>

                  <small
                    class="text-danger"
                    v-if="!$v.login.password.required && $v.login.password.$dirty"
                  >Password is required</small>
                  <small
                    class="text-danger"
                    v-if="!$v.login.password.minLength"
                  >Password must be greater then 5 chac</small>
                </div>
              </form>
              <template slot="raw-content">
                <div class="card-footer text-center">
                  <a
                    @click.prevent="LoginUser"
                    class="btn btn-primary btn-round btn-md btn-block"
                  >Get Started</a>
                </div>
                <div class="pull-left">
                  <router-link to="/signup">
                    <h6>
                      <a class="link footer-link">Create Account</a>
                    </h6>
                  </router-link>
                </div>
                <div class="pull-right">
                  <h6>
                    <a href="#pablo" class="link footer-link">Need Help?</a>
                  </h6>
                </div>
              </template>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from "@/components";
import AccountService from "./../../service/AccountService";
const { required, minLength, email } = require("vuelidate/lib/validators");
export default {
  name: "login-page",
  bodyClass: "login-page",
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      UserInfo: {},
    };
  },
  validations: {
    login: {
      password: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        email,
      },
    },
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    LoginUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let loader = this.$loading.show({
          canCancel: false,
        });
        AccountService.loginUser(this.login).then((res) => {
          loader.hide();
          this.UserInfo = res.data;
          if (res.success) {
            localStorage.setItem("token", this.UserInfo.user.token);
            localStorage.setItem("_id", this.UserInfo.user._id);
            this.$toasted.global.my_messges({ message: res.message });
            this.$router.push("/index");
            window.location.reload();
          } else {
            if (!res.message) {
              this.$toasted.global.my_messges();
            } else {
              this.$toasted.global.my_messges({ message: res.message });
            }
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.input-group, .form-group {
   margin-bottom: 10px !important;
}
small {
    font-size: 80%;
}
</style>
