<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include="this.aliveViews">
      <router-view v-if="!this.isRefreshing" />
    </keep-alive>
  </transition>
</template>
<script lang="ts">
import { mapGetters } from 'vuex';
import isBoolean from 'lodash/isBoolean';
import isUndefined from 'lodash/isUndefined';

export default {
  computed: {
    ...mapGetters({
      tabRouterList: 'tabRouter/tabRouterList',
      isRefreshing: 'tabRouter/isRefreshing',
      isUseTabsRouter: 'setting/isUseTabsRouter',
    }),
    aliveViews() {
      return this.tabRouterList
        .filter((route) => {
          const keepAliveConfig = route.meta?.keepAlive;
          const isRouteKeepAlive = isUndefined(keepAliveConfig) || (isBoolean(keepAliveConfig) && keepAliveConfig); // 默认开启keepalive
          return route.isAlive && isRouteKeepAlive;
        })
        .map((route) => route.name);
    },
  },
};
</script>
<style lang="less" scoped>
@import '@/style/variables';

.fade-leave-active,
.fade-enter-active {
  transition: opacity @anim-duration-slow @anim-time-fn-easing;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
