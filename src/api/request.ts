import axios from 'axios';

const instance = axios.create({ baseURL: import.meta.env.CL_REQUEST_BASE_URL });

instance.interceptors.request.use(
  (config) => {
    console.debug('请求拦截器 - 请求发送前');
    console.debug('请求方法:', config.method);
    console.debug('请求URL:', config.url);
    console.debug('请求参数:', config.params);
    console.debug('请求头:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use((response) => {
  console.debug('响应拦截器 - 收到响应');
  console.debug('响应状态码:', response.status);
  console.debug('响应数据:', response.data);
  return response.data;
});

export const http = instance;
