import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/components/Landing';
import Pessoas from '@/components/Pessoas';

Vue.use(Router);
Vue.use(Pessoas);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/pessoas',
      name: 'Pessoas',
      component: Pessoas,
    },
  ],
});
