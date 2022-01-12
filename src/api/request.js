// 对于axios进行二次封装
import axios from "axios";

// 引入进入条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
// start: 进度条开始  done： 进度条结束

// 引入store
import store from "@/store";
// 创建axios实例
const requests = axios.create({
  //配置对象-基础路径，发送请求时，路径当中会出现api，无需手写
  baseURL: "/api",
  // 代表请求超时的时间 5s
  timeout: 5000,
});

// 请求拦截器：发送请求之前，可以检测到，可在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config:配置对象，header请求头
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nprogress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数，服务器返回数据后，可以检测到，可在请求发出去之前做一些事情
    nprogress.done();
    return res.data;
  },
  (error) => {
    // 失败的回调函数
    return Promise.reject(new Error("faile"));
  }
);

//对外暴露
export default requests;
