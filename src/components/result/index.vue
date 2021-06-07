<template>
  <div>
    <t-page-header>{{ pageHeader }}</t-page-header>
    <div class="result-container">
      <img class="result-bg-img" :src="bgUrl" />
      <div name="tip">{{ tip }}</div>
      <div name="link">返回首页</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'result',
  props: ['bgUrl', 'tip', 'linkUrl', 'pageHeader'],
};
</script>
<style lang="less" scoped>
@import url('@/style/index.less');
.result {
  &-container {
    background: #fff;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  &-bg-img {
    width: 256px;
    height: 256px;
  }

  &-tip {
    font-size: @font-size-base;
    color: @text-level-2-color;
  }
}
</style>
