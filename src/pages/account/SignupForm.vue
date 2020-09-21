<template>
  <div
    class="section section-signup"
    style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;"
  >
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up">Sign Up</h3>
            <div class="social-line">
              <a href="#pablo" class="btn btn-neutral btn-facebook btn-icon btn-round">
                <i class="fab fa-facebook-square"></i>
              </a>
              <a href="#pablo" class="btn btn-neutral btn-twitter btn-icon btn-lg btn-round">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#pablo" class="btn btn-neutral btn-google btn-icon btn-round">
                <i class="fab fa-google-plus"></i>
              </a>
            </div>
          </template>
          <template>
            <div>
               <small class="text-center"
                v-if="!$v.user.name.required && $v.user.name.$dirty"
              >Name is required</small>
              <fg-input
                v-model="user.name"
                class="no-border"
                placeholder="Name..."
                addon-left-icon="now-ui-icons users_circle-08"
              ></fg-input>
            </div>
            <div>
              <small class="text-center"
                v-if="(!$v.user.email.required || !$v.user.email.email) && $v.user.email.$dirty"
              >Email is required</small>
                <fg-input
                  v-model="user.email"
                  class="no-border"
                  placeholder="Email"
                  addon-left-icon="now-ui-icons ui-1_email-85"
                ></fg-input>
            </div>

            <div class="form-group no-border input-group">
               <small class="text-center"
                v-if="!$v.user.role.required && $v.user.role.$dirty"
              >Role is required</small>
              <div class="input-group">
                <div class="input-group-prepend">
                  <i class="input-group-text now-ui-icons users_circle-08"></i>
                </div>
                <select
                  aria-describedby="addon-right addon-left"
                  placeholder="Name..."
                  class="form-control"
                  v-model="user.role"
                >
                  <option disabled value>Please select role</option>
                  <option>admin</option>
                  <option>other</option>
                </select>
              </div>
            </div>
            <div>
               <small class="text-center"
                    v-if="!$v.user.password.required && $v.user.password.$dirty"
                  >Password is required</small>
                  <small class="text-center"
                    v-if="!$v.user.password.minLength"
                  >Password must be greater then 5 chac</small>
              <fg-input
                v-model="user.password"
                type="password"
                class="no-border"
                placeholder="Password..."
                addon-left-icon="now-ui-icons ui-1_lock-circle-open"
              ></fg-input>
                </div>
          </template>
          <div class="card-footer text-center">
            <n-button @click.prevent="SignUpUser" type="neutral" round size="md">Get Started</n-button>
          </div>
          <div class="card-footer pb-4">
            <div class="pull-left">
              <router-link to="/">
                <a class="link footer-link">Login</a>
              </router-link>
            </div>
            <div class="pull-right">
              <a href="#pablo" class="link footer-link">Need Help?</a>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, FormGroupInput, Button } from "@/components";
import AccountService from "./../../service/AccountService";
const { required, minLength, email } = require("vuelidate/lib/validators");
export default {
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        repassword: "",
        role: "",
      },
      UserInfo: {},
    };
  },
  validations: {
    user: {
      name: {
        required,
      },
      role: {
        required,
      },
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
  methods: {
    SignUpUser() {
       this.$v.$touch();
      if (!this.$v.$invalid) {
      let loader = this.$loading.show({
        canCancel: false,
      });
      AccountService.signUpUser(this.user).then((res) => {
        loader.hide();
        if (res.success) {
          this.$toasted.global.my_messges({ message: res.message });
          this.$router.push("/");
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
select option {
  color: black !important;
}
small {
    font-size: 80%;
}
</style>
