import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import router from './router';
import store from './store';

NProgress.configure({ showSpinner: false }); // NProgress 配置

const { dispatch, state } = store;
const { user } = state;

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  console.log('拦截登录校验');

  // 如果不需要登录，那么直接跳过
  const notNeedLogin = to.matched.some((route) => route.meta && route.meta.needLogin === false);
  if (notNeedLogin) {
    next();
  }

  if (user.loginName === '') {
    // 没有用户信息，或 ticket 不相等的话需要重新拉取用户信息，并更新 ticket
    try {
      await dispatch('user/getUserInfo');
      NProgress.done();
    } catch (error) {
      console.log(`获取用户信息错误：${error.message}`);
      //   Message.error({ message: `获取用户信息错误：${error.message}`, closeBtn: true });

      NProgress.done();
      return;
    }
  }

  /** * TODO 这里判断页面权限 ***/

  next();
});

router.afterEach(() => {
  NProgress.done();
});
