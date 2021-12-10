<template>
  <header class="login-header">
    <logo-full-icon class="logo" />
    <div class="operations-container">
      <t-button theme="default" shape="square" variant="text" @click="navToGitHub">
        <t-icon name="logo-github" class="icon" />
      </t-button>
      <t-button theme="default" shape="square" variant="text" @click="navToHelper">
        <t-icon name="help-circle" class="icon" />
      </t-button>
      <t-button theme="default" shape="square" variant="text" @click="toggleSettingPanel">
        <t-icon name="setting" class="icon" />
      </t-button>
    </div>
  </header>
</template>

<script>
import LogoFullIcon from '@/assets/logo-full.svg';

export default {
  components: { LogoFullIcon },
  methods: {
    navToGitHub() {
      window.open('https://github.com/TDesignOteam/tdesign-vue-starter');
    },
    navToHelper() {
      window.open('http://tdesign.tencent.com/starter/get-started.html');
    },
    toggleSettingPanel() {
      this.$store.commit('setting/toggleSettingPannel', true);
    },
  },
};
</script>
