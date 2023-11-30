import { StoreOptions } from "vuex";
import ACCESS_ENUM from "../access/AccessEnum";

export default {
  namespace: true,
  state: () => ({
    loginUser: {
      userName: "",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
  actions: {
    getLoginUser({ commit, state }, payload) {
      commit("updateUser", payload);
    },
  },
} as StoreOptions<any>;
