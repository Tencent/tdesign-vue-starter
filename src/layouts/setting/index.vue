<template>
  <div>
    <!-- 页面配置 -->
    <page-config />
    <!-- 主题皮肤配置 -->
    <td-theme-generator :props-top="0" :show-setting="true" />
  </div>
</template>
<script lang="ts">
import PageConfig from './page-config.vue';

export default {
  components: {
    PageConfig,
  },
  mounted() {
    const themeGenerator = document.querySelector('td-theme-generator');
    themeGenerator?.addEventListener('click-setting', () => {
      this.$store.commit('setting/toggleSettingPanel', true);
    });
    themeGenerator?.addEventListener('panel-drawer-visible', (v) => {
      if ((v as CustomEvent)?.detail?.[0]) {
        this.$store.commit('setting/toggleSettingPanel', false);
      }
    });
  },
};
</script>
