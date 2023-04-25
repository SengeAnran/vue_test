// https://www.webpackjs.com/ 官网照着配置
const path = require('path');

module.exports = {
//  入口
  entry: './src/index.js',
//  出口
  output: {
    // 虚拟打包路径，就是说文件夹不会真正生成， 而是在8080端口虚拟生成
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    // 端口号
    port: 8080,
    //静态资源文件夹
    contentBase: 'www'
  }
}