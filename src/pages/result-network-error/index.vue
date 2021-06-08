<template>
  <result
    pageHeader="网络异常"
    tip="网络异常，请稍后再试"
    bgUrl="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/pro-template/result-page/network-error.png"
  >
  </result>
</template>

<script>
import result from '@/components/result/index.vue';
export default {
  name: 'result-network-error',
  components: { result },
};
</script>
