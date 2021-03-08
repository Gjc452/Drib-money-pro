import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Chart from '@/views/Chart.vue';
import Statistics from '@/views/Statistics.vue';
import User from '@/views/User.vue';
import NoteFound from '@/views/NoteFound.vue';
import News from '@/views/News.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path:'/chart',
    component:Chart
  },
  {
    path:'/statistics',
    component:Statistics
  },
  {
    path:'/user',
    component:User
  },
  {
    path:'/news',
    component:News
  },
  {
    path:'*',
    component:NoteFound

  }
];

const router = new VueRouter({
  routes
});

export default router;
