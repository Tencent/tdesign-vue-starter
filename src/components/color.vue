<template>
  <div :style="style" class="color-container" />
</template>
<script>
import { getBrandColor } from '@/config/color';

export default {
  name: 'color',
  props: {
    value: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    style() {
      return {
        backgroundColor: getBrandColor(this.value)['@brand-color'],
      };
    },
  },
};
</script>
<style lang="less" scoped>
.color-container {
  width: 24px;
  height: 24px;
  display: inline-block;
}
</style>
