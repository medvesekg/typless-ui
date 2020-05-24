import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DocumentType from '../views/DocumentType'
import Training from '../views/Training'
import Test from '../views/Test'
import Store from '@/store'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/document-types/:id',
    name: 'DocumentType',
    component: DocumentType,
    props: true
  },
  {
    path: '/training',
    name: 'Training',
    component: Training,
  },
  {
    path: '/extract',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  Store.commit('SET_ERROR_MESSAGE', null)
  next()
})

export default router
