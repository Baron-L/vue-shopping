<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  components: {
    Header,
    Footer
  },
  mounted () {
    // 优化商品列表切换多次请求
    this.$store.dispatch('categoryList')
    ;
  },
}
</script>

<style>

</style>