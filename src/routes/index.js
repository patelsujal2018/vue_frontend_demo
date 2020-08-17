import Frontend from '../layouts/Frontend.vue';
import isjwtlogin from '../middlewares/isjwtlogin';

const routes = [
  {
    path: '/',
    component: Frontend,
    children:[
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: {
          middleware: [isjwtlogin],
        }
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
        meta: {
          middleware: [isjwtlogin],
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
          middleware: [isjwtlogin],
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  }
]

export default routes
