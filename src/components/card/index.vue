<template>
  <div class="card-container">
    <div class="card-title">{{ title }}</div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'card',
  props: ['title'],
};
</script>
<style lang="less" scoped>
@import url('@/style/index.less');
.card {
  &-container {
    padding: 16px 16px 0;
    margin-bottom: 16px;
    background: #fff;
    border-radius: 3px;
    width: 100%;
  }

  &-title {
    font-size: 16px;
    line-height: 24px;
    font-family: PingFangSC-Medium;
    margin-bottom: 16px;
    font-weight: 500;
    color: @text-level-1-color;
  }

  &-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}
</style>
