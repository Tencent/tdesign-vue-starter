<template>
  <result
    pageHeader="404"
    title="404 Not Found"
    tip="抱歉，您访问的页面不存在。"
    bgUrl="https://tdesign.gtimg.com/pro-template/result-page/404.png"
  >
    <div>
      <t-button @click="() => this.$router.push('/')">返回首页</t-button>
    </div>
  </result>
</template>

<script>
import result from '@/components/result/index.vue';

export default {
  name: 'result-404',
  components: { result },
};
</script>
