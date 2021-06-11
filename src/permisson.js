import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import router from './router';
import store from './store';
import { authenticationMethod } from '@/config/global';

NProgress.configure({ showSpinner: false }); // NProgress 配置

const { dispatch, state } = store;
const { user } = state;

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // 如果不需要登录，那么直接跳过
  const notNeedLogin = to.matched.some((route) => route.meta && route.meta.needLogin === false);
  if (notNeedLogin) {
    next();
    return;
  }

  // console.log('当前登录用户');
  // console.log(user);

  if (authenticationMethod === 'smartProxy') {
    // 当登录方式为内网登录，则走智能网关进行OA登录鉴权，并获取用户信息
    if (user.loginName === '') {
      // 没有用户信息的话需要重新拉取用户信息，
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
  } else if (authenticationMethod === 'customize') {
    console.log('自定义');
    // 当登录方式选择自定义登录时，若无登录，则重定向跳转到登录页面
    if (user.loginName === '') {
      console.log('重定向到登录页面');
      // 没有用户信息，重定向跳转到登录页面
      next({ path: '/login/index' });
      return;
    }
  }

  /** * TODO 这里判断页面权限 ***/
  // 权限没有问题，直接路由下一步
  next();
});

router.afterEach(() => {
  NProgress.done();
});
