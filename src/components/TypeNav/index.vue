<template>
   <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 绑定样式 -->
                            <div class="item" :class="{cur: currentIndex === index}" v-for="(item, index) in categoryList" :key="item.categoryId">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="item.categoryName" :data-category1Id="item.categoryId">{{item.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix" :style="{display: currentIndex === index ? 'block' : 'none'}">
                                    <div class="subitem" v-for="itemChild in item.categoryChild" :key="itemChild.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="itemChild.categoryName" :data-category2Id="itemChild.categoryId">{{itemChild.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="itemListChild in itemChild.categoryChild" :key="itemListChild.categoryId">
                                                    <a :data-categoryName="itemListChild.categoryName" :data-category3Id="itemListChild.categoryId">{{itemListChild.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>  
                
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入方式： lodash全部功能函数引入了
// import _ from 'lodash'
// 按需引入 lodash
import throttle from "lodash/throttle"
export default {
    name: 'TypeNav',
    data() {
        return {
            // 存储用户鼠标滑过的索引
            currentIndex: -1,
            isShow: true
        }
    },
    // 组件挂载完毕，发送请求
    mounted () {
        // 如果不是Home路由组件，将TypeNav隐藏
        if (this.$route.path != "/home") {
            this.isShow = false;
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，会执行一次
            // 注入一个参数state， state:他是咱们大仓库中的state（包含home|search）
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        // 鼠标滑过修改currentIndex
        // throttle回调函数别用箭头函数，会导致上下文this问题
        changeIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),
        // changeIndex(index) {
        //     this.currentIndex = index
        // },
        // 鼠标移出 清空currentIndex
        leaveIndex() {
            this.currentIndex = -1
            if (this.$route.path != "/home") {
                this.isShow = false;
            }
        },
        // 鼠标移入的时候，进行列表展示
        enterShow() {
            if (this.$route.path != "/home") {
                this.isShow = true;
            }
        },
        // 路由跳转的方法
        goSearch (event) {
            // 最好的解决方案： 编程试路由 + 事件委派
            // 利用事件委派存在一些问题： 如何确认点击的a标签， 参数如何获取
            // 获取当前事件触发节点
            let node = event.target

            // 需要带有data-categoryname这样的节点
            // 如果标签身上拥有categoryname的属性一定是a标签
            let { categoryname, category1id, category2id, category3id} = node.dataset
            if (categoryname) {
                // 整理路由跳转的参数
                let location = { name: 'search'}
                let query = {categoryName: categoryname}
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                // 判断：如果路由跳转的时候，带有params参数，整体携带过去
                if (this.$route.params) {
                    location.params = this.$route.params
                     // 整理合并参数
                    location.query = query
                    // 路由跳转
                    this.$router.push(location)
                }
               
            }
        }
    },
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
                // 三级联动，添加鼠标滑过样式
                // .item:hover {
                //     background: skyblue;
                // }
                .cur {
                    background: skyblue;
                }
            }
        }
        //过渡动画的样式
        //过渡动画开始状态（进入）
        .sort-enter {
        height: 0px;
        }
        // 过渡动画结束状态（进入）
        .sort-enter-to {
        height: 461px;
        }
        // 定义动画时间、速率
        .sort-enter-active {
        transition: all 0.2s linear;
        }
    }
}
</style>