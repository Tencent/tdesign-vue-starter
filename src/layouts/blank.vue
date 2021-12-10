<template>
  <div class="tdesign-wrapper">
    <router-view />
    <tdesign-setting />
  </div>
</template>
<script>
import TdesignSetting from '@/components/setting.vue';

export default {
  components: {
    TdesignSetting,
  },
};
</script>
<style lang="less" scoped>
.tdesign-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
