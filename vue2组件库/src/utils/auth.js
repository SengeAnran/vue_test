import Cookies from 'js-cookie';
import config from '@/utils/config';
import { exchangeToken, paramExchangeToken } from '@/api/user';
import store from '@/store';

const TokenKey = 'access_token';
const LoginType = 'login_env_type';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getQueryToken(name, isHash) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var search = isHash ? window.location.hash : window.location.search;
  var r =
    search.substr(1).match(reg) || window.location.href.substr(window.location.href.lastIndexOf('?') + 1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export function removeLocationSearch() {
  window.history.replaceState({}, 0, location.href.replace(location.search, ''));
}
const systemTitleType = {
  3: '历史文化村落保护管理应用',
  4: '浙江省未来乡村建设工作台',
  1: '未来乡村小程序管理后台',
  2: '跟着节气游乡村管理后台',
};

export function updateDocumentTitle() {
  const systemType = localStorage.getItem('systemType');
  document.title = systemTitleType[systemType] || systemTitleType['3'];
}
export function verifyAuth() {
  // 获取url search token
  const token = getQueryToken('token');
  const c_token = getQueryToken('c_token');
  const systemType = getQueryToken('applicationId');
  const areaName = getQueryToken('areaName'); // 如果从驾驶舱过来获取路径上的区域名
  const id = getQueryToken('id'); // 如果从驾驶舱过来获取路径上的区域名
  if (systemType) {
    localStorage.setItem('systemType', systemType);
    localStorage.setItem('systemTitle', systemTitleType[systemType]);
    localStorage.setItem('systemCToken', c_token); // 存储c_token 驾驶舱跳转时使用
    // setLoginType('in');
  }
  if (areaName) {
    localStorage.setItem('areaName', areaName); // 存储areaName 列表跳转时使用
  }
  if (id) {
    localStorage.setItem('id', id); // id 列表跳转时使用
  }
  updateDocumentTitle();

  return new Promise((resolve) => {
    // 移除链接中token
    removeLocationSearch();
    if (areaName && c_token) {
      setLoginType('ext2'); // c_token可能超时，跳转回登录页
      const data = {
        c_token: c_token,
        param: areaName,
        viewType: 1, // 0：正常进入工作台，1：省级驾驶舱进入，2：美丽乡村二级页面进入）
      };
      _setWLXCZXZCYJInfo(data).then(() => {
        resolve();
      });
    } else if (id && c_token) {
      setLoginType('ext2'); // c_token可能超时，跳转回登录页
      const data = {
        c_token: c_token,
        param: id,
        viewType: 2, // 0：正常进入工作台，1：省级驾驶舱进入，2：美丽乡村二级页面进入）
      };
      _setWLXCZXZCYJInfo(data).then(() => {
        resolve();
      });
    } else if (c_token) {
      setLoginType('ext2'); // c_token可能超时，跳转回登录页
      _setWLXCZXInfo(c_token).then(() => {
        resolve();
      });
    } else if (token) {
      _setPortalInfo(token);
      resolve();
    } else {
      resolve();
    }
  });

  // if (token) {
  //   // 设置token
  //   setToken(token);
  // }
  // 移除链接中token、applicationId
  // removeLocationSearch();
}

function _setPortalInfo(token) {
  // 设置token
  setToken(token);
  // 重新设置loginType
  const loginType = getQueryToken('loginType');
  if (loginType && loginType === 'in') {
    setLoginType('in');
  } else {
    setLoginType('ext');
  }
}
// 从「未来乡村在线」跳转过来
function _setWLXCZXInfo(c_token) {
  return exchangeToken({ c_token }).then((res) => {
    setToken(res.token);
    // setLoginType("ext2");
  });
}
// 从「未来乡村在线.监测预警」跳转过来
function _setWLXCZXZCYJInfo(data) {
  return paramExchangeToken(data).then((res) => {
    setToken(res.token);
    localStorage.setItem('viewType', res.viewType);
    // setLoginType("ext2");
  });
}

/**
 * @desc 设置loginType，区分登录入口  1. 三农：ext  2. 子系统：in
 */
export function setLoginType(value) {
  localStorage.setItem(LoginType, value || '');
}
export function getLoginType() {
  return localStorage.getItem(LoginType);
}

export function removeLoginType() {
  localStorage.removeItem(LoginType);
}
// 根据平台入口判断退出路径
// export function getLoginPath(byToken) {
//   const { sn_loginPath, loginPath } = config;
//   const loginType = getLoginType();
//   let path = '';
//   if (loginType !== 'in' && sn_loginPath) {
//     path = sn_loginPath;
//   } else {
//     if (byToken) {
//       // token失效
//       path =
//         loginPath +
//         'login' +
//         `?redirect_url=${encodeURIComponent(location.href)}&applicationId=${window.localStorage.getItem('systemType')}`;
//     } else {
//       path =
//         loginPath +
//         'login' +
//         `?redirect_url=${encodeURIComponent(
//           location.protocol + '//' + location.host + config.routerBase + '/',
//         )}&applicationId=${window.localStorage.getItem('systemType')}`;
//     }
//     // path = loginPath + 'login' + `?redirect_url=${encodeURIComponent(location.protocol + '/' + location.host + config.routerBase)}&applicationId=${window.localStorage.getItem('systemType')}`;
//   }
//   return path;
//   // return (loginType !== 'in' && loginPath) || sn_loginPath;
// }

// 根据平台入口判断退出路径
export function getLoginPath(type) {
  const { sn_loginPath, homePath } = config;
  const portalPath = store.state.user.redirectUrl.portalRedirectUrl;
  const loginPath = store.state.user.redirectUrl.ssoRedirectUrl;

  const loginType = getLoginType();
  if (loginType === 'ext' && sn_loginPath) {
    return sn_loginPath;
  }
  if (type === 'loginout') {
    return `${loginPath}?redirect=${encodeURIComponent(portalPath)}`;
  }
  return concatParams(portalPath, homePath, true);
}

/**
 * @desc 将系统未登录和登录失效后浏览器重定向到门户重新获取token，需要拼接参数
 * 1. redirect_url=url（url地址需要encodeURIComponent编码）
 * 2. 需要在redirect_url参数里加上自己所需的applicationId参数（可以包含其他任意链接）
 * APPLICATION-ID ( "1":未来乡村小程序管理系统，"2"：跟着节气游，"3"：历史村落，“4”:未来乡村建设工作台 )
 * @param {string}  portalPath 门户页地址
 * @param {string}  homePath  回跳地址
 * @param {boolean} needBackPortal  回到门户页/重定向至当前地址
 * @return {string}  拼接redirect_url后的url
 */
function concatParams(portalPath, homePath, needBackPortal = false) {
  const url = encodeURIComponent(homePath + '&applicationId=2');
  const path = `?redirect_url=${url}`;
  return (needBackPortal && `${portalPath}${path}`) || `${portalPath}`; // 超时的重定向链接--回门户页
}

// export function handleLoginOut(byToken) {
//   removeToken();
//   getLoginPath();
//   location.href = getLoginPath(byToken);
//   removeLoginType();
// }

export function timeoutRedirect() {
  removeToken();
  window.open(getLoginPath('timeout'), '_self');
}

export function handleLoginOut() {
  removeToken();
  window.open(getLoginPath('loginout'), '_self');
  // 注释fix： 跳转到登录页后用户可能会按到返回，需要loginType判断跳转页
  // removeLoginType();
}

export function backHomeUrl() {
  const portalPath = store.state.user.redirectUrl.portalRedirectUrl;
  window.open(portalPath, '_self');
}
