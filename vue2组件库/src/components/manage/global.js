import Vue from "vue";

const requireComponent = require.context("./", true, /.+\.vue$/);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const filePath = fileName.split("/");
  filePath.pop();
  const componentName = filePath.pop();

  // 全局注册基础组件
  componentName &&
    Vue.component(componentName, componentConfig.default || componentConfig);
});
