import { UserControllerService } from "./../../generated/services/UserControllerService";
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "../access/AccessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
  actions: {
    async getLoginUser({ commit }, payload) {
      //  远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      console.log("res", res);
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        console.log("wei deng lu ??");
      }
    },
  },
} as StoreOptions<any>;
