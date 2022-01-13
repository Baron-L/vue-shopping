// 引入路由组件
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import Shopcart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
// 二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
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
  {
    path: "/trade",
    component: Trade,
    /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/shopcart") {
        next();
      } else {
        // 其他情况，停留在当前路由
        next(false);
      }
    },
    meta: {
      isShow: false,
    },
  },
  {
    path: "/pay",
    component: Pay,
    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      isShow: false,
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: {
      isShow: false,
    },
  },
  {
    path: "/center",
    component: Center,
    children: [
      {
        path: "/center",
        redirect: "/center/myorder",
      },
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
    ],
  },
];
