// 引入路由组件
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'

// 所有路由配置信息
export default [
  // 路由重定向
  {
      path: "/",
      redirect: "/home",
  },
  {
      path: "/home",
      component: Home,
      meta: {
          isShow: true
      }
  },
  {
      path: "/login",
      component: Login,
      meta: {
          isShow: false
      }
  },
  {   
      name: 'search',
      path: "/search/:keyword?",
      component: Search,
      meta: {
          isShow: true
      }
  },
  {
      path: "/register",
      component: Register,
      meta: {
          isShow: false
      }
  },
  {
      path: "/detail/:skuid",
      component: Detail,
      meta: {
          isShow: true
      }
  },
]