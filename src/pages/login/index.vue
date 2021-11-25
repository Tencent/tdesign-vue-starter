<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="title-container">
        <img class="icon" src="https://tdesign.gtimg.com/starter/logo%402x.png" />
        <div class="side-title" v-show="loginStep !== 'login-step4' && loginStep !== 'login-step5'">
          <p class="tip1">没有账号吗?</p>
          <p class="tip2" @click="toLoginStep('login-step4')">注册新账号</p>
        </div>
        <div class="side-title" v-show="loginStep === 'login-step4' || loginStep === 'login-step5'">
          <p class="tip1">已有账号吗?</p>
          <p class="tip2" @click="toLoginStep('login-step1')">登录</p>
        </div>
      </div>
      <div class="login-step1" v-show="loginStep == 'login-step1'">
        <div class="input-container">
          <t-input style="width: 400px" size="large" v-model="userInfo.EngName" placeholder="请输入您的邮箱/手机号">
            <t-icon name="user" slot="prefix-icon" />
          </t-input>
          <t-popup placement="right" trigger="focus" showArrow>
            <t-input
              style="width: 400px"
              size="large"
              :type="showPsw ? 'text' : 'password'"
              clearablec
              placeholder="请输入密码"
              v-model="psw"
              @keyup="checkPsw"
            >
              <t-icon name="lock-on" slot="prefix-icon"></t-icon>
              <t-icon @click="showPsw = !showPsw" slot="suffix-icon" :name="showPsw ? 'browse' : 'browse-off'" />
            </t-input>
            <template #content>
              <div>
                <div :class="['rex-check', { 'format-correct': check1 }]">
                  <t-icon name="check-circle-filled" size="large" />
                  <span>1-20个英文字符</span>
                </div>
                <div :class="['rex-check', { 'format-correct': check2 }]">
                  <t-icon name="check-circle-filled" size="large" />
                  <span>需包含下划线</span>
                </div>
              </div>
            </template>
          </t-popup>
          <div class="check-container">
            <t-checkbox>记住账号</t-checkbox>
            <span class="tip">忘记账号？</span>
          </div>
          <div class="button-container">
            <t-button style="width: 400px" size="large" @click="toLogin">登录</t-button>
          </div>
        </div>
        <div class="bottom-container">
          <span class="tip" @click="toLoginStep('login-step3')">使用微信扫码登录</span>
          <i>|</i>
          <span class="tip" @click="toLoginStep('login-step6')">使用短信登录</span>
        </div>
      </div>
      <!-- <div class="login-step2" v-show="loginStep == 'login-step2'">
        <div class="input-container">
          <div class="tip-container">
            <span class="tip1" @click="toLoginStep('login-step1')">
              <t-icon name="arrow-left" style="color: #0052d9" />
              返回
            </span>
            <span class="tip2">忘记账号？</span>
          </div>
          <t-input type="password" size="large">
            <t-icon name="lock-on" slot="prefix-icon" />
          </t-input>
          <div class="button-container">
            <t-button block variant="base" size="large" style="width: 400px" @click="toLogin">登录</t-button>
          </div>
        </div>
      </div> -->
      <div class="login-step3" v-show="loginStep == 'login-step3'">
        <div class="input-container">
          <div class="tip-container">
            <span class="tip1">请使用微信扫一扫登录</span>
            <span class="tip2">刷新 <t-icon name="refresh" color="#0052D9" /> </span>
          </div>
          <qrcode-vue value="https://tencent.tdesign.com/vue/components/quick-start" :size="192" level="H" />
        </div>
        <div class="bottom-container">
          <span class="tip" @click="toLoginStep('login-step1')">使用账号密码登录</span>
          <i>|</i>
          <span class="tip" @click="toLoginStep('login-step6')">使用短信登录</span>
        </div>
      </div>
      <div class="login-step4" v-show="loginStep == 'login-step4'">
        <div class="input-container">
          <t-input style="width: 400px" size="large" v-model="userInfo.EngName" placeholder="请输入您的手机号">
            <t-icon name="user" slot="prefix-icon" />
          </t-input>
          <t-popup placement="right" trigger="focus" showArrow>
            <t-input
              style="width: 400px"
              size="large"
              :type="showPsw ? 'text' : 'password'"
              clearablec
              placeholder="请输入登录密码"
              v-model="psw"
              @keyup="checkPsw"
            >
              <t-icon name="lock-on" slot="prefix-icon"></t-icon>
              <t-icon @click="showPsw = !showPsw" slot="suffix-icon" :name="showPsw ? 'browse' : 'browse-off'" />
            </t-input>
            <template #content>
              <div>
                <div :class="['rex-check', { 'format-correct': check1 }]">
                  <t-icon name="check-circle-filled" size="large" />
                  <span>1-20个英文字符</span>
                </div>
                <div :class="['rex-check', { 'format-correct': check2 }]">
                  <t-icon name="check-circle-filled" size="large" />
                  <span>需包含下划线</span>
                </div>
              </div>
            </template>
          </t-popup>
          <div class="verification-code">
            <t-input style="width: 282px" size="large" placeholder="请输入验证码" />
            <t-button v-if="captchaSent" variant="outline" disabled>
              {{ countDownText }}
            </t-button>
            <t-button v-else @click="waitCodeNumCount" variant="outline"> 发送验证码 </t-button>
          </div>
          <div class="check-container">
            <t-checkbox>我已阅读并同意 <span>TDesign服务协议</span> 和 <span>TDesign 隐私声明</span></t-checkbox>
          </div>
          <div class="button-container">
            <t-button style="width: 400px" size="large" @click="toLogin">注册</t-button>
          </div>
        </div>
        <div class="bottom-container">
          <span class="tip" @click="toLoginStep('login-step5')">使用邮箱注册</span>
        </div>
      </div>
      <div class="login-step5" v-show="loginStep == 'login-step5'">
        <div class="input-container">
          <t-select
            v-model="userInfo.EngName"
            placeholder="请输入您的邮箱"
            filterable
            style="width: 400px"
            size="large"
            :empty="''"
            :options="emailOptions"
            :onSearch="remoteMethod"
          >
            <template #t-input>
              <t-icon name="lock-on" slot="prefix-icon"></t-icon>
            </template>
          </t-select>
          <t-popup placement="right" trigger="focus" showArrow>
            <t-input
              style="width: 400px"
              size="large"
              :type="showPsw ? 'text' : 'password'"
              clearablec
              placeholder="请输入登录密码"
              v-model="psw"
              @keyup="checkPsw"
            >
              <t-icon name="lock-on" slot="prefix-icon"></t-icon>
              <t-icon @click="showPsw = !showPsw" slot="suffix-icon" :name="showPsw ? 'browse' : 'browse-off'" />
            </t-input>
            <template #content>
              <div>
                <div :class="['rex-check', { 'format-correct': check1 }]">
                  <t-icon name="check-circle-filled" size="large" />
                  <span>1-20个英文字符</span>
                </div>
                <div :class="['rex-check', { 'format-correct': check2 }]">
                  <t-icon name="check-circle-filled" size="large" />
                  <span>需包含下划线</span>
                </div>
              </div>
            </template>
          </t-popup>
          <div class="check-container">
            <t-checkbox>我已阅读并同意 <span>TDesign服务协议</span> 和 <span>TDesign 隐私声明</span></t-checkbox>
          </div>
          <div class="button-container">
            <t-button style="width: 400px" size="large" @click="toLogin">注册</t-button>
          </div>
        </div>
        <div class="bottom-container">
          <span class="tip" @click="toLoginStep('login-step4')">使用手机号注册</span>
        </div>
      </div>
      <div class="login-step6" v-show="loginStep == 'login-step6'">
        <div class="input-container">
          <t-input style="width: 400px" size="large" v-model="userInfo.EngName" placeholder="请输入您的手机号">
            <t-icon name="user" slot="prefix-icon" />
          </t-input>
          <div class="verification-code">
            <t-input style="width: 282px" size="large" placeholder="请输入验证码" />
            <t-button v-if="captchaSent" variant="outline" disabled>
              {{ countDownText }}
            </t-button>
            <t-button v-else @click="waitCodeNumCount" variant="outline"> 发送验证码 </t-button>
          </div>
          <div class="button-container">
            <t-button style="width: 400px" size="large" @click="toLogin">登录</t-button>
          </div>
        </div>
        <div class="bottom-container">
          <span class="tip" @click="toLoginStep('login-step1')">使用账号密码登录</span>
          <i>|</i>
          <span class="tip" @click="toLoginStep('login-step3')">使用微信扫码登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入样式
import './index.less';
import QrcodeVue from 'qrcode.vue';

/** 高级详情 */
export default {
  name: 'login-index',
  components: { QrcodeVue },
  data() {
    return {
      loginStep: 'login-step1',
      userInfo: {
        EngName: '',
        DeptNameString: '测试部门',
      },
      src2: 'https://tencent.tdesign.com/vue/components/quick-start',
      showPsw: false,
      psw: '',
      check1: false,
      check2: false,
      countDown: 60,
      countDownText: '59s后重发',
      timer: null,
      captchaSent: false,
      emailOptions: [],
    };
  },
  watch: {
    loginStep() {
      this.userInfo.EngName = '';
      this.psw = '';
    },
  },
  mounted() {
    // 页面初始化时获取用户登录信息，使得登录状态未退出时，默认显示登录信息
    this.userInfo = {
      EngName: this.$store.state.user.loginName,
      DeptNameString: this.$store.state.user.deptNameString,
    };
  },
  methods: {
    nextStep() {
      this.loginStep = 'login-step2';
    },
    checkPsw() {
      const regExp = /^[a-z0-9_]{1,20}$/;
      if (regExp.test(this.psw)) {
        this.check1 = true;
      } else {
        this.check1 = false;
      }
      if (this.psw.indexOf('_') !== -1) {
        this.check2 = true;
      } else {
        this.check2 = false;
      }
    },
    toLogin() {
      this.$store.commit('user/SET_USER_INFO', this.userInfo);
      this.$router.push({
        path: '/',
      });
    },
    toLoginStep(login_step) {
      this.loginStep = login_step;
    },
    // 获取验证码
    waitCodeNumCount() {
      this.captchaSent = true;
      // 验证码60秒倒计时
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.countDown > 0 && this.countDown <= 60) {
            this.countDown -= 1;
            if (this.countDown !== 0) {
              this.countDownText = `${this.countDown}s后重发`;
            } else {
              clearInterval(this.timer);
              this.countDown = 60;
              this.countDownText = '59秒后可重发';
              this.captchaSent = false;
              this.timer = null;
            }
          }
        }, 1000);
      }
    },
    remoteMethod(search) {
      if (search && search.indexOf('@') === -1) {
        this.emailOptions = [
          {
            value: `${search}@qq.com`,
            label: `${search}@qq.com`,
          },
          {
            value: `${search}@gmail.com`,
            label: `${search}@gmail.com`,
          },
          {
            value: `${search}@126.com`,
            label: `${search}@126.com`,
          },
          {
            value: `${search}@163.com`,
            label: `${search}@163.com`,
          },
          {
            value: `${search}@hotmail.com`,
            label: `${search}@hotmail.com`,
          },
          {
            value: `${search}@21cn.com`,
            label: `${search}@21cn.com`,
          },
          {
            value: `${search}@yahoo.com`,
            label: `${search}@yahoo.com`,
          },
        ];
      }
    },
  },
};
</script>
