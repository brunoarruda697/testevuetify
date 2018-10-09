import Vue from 'vue';
import Router from 'vue-router';
import Pessoas from '@/components/Pessoas';

Vue.use(Router);
Vue.use(Pessoas);

export default new Router({
  routes: [
    {
      path: '/pessoas',
      name: 'Pessoas',
      component: Pessoas,
    },
  ],
});
