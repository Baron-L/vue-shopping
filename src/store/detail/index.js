import { reqGetDetailInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";
// Home模块的小仓库
const state = {
  detailList: {},
  // 游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETDETAILINFO(state, detailList) {
    state.detailList = detailList;
  },
};
const actions = {
  async getDetailInfo({ commit }, skuId) {
    let result = await reqGetDetailInfo(skuId);
    if (result.code === 200) {
      commit("GETDETAILINFO", result.data);
    }
  },
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code === 200) {
      //返回的是成功的标记
      return "ok";
    } else {
      //返回的是失败的标记
      return Promise.reject(new Error("faile"));
    }
  },
};
const getters = {
  categoryView(state) {
    return state.detailList.categoryView || {};
  },
  skuInfo(state) {
    return state.detailList.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailList.spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
