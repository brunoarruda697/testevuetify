import Vue from 'vue';
import Router from 'vue-router';
import People from '@/components/People';

Vue.use(Router);
Vue.use(People);

export default new Router({
  routes: [
    {
      path: '/people',
      name: 'people',
      component: People,
    },
  ],
});
