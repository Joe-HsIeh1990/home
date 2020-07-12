import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/custom',
    name: 'Dashboard',
    component: () => import('../components/Dashboard'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Products')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/Login')
      },
      {
        path: 'detail/:id',
        name: 'Detail',
        component: () => import(`../views/ProductDetail`)
      },
      {
        path: 'customcart',
        name: 'CustomCart',
        component: () => import('../views/CustomCart')
      },
      {
        path: 'customorder',
        name: 'CustomOrder',
        component: () => import('../views/CustomOrder')
      },
      {
        path: 'custompay/:orderId',
        name: 'CustomPay',
        component: () => import('../views/CustomPay')
      },
      {
        path: 'customcomplete/:orderId',
        name: 'CustomComplete',
        component: () => import('../views/CustomComplete')
      }
    ]
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../components/back/AdminDashboard'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'adminproduct',
        name: 'AdminProduct',
        component: () => import('../views/back/AdminProduct'),
        meta: { requiresAuth: true }
      },
      {
        path: 'admincoupones',
        name: 'AdminCoupones',
        component:() => import('../views/back/AdminCoupones'), 
        meta: { requiresAuth: true }
      },
      {
        path: 'adminorder',
        name: 'AdminOrder',
        component: () => import('../views/back/AdminOrder'),
        meta: { requiresAuth: true }
      }
    ]
  }
]


const router = new VueRouter({
  routes
})

export default router
