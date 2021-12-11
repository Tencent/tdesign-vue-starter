<template>
  <div :style="style" class="color-container" />
</template>
<script>
import { getBrandColor } from '@/config/color';

export default {
  name: 'Color',
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-block;
}
</style>
