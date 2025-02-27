import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import Books from './pages/Books.vue';
import Teachers from './pages/Teachers.vue';
import Landing from './pages/Landing.vue';
import Login from './pages/account/Login.vue';
import SignupForm from './pages/account/SignupForm.vue';
import Profile from './pages/Profile.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';
Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/login',
      name: 'login',
      components: { default: Login },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/',
      name: 'login',
      components: { default: Login },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      components: { default: SignupForm },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/index',
      name: 'index',
      beforeEnter: guardMyroute,
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/books',
      name: 'books',
      beforeEnter: guardMyroute,
      components: { default: Books, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/teachers',
      name: 'teachers',
      beforeEnter: guardMyroute,
      components: { default: Teachers, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/landing',
      name: 'landing',
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('token') && localStorage.getItem('_id')) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    next(true)
  }
  else {
    next(false);
  }
}
