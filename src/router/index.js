// 引入vue-router
import VueRouter from "vue-router";
// 引入Vue
import Vue from "vue";
// 使用插件
Vue.use(VueRouter);
import routes from "./routes";
//引入store
import store from "@/store";
//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 配置路由
let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

// 全局守卫： 前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to: 获取到你要跳转的路由信息
  // from：获取到你从哪个路由而来的信息
  // next：放行函数  直接调用next()，直接放行
  // next('/login') 放行到指定路由位置  next(path)
  // next(false)
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  //用户登录了
  if (token) {
    //已经登录而且还想去登录------不行
    if (to.path == "/login" || to.path == "/register") {
      next("/");
    } else {
      //已经登陆了,访问的是非登录与注册
      //登录了且拥有用户信息放行
      if (name) {
        next();
      } else {
        //登陆了且没有用户信息
        //在路由跳转之前获取用户信息且放行
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token失效从新登录
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next("/login?redirect=" + toPath);
    } else {
      //去的不是上面这些路由（home|search|shopCart）---放行
      next();
    }
  }
});
export default router;
