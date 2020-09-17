<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax class="page-header-image" style="background-image:url('img/header.jpg')"></parallax>
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/now-logo.png" alt />
          <h1 class="h1-seo">
           <span v-if="!User.name">Now UI Kit.</span>
           <span v-if="User.name">{{User.name}}</span>
          </h1>
          <h3>
           <span v-if="!User.email">User Email   No@no.com.</span>
           <span v-if="User.email">User Email   {{User.email}}</span> 
          <div>
            <span v-if="!User.role">User Role  Nothing...</span>
           <span v-if="User.role">User Role   {{User.role}}</span>
           </div>
           <div>
            <span v-if="!User.createdAt">Joining Date   Soon.....</span>
           <span v-if="User.createdAt">Joining Date   {{User.createdAt | moment("DD/MM/YYYY")}}</span>
           </div>
          </h3>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="section section-images">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="hero-images-container">
                <img src="img/hero-image-1.png" alt />
              </div>
              <div class="hero-images-container-1">
                <img src="img/hero-image-2.png" alt />
              </div>
              <div class="hero-images-container-2">
                <img src="img/hero-image-3.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax } from "@/components";
import BasicElements from "./components/BasicElementsSection";
//import ComponentService from "./../service/ComponentService";
import AccountService from '../service/AccountService';
export default {
  name: "index",
  bodyClass: "index-page",
  components: {
    Parallax,
  },
  data() {
    return {
      User: {},
    };
  },
  mounted() {
    this.GetOneUser()
		},
  methods: {
    GetOneUser() {
      AccountService.oneUser().then((res) => {this.User = res.user;});
    },
  },
};
</script>
<style></style>
