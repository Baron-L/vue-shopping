import requests from "./request"

// 三级联动接口

// 发请求:axios返回结果为Promise对象
export const reqCategoryList = () => requests({url : '/product/getBaseCategoryList', method: 'get'})

