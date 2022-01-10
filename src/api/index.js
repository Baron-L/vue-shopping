import requests from "./request";

import mockRequests from "./mockAjax";
// 发请求:axios返回结果为Promise对象
export const reqCategoryList = () =>
  requests.get(`/product/getBaseCategoryList`);

// 获取seach模块数据 /api/list   POST   参数
export const reqGetSearchInfo = (params) =>
  requests({
    url: "/list",
    method: "post",
    data: params,
  });
// 获取detail模块数据  /api/item{skuid}
export const reqGetDetailInfo = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: "get",
  });

// 购物车添加/修改接口
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车数据
export const reqCartList = () =>
  requests({ url: "/cart/cartList ", method: "get" });

// 删除购物车数据
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });
// 获取banner接口  mock模拟数据
export const reqGetBannerList = () => mockRequests.get("/banner");
// 获取floor接口  mock模拟数据
export const reqGetFloorList = () => mockRequests.get("/floor");
