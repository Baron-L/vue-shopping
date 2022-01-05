// 引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据引入[没有对外暴露，但是可以引入]——webpack对图片、JSON都是默认暴露的
import banner from './banner.json'
import floor from './floor.json'
// 开始mock模拟数据
// 第一个参数： 请求的地址 ，  第二个参数： 请求的数据
Mock.mock('/mock/banner', {
    code: 200,
    data: banner
})

Mock.mock('/mock/floor', {
    code: 200,
    data: floor
})

// 在入口文件引入mainjs
