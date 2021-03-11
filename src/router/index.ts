import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Chart from '@/views/Chart.vue';
import Statistics from '@/views/Statistics.vue';
import User from '@/views/User.vue';
import NoteFound from '@/views/NoteFound.vue';
import News from '@/views/News.vue';
import SetTags from '@/views/SetTags.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/statistics'
  },
  {
    path: '/money',
    component: Money,
  },
  {
    path: '/money/setTags',
    component: SetTags
  },
  {
    path: '/chart',
    component: Chart
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/news',
    component: News
  },
  {
    path: '*',
    component: NoteFound

  }
];

const router = new VueRouter({
  routes
});

export default router;
