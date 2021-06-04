<template>
  <img :class="className" :src="url" />
</template>
<script>
export default {
  name: 'thumbnail',
  props: {
    url: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'layout',
    },
  },
  computed: {
    className() {
      return [
        'thumbnail-container',
        {
          'thumbnail-circle': this.type === 'circle',
          'thumbnail-layout': this.type === 'layout',
        },
      ];
    },
  },
};
</script>
<style lang="less" scoped>
@import url('@/style/index.less');
.thumbnail {
  &-container {
    display: inline-block;
  }

  &-circle {
    border-radius: 50%;
  }

  &-layout {
    width: 120px;
    height: 70px;
  }
}
</style>
