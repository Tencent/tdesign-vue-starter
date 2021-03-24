<template>
  <div class="tdesign-footer">
    <span> Copyright @ 2021-{{ new Date().getFullYear() }} Tencent. All Rights Reserved </span>
  </div>
</template>

<script>
export default {
  name: 'tdesignFooter',
};
</script>

<style lang="less" scoped>
.tdesign-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 24px;
  opacity: 0.6;
  line-height: 24px;
  text-align: center;
}
</style>
