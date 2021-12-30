import Vue from 'vue'
import App from './App.vue'

// 三级联动-全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 引入路由
import router from '@/router'
// 引入vuex仓库
import store from '@/store'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
