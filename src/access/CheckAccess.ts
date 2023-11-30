/*
 * 检查权限（判断当前用户是否具有某个权限）
 */

import ACCESS_ENUM from "./AccessEnum";

const checkAccess = (user: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //  获取当前用户具有的权限
  const userAccess = user?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  //  如果用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    //  如果用户未登录，则无权限
    if (userAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  //  如果需要管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //  如果不为管理员，则无权限
    if (userAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }

  return true;
};

export default checkAccess;
