<template>
  <div class="result-container">
    <img class="result-bg-img" :src="bgUrl" />
    <div class="result-title">{{ title }}</div>
    <div class="result-tip">{{ tip }}</div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'result',
  props: ['bgUrl', 'title', 'tip', 'linkUrl'],
};
</script>
<style lang="less" scoped>
@import url('@/style/index.less');

.result {

  &-link {
    color: @brand-color;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: @brand-color;
    }

    &:active {
      color: @brand-color;
    }

    &--active {
      color: @brand-color;
    }

    &:focus {
      text-decoration: none;
    }
  }

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
    width: 240px;
    height: 240px;
  }

  &-title {
    font-style: normal;
    font-weight: 500;
    margin-top: 8px;
    font-size: @font-size-xl;
    line-height: @text-line-height-xl;
  }

  &-tip {
    margin: 8px 0 32px;
    font-size: @font-size-base;
    color: @text-color-secondary;
    line-height: @text-line-height-base;
  }
}
</style>
