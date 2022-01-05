import Vue from 'vue'
import App from './App.vue'

// 三级联动-全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 轮播图全局组件
import Carsousel from "@/components/Carousel";
Vue.component(Carsousel.name, Carsousel)
// 引入路由
import router from '@/router'
// 引入vuex仓库
import store from '@/store'
// 引入mockServer
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
