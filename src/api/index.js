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
// 获取banner接口  mock模拟数据
export const reqGetBannerList = () => mockRequests.get("/banner");
// 获取floor接口  mock模拟数据
export const reqGetFloorList = () => mockRequests.get("/floor");
