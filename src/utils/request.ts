import axios from 'axios';
import proxy from '../config/host';
import store from '@/store';
import router from '@/router';

const env = import.meta.env.MODE || 'development';

const API_HOST = env === 'mock' ? '/' : proxy[env].API; // 如果是mock模式 就不配置host 会走本地Mock拦截

const CODE = {
  LOGIN_TIMEOUT: 1000,
  REQUEST_SUCCESS: 0,
  REQUEST_FOBID: 1001,
};

const instance = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  withCredentials: true,
});

// eslint-disable-next-line
// @ts-ignore
// axios的retry ts类型有问题
instance.interceptors.retry = 3;

instance.interceptors.request.use((config) => config);

instance.interceptors.response.use(
  (response) => {
    if (response && response.status === 200) {
      const { data } = response;

      // handle custom login timeout code from backend
      if (data && data.code === CODE.LOGIN_TIMEOUT) {
        // clear token and redirect to login
        try {
          store.commit('user/removeToken');
        } catch (e) {
          // ignore
        }
        const redirect = window.location.pathname || '/';
        router.replace(`/login?redirect=${redirect}`);
        return Promise.reject(data);
      }

      if (data && data.code === CODE.REQUEST_SUCCESS) {
        return data;
      }

      // if backend returns an error code, reject so callers can handle it
      return Promise.reject(data || response);
    }
    return Promise.reject(response);
  },
  (err) => {
    const { config, response } = err;

    // if server returned 401, force logout and redirect to login
    if (response && response.status === 401) {
      try {
        store.commit('user/removeToken');
      } catch (e) {
        // ignore
      }
      const redirect = window.location.pathname || '/';
      // use router if available
      try {
        router.replace(`/login?redirect=${redirect}`);
      } catch (e) {
        window.location.href = `/login?redirect=${redirect}`;
      }
      return Promise.reject(err);
    }

    if (!config || !config.retry) return Promise.reject(err);

    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.retryCount += 1;

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, config.retryDelay || 1);
    });

    return backoff.then(() => instance(config));
  },
);

export default instance;
