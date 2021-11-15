<template>
  <result
    title="500 Internal Server Error"
    tip="抱歉，服务器出错啦！"
    bgUrl="https://tdesign.gtimg.com/pro-template/result-page/500.png"
  >
    <div>
      <t-button @click="() => this.$router.push('/')">返回首页</t-button>
    </div>
  </result>
</template>

<script>
import result from '@/components/result/index.vue';

export default {
  name: 'result-500',
  components: { result },
};
</script>
