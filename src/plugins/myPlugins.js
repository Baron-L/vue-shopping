//Vue插件一定暴露一个对象
let myPlugins = {};
// install方法，自定义插件
// 参数一：Vue构造函数
// 参数二：配置对象
myPlugins.install = function (Vue, options) {
  //Vue.prototype.$bus
  //全局指令
  // 第一个参数
  Vue.directive(options.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase();
    console.log(params);
  });
};

//对外暴露组件对象
export default myPlugins;
