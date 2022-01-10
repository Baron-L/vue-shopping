// 引入路由组件
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import Shopcart from "@/pages/ShopCart";
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
      isShow: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isShow: false,
    },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    meta: {
      isShow: true,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isShow: false,
    },
  },
  {
    path: "/detail/:skuId",
    component: Detail,
    meta: {
      isShow: true,
    },
  },
  {
    path: "/addCartSuccess",
    name: "addCartSuccess",
    component: AddCartSuccess,
    meta: {
      isShow: true,
    },
  },
  {
    path: "/shopcart",
    component: Shopcart,
  },
];
