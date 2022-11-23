import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/ticket'
  },
  {
    path: '/folder/request',
    component: () => import ('../views/SubmitRequestPage.vue')
  },
  {
    path: '/folder/ticket',
    component: () => import ('../views/ActiveTicketPage.vue')
  },
  {
    path: '/folder/allrequest',
    component: () => import ('../views/AllRequestPage.vue')
  },
  {
    path: '/folder/all',
    component: () => import ('../views/AllTicketPage.vue')
  },
  {
    path: '/folder/test',
    component: () => import ('../views/TestPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
