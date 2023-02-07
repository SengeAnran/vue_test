import Vue from 'vue';
import path from 'path';
const requireComponent = require.context(
  './',
  true,
  // /(Base[A-Z]\w+\/index.vue$)|(Base[A-Z]\w+\.(vue|js)$)/
  // /(Base[A-Z]\w+\/index.vue$)|(Base[A-Z]\w+\.(vue|js)$)/
  /([A-Z]\w+\/(([A-Z]\w+)|(index))\.(vue|js)$)|(Base[A-Z]\w+\.(vue|js)$)/
);
requireComponent.keys().forEach(fileName => {
  // console.log(fileName);
  //  获取组件配置
  const componentConfig = requireComponent(fileName);
  // 获取组件的 PascalCase 命名
  // console.log(path.basename(fileName, path.extname(fileName)))
  const componentName = componentConfig.default.name || path.basename(fileName, path.extname(fileName));
  // console.log(componentName);
  Vue.component(componentName, componentConfig.default || componentConfig);
})