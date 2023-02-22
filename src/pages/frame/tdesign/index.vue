<template>
  <div :class="`${prefix}-iframe-page`" :style="getWrapStyle">
    <t-loading :loading="loading" size="large" :style="getWrapStyle">
      <iframe ref="frameRef" :src="frameSrc" :class="`${prefix}-iframe-page__main`" @load="hideLoading"></iframe>
    </t-loading>
  </div>
</template>
<script lang="ts">
import { prefix } from '@/config/global';
import STYLE_CONFIG from '@/config/style';

const computedStyle = getComputedStyle(document.documentElement);
const sizeXxxl = computedStyle.getPropertyValue('--td-comp-size-xxxl');
const paddingTBXxl = computedStyle.getPropertyValue('--td-comp-paddingTB-xxl');

export default {
  name: 'DetailAdvanced',
  data() {
    return {
      prefix,
      loading: true,
      frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
      settingStore: { ...STYLE_CONFIG },
      getWrapStyle: `height: ${window.innerHeight}px`,
    };
  },
  mounted() {
    window.addEventListener('resize', this.calcHeight, false);
    this.$nextTick(() => {
      this.calcHeight();
    });
  },
  methods: {
    hideLoading() {
      this.loading = false;
      this.calcHeight();
    },

    getOuterHeight(dom: Element) {
      let height = dom.clientHeight;
      const computedStyle = window.getComputedStyle(dom);
      height += parseInt(computedStyle.marginTop, 10);
      height += parseInt(computedStyle.marginBottom, 10);
      height += parseInt(computedStyle.borderTopWidth, 10);
      height += parseInt(computedStyle.borderBottomWidth, 10);
      return height;
    },

    calcHeight() {
      const iframe = this.$refs.frameRef;
      if (!iframe) {
        return;
      }
      let clientHeight = 0;
      const { showFooter, isUseTabsRouter, showBreadcrumb } = this.settingStore;
      const headerHeight = parseFloat(sizeXxxl);
      const navDom = document.querySelector('.t-tabs__nav');
      const navHeight = isUseTabsRouter ? this.getOuterHeight(navDom) : 0;
      const breadcrumbDom = document.querySelector('.t-breadcrumb');
      const breadcrumbHeight = showBreadcrumb ? this.getOuterHeight(breadcrumbDom) : 0;
      const contentPadding = parseFloat(paddingTBXxl) * 2;
      const footerDom = document.querySelector('.t-layout__footer');
      const footerHeight = showFooter ? this.getOuterHeight(footerDom) : 0;
      const top = headerHeight + navHeight + breadcrumbHeight + contentPadding + footerHeight + 2;
      window.innerHeight -= top;
      clientHeight = document.documentElement.clientHeight - top;
      iframe.style.height = `${clientHeight}px`;
      this.getWrapStyle = `height: ${window.innerHeight}px`;
    },
  },
};
</script>
<style lang="less" scoped>
@import '@/style/variables';

.@{starter-prefix}-iframe-page {
  &__main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    border: 0;
    box-sizing: border-box;
  }
}
</style>
