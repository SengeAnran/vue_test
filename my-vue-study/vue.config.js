const path = require('path');
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 80,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://192.168.1.45:8080`,
        // target: `http://192.168.1.176:8080`,
        target: `http://127.0.0.1:8080`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
      // [process.env.VUE_APP_BASE_API_SYS]: {
      //   target: `http://192.+168.1.176:8080`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ["^" + process.env.VUE_APP_BASE_API_SYS]: "",
      //   },
      // },
    },
    disableHostCheck: true
  },
}