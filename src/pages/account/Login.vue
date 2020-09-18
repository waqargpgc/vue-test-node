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

              <fg-input
                v-model="login.email"
                class="no-border input-lg"
                addon-left-icon="now-ui-icons ui-1_email-85"
                placeholder="Email..."
              ></fg-input>

              <fg-input
                v-model="login.password"
                type="password"
                class="no-border input-lg"
                addon-left-icon="now-ui-icons ui-1_lock-circle-open"
                placeholder="Password..."
              ></fg-input>

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
      fullPage: false,
      UserInfo: {},
    };
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    LoginUser() {
      let loader = this.$loading.show({
        container: this.fullPage,
        canCancel: false,
      });
      AccountService.loginUser(this.login).then((res) => {
        this.UserInfo = res.data;
        if (res.success) {
          loader.hide();
          localStorage.setItem("token", this.UserInfo.user.token);
          localStorage.setItem("_id", this.UserInfo.user._id);
          this.$toasted.global.my_messges();
          this.$router.push("/index");
          window.location.reload();
        } else {
          loader.hide();
          if (!res.message) {
            this.$toasted.global.my_messges();
          } else {
            this.$toasted.global.my_messges({ message: res.message });
          }
        }
      });
    },
  },
};
</script>
<style></style>
