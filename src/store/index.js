// 引入vue
import Vue from "vue"
// 引入vuex
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'
 

// 对外暴露store类的一个实例
export default new Vuex.Store({
    // 实现Vuex仓库模块式开发
    modules: {
        home,
        search
    }
})