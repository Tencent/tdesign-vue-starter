<template>
  <div>
    <common-table />
  </div>
</template>
<script lang="ts">
import CommonTable from '../components/CommonTable.vue';

export default {
  name: 'list-base',
  components: {
    CommonTable,
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables';
.@{prefix} {
  &-panel {
    background-color: @bg-color-container;
    padding: @spacer-3;
    border-radius: @border-radius;
  }

  &-operater-row {
    margin-bottom: 16px;
  }

  &-form-item-content {
    width: 240px;
    display: inline-block;
    margin-right: 40px;
  }
}
</style>
