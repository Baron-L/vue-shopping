import { reqGetDetailInfo } from "@/api";
// Home模块的小仓库
const state = {
  detailList: {},
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
