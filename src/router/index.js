import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Font',
    component: () => import('../views/Font.vue'),
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('../views/Font/Index.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/Font/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/Font/Product.vue'),
      },
      {
        name: 'Cart',
        path: 'cart',
        component: () => import('../views/Font/Cart.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Admin/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Admin/Orders.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),

  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
