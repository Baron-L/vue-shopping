import Vue from "vue";
import App from "./App.vue";

// 三级联动-全局组件
import TypeNav from "@/components/TypeNav";
Vue.component(TypeNav.name, TypeNav);
// 轮播图全局组件
import Carsousel from "@/components/Carousel";
Vue.component(Carsousel.name, Carsousel);
// 分页全局组件
import Pagination from "@/components/Pagination";
Vue.component(Pagination.name, Pagination);
// 按需引入elementi
import { Button, MessageBox } from "element-ui";
// 注册使用element
Vue.component(Button.name, Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from "@/router";
// 引入vuex仓库
import store from "@/store";
// 引入mockServer
import "@/mock/mockServe";
// 引入swiper样式
import "swiper/css/swiper.css";
// 统一接口api文件夹里面全部请求函数
import * as API from "@/api";
// 引入懒加载图片
import lazyload from "@/assets/lazyload.jpg";
//引入懒加载插件
import VueLazyload from "vue-lazyload";
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: lazyload,
});
Vue.config.productionTip = false;
// 引入自定义插件
import myPlugins from "@/plugins/myPlugins";
// 使用插件
Vue.use(myPlugins, {
  name: "leo",
});
//引入表单校验插件
import "@/plugins/validate";
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount("#app");
