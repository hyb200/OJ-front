import router from "../router/index";
import store from "../store/index";
import ACCESS_ENUM from "./AccessEnum";
import checkAccess from "./CheckAccess";

router.beforeEach(async (to, from, next) => {
  console.log("userInfo", store.state.user.loginUser);

  let loginUser = store.state.user.loginUser;

  //  如何之前没登陆过，则自动登录
  if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //  要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //  如果没登录，跳转到登录页面
    if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, needAccess)) {
      next("/404");
      return;
    }
  }
  next();
});
