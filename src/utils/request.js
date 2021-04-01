import axios from 'axios';

// const CODE = {
//   LOGIN_TIMEOUT: 1000,
//   REQUEST_SUCCESS: 0,
//   REQUEST_FOBID: 1001,
// };

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use((config) => config);

instance.interceptors.response.use(undefined, (err) => {
  const { config } = err;

  if (!config || !config.retry) return Promise.reject(err);

  config.retryCount = config.retryCount || 0;

  if (config.retryCount >= config.retry) {
    return Promise.reject(err);
  }

  config.retryCount += 1;

  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1);
  });

  return backoff.then(() => instance(config));
});

export default instance;
