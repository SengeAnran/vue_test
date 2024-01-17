import config from '@/utils/config';
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 1256,
    open: true,
    proxy: {
      [ config.requestBaseUrl] : {
        target: `http://192.168.5.73:8080`, // 北京
        changeOrigin: true,
        pathRewrite: {
          ["^" + config.requestBaseUrl]: "",
        },
      }
    }
  }
}
