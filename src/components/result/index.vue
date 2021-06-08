<template>
  <card>
    <div class="result-container">
      <img class="result-bg-img" :src="bgUrl" />
      <div class="result-tip">{{ tip }}</div>
      <div><router-link class="tdesign-pro-link" to="/">返回首页</router-link></div>
    </div>
  </card>
</template>
<script>
import Card from '@/components/card/index.vue';
export default {
  name: 'result',
  components: { Card },
  props: ['bgUrl', 'tip', 'linkUrl', 'pageHeader'],
};
</script>
<style lang="less" scoped>
@import url('@/style/index.less');
.result {
  &-container {
    min-height: 400px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  &-bg-img {
    width: 256px;
    height: 256px;
  }

  &-tip {
    margin: 16px 0 8px;
    font-size: @font-size-base;
    color: @text-level-2-color;
    line-height: 22px;
  }
}
</style>
