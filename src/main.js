/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import VueMoment from 'vue-moment'
import { BootstrapVue } from 'bootstrap-vue';
import Toasted from 'vue-toasted';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

let option = {
    theme: "bubble", 
    position: "top-center", 
    duration : 5000
}
Vue.use(Toasted,option);

Vue.toasted.register('my_messges',
    (payload) => {
        // if there is no message passed show default message
        if(! payload.message) {
    	    return "Oops.. Something Went Wrong.."
        }
        // if there is a message show it with the message
        return "Oops.. " + payload.message;
    },
);

Vue.config.productionTip = false;
Vue.use(VueMoment)
Vue.use(BootstrapVue)
Vue.use(NowUiKit);
Vue.use(Loading);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
