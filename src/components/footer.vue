<template>
  <div :class="prefix + '-footer'">
    <span> Copyright @ 2021-{{ new Date().getFullYear() }} Tencent. All Rights Reserved </span>
  </div>
</template>

<script>
import { prefix } from '@/config/global';
export default {
  name: `${prefix}-footer`,
  data() {
    return {
      prefix,
    };
  },
};
</script>

<style lang="less" scoped>
@import '@/style/index';

.@{prefix}-footer {
  color: rgba(0, 0, 0, 0.3);
  line-height: 20px;
  text-align: center;
}
</style>
