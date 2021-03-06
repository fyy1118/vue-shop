import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

// 为路由对象添加beforeEach导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录页，直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage中获取保存到的token值
  const toTokenStr = window.sessionStorage.getItem('token')
  // 没有token值 强制跳转到登录页
  if (!toTokenStr) return next('/login')
  next()
})

export default router
