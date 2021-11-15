<template>
  <result
    title="403 Forbidden"
    tip="抱歉，您无权限访问此页面，企业微信联系创建者xiaolaoshi。"
    bgUrl="https://tdesign.gtimg.com/pro-template/result-page/403.png"
  >
    <div>
      <t-button @click="() => this.$router.push('/')">返回首页</t-button>
    </div>
  </result>
</template>

<script>
import result from '@/components/result/index.vue';

export default {
  name: 'result-403',
  components: { result },
};
</script>
