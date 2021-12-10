<template>
  <router-view :class="[mode]" />
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  computed: {
    mode() {
      return this.$store.getters['setting/mode'];
    },
  },
});
</script>
