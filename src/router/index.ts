import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Chart from '@/views/Chart.vue';
import Statistics from '@/views/Statistics.vue';
import NoteFound from '@/views/NoteFound.vue';
import SetTags from '@/views/SetTags.vue';
import CustomTag from '@/views/CustomTag.vue';
import EditRecord from '@/views/EditRecord.vue';

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
    path: '/money/setTags/customTag',
    component: CustomTag
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
    path: '/statistics/edit/:id',
    component: EditRecord
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
