import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      name: 'products',
      path: '/productos/:title/:id',
      component: () => import('../views/ProductView.vue')
    },
    {
      name: 'mis-coompras',
      path: '/mis-compras',
      component: () => import('../views/MyPurchasesView.vue')
    },
    {
      name: 'carrito',
      path: '/carrito',
      component: () => import('../views/ShoppingCartView.vue')
    }
  ]
})

export default router
