<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/index">
        Now Ui Kit
      </router-link>
    </template>
    <template slot="navbar-menu">
      <!-- <drop-down
        tag="li"
        title="Components"
        icon="now-ui-icons design_app"
        class="nav-item"
      >
      </drop-down> -->
       <li class="nav-item">
          <router-link class="nav-link" to="/books">
          <i class="now-ui-icons arrows-1_cloud-download-93"></i>
          <p>Books</p>
         </router-link>
      </li>
       <li class="nav-item">
          <router-link class="nav-link" to="/teachers">
          <i class="now-ui-icons arrows-1_cloud-download-93"></i>
          <p>Teachers</p>
         </router-link>
      </li>
      <li class="nav-item" @click="logOut()">
          <router-link class="nav-link" to="/teachers">
          <i class="now-ui-icons ui-1_lock-circle-open"></i>
          <p>Teachers</p>
         </router-link>
      </li>
      <!-- <drop-down
              tag="li"
              title="Examples"
              icon="now-ui-icons design_image"
              class="nav-item"
      >
        <nav-link to="/landing">
          <i class="now-ui-icons education_paper"></i> Landing
        </nav-link>
        <nav-link to="/login">
          <i class="now-ui-icons users_circle-08"></i> Login
        </nav-link>
        <nav-link to="/profile">
          <i class="now-ui-icons users_single-02"></i> Profile
        </nav-link>
      </drop-down> -->
    </template>
  </navbar>
</template>

<script>
import { Navbar } from '@/components';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    Navbar,
    [Popover.name]: Popover
  },
  methods:{
    logOut(){
      localStorage.clear();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped></style>
