import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Icon from '@/components/common/Icon.vue';
import Nav from '@/components/common/Nav.vue';
import Layout from '@/components/common/Layout.vue';
import 'vue-ydui/dist/ydui.rem.css';
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';

Vue.component(DateTime.name, DateTime);
Vue.config.productionTip = false;
Vue.component('Icon', Icon);
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
