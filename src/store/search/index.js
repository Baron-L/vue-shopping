import { reqGetSearchInfo } from "@/api";
// Search模块的小仓库
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  // 第一个参数：上下文参数， 第二个参数载荷
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code === 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
const getters = {
  goodsList(state) {
    // 这样书写有问题
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
