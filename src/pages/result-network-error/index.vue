<template>
  <result
    title="网络异常"
    tip="当前网络异常，请稍后再试！"
    bgUrl="https://tdesign.gtimg.com/starter/result-page/network-error.png"
  >
    <div>
      <t-button @click="() => this.$router.push('/')" theme="default">返回首页</t-button>
      <t-button @click="() => this.$router.push('/')">重新加载</t-button>
    </div>
  </result>
</template>

<script>
import result from '@/components/result/index.vue';

export default {
  name: 'result-network-error',
  components: { result },
};
</script>
