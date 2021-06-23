<template>
  <card>
    <div class="result-success">
      <t-icon class="result-success-icon" name="check-circle-filled" />
      <div class="result-success-title">项目已创建成功</div>
      <div class="result-success-describe">可以联系负责人分发应用</div>
      <div>
        <t-button>再次创建</t-button>
        <t-button variant="outline">查看进度</t-button>
      </div>
    </div>
  </card>
</template>

<script>
import card from '@/components/card/index.vue';
export default {
  name: 'result-success',
  components: { card },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.result-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
  &-icon {
    font-size: 64px;
    color: @success-color;
  }

  &-title {
    margin-top: 16px;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.9);
    text-align: center;
    line-height: 22px;
  }

  &-describe {
    margin: 16px 0 32px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    line-height: 22px;
  }
}
</style>
