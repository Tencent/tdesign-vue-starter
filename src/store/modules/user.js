// 定义的state初始值
const state = {
  loginName: '',
  deptNameString: '',
};

// 定义的state的初始值方法，传入state或者额外的方法，然后利用vuex的双向数据驱动进行值的改变
// 可通过this.$store.commit(' ')调用，但是触发的是同步事件
const mutations = {
  SET_USER_INFO(state, userInfo) {
    // eslint-disable-next-line no-param-reassign
    state.loginName = userInfo.EngName;
    // eslint-disable-next-line no-param-reassign
    state.deptNameString = userInfo.DeptNameString;
  },
};

// 使用actions的好处在于不会触发同步时间，而是异步事件
// actions里面自定义的函数接收一个context参数和要变化的形参，context与store实例具有相同的方法和属性，所以它可以执行context.commit(' ')
const actions = {
  // 获取用户信息
  async getUserInfo() {
    try {
      console.log('当前编译环境');
      console.log(process.env.NODE_ENV);
    } catch (err) {
      // 弹框提示错误信息
      console.log(`智能网关获取用户信息错误：${err.message}`);
      //   Message.error({ message: `获取用户信息错误：${err.message}`, closeBtn: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
