const proConfig = {
  // 未来乡村工作
  requestBaseUrl: '/v2/admin/apiProxy',
  apiHost: '/v2/admin/apiProxy',
  apiHost2: '/v2/admin/apiWX',
  apiHost3: '/v2/admin/apiWX',
  // // 历史文化村落保护
  // apiHost: '/v2/apiProxy',
  // apiHost2: '/v2/apiWX',
  // apiHost3: '/v2/apiWX',

  // loginPath: window.location.origin + '/lswhcl',
  // loginPath: 'https://wlxc.xscitydo.com:28080/portal/',
  loginPath: 'https://wlxc.zjagri.cn/v2/portal/',
  // routerBase: '/lswhcl', // 老版本
  routerBase: '/v2/admin',
  sn_loginPath: 'https://szsn.zjagri.cn/sso/assets/szsnbg/login.html', //三农平台默认登录地址
  wlxczx_loginPath: 'https://wlxc.zjagri.cn/home', // 未来乡村在线地址
};

const devConfig = {
  requestBaseUrl: '/apiProxy', // 历史文化
  apiHost: '/apiProxy', // 历史文化
  // apiHost: "http://172.16.27.121:8280", // 历史文化
  apiHost2: '/apiWX', // 未来乡村
  // apiHost2: "http://172.16.27.121:8680", // 未来乡村
  apiHost3: '/apiWX', // 未来乡村微信小程序
  // apiHost3: "http://172.16.25.142:5000", // 未来乡村微信小程序
  // loginPath: window.location.origin + '/admin',
  loginPath: 'https://wlxc.xscitydo.com:28080/portal/', // 测试环境
  // loginPath: 'https://jqy.zjagri.cn/v2/portal/', // 生产环境2
  // loginPath: 'https://172.16.25.164:8080/portal/', // 生产环境2
  // loginPath: 'http://223.4.73.15/portal/', // 生产环境
  routerBase: '/admin',
  wlxczx_loginPath: 'http://125.124.157.152:8081/sso/?redirect=http://125.124.53.202:8085/home',
};

const config = process.env.VUE_APP_ENV === 'production' ? proConfig : devConfig;

export default config;
