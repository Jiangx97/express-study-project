/**
 * request.ts
 * axios 配置文件
 */

import axios from "axios";
import { ElMessage } from "element-plus";
axios.defaults.baseURL = "http://localhost:8082";
axios.defaults.timeout = 60000;

// request请求的拦截器
axios.interceptors.request.use((config) => {
  if (config.url === "/login") {
    // 登录接口无需token
  } else {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 请求响应的拦截器
axios.interceptors.response.use(
  (res) => {
    // 后端返回的状态码非0，则为异常
    if (res.data.statusCode !== 0) {
      ElMessage({
        showClose: true,
        message: res.data.message,
        type: "error",
      });
      return Promise.reject(res);
    }

    return res;
  },
  (err) => {
    ElMessage({
      showClose: true,
      message: "错误",
      type: "error",
    });
    return err;
  }
);

export default axios;
