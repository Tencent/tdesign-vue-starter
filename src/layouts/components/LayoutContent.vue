<template>
  <t-layout :class="[`${prefix}-layout`]">
    <t-tabs
      v-if="isUseTabsRouter"
      theme="card"
      :class="`${prefix}-layout-tabs-nav`"
      :value="$route.path"
      @change="handleChangeCurrentTab"
      :style="{ position: 'sticky', top: 0, width: '100%' }"
    >
      <t-tab-panel
        v-for="(route, idx) in tabRouterList"
        :value="route.path"
        :key="`${route.path}_${idx}`"
        :removable="!route.isHome"
        @remove="() => this.handleRemove(route.path, idx)"
      >
        <template #label>
          <t-dropdown
            trigger="context-menu"
            :minColumnWidth="128"
            :popupProps="{ overlayClassName: 'route-tabs-dropdown' }"
          >
            <template v-if="!route.isHome">
              {{ route.title }}
            </template>
            <home-icon v-else />
            <template #dropdown>
              <t-dropdown-menu v-if="this.$route.path === route.path">
                <t-dropdown-item @click="() => this.handleRefresh(route.path, idx)">
                  <refresh-icon />
                  刷新
                </t-dropdown-item>
                <t-dropdown-item v-if="idx > 0" @lick="() => this.handleCloseAhead(route.path, idx)">
                  <arrow-left-icon />
                  关闭左侧
                </t-dropdown-item>
                <t-dropdown-item
                  v-if="idx < this.tabRouterList.length - 1"
                  @click="() => this.handleCloseBehind(route.path, idx)"
                >
                  <arrow-right-icon />
                  关闭右侧
                </t-dropdown-item>
                <t-dropdown-item @click="() => this.handleCloseOther(route.path, idx)">
                  <close-circle-icon />
                  关闭其它
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </template>
      </t-tab-panel>
    </t-tabs>
    <t-content :class="`${prefix}-content-layout`">
      <layout-breadcrumb v-if="setting.showBreadcrumb" />
      <common-content />
    </t-content>
    <t-footer v-if="showFooter" :class="`${prefix}-footer-layout`">
      <layout-footer />
    </t-footer>
  </t-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { RefreshIcon, ArrowLeftIcon, ArrowRightIcon, HomeIcon, CloseCircleIcon } from 'tdesign-icons-vue';

import CommonContent from './Content.vue';
import LayoutBreadcrumb from './Breadcrumb.vue';
import LayoutFooter from './Footer.vue';

import { prefix } from '@/config/global';
import { SettingType } from '@/interface';

export default Vue.extend({
  name: 'LayoutContent',
  components: {
    CommonContent,
    LayoutFooter,
    LayoutBreadcrumb,
    RefreshIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    HomeIcon,
    CloseCircleIcon,
  },
  data() {
    return {
      prefix,
    };
  },
  computed: {
    ...mapGetters({
      showFooter: 'setting/showFooter',
      mode: 'setting/mode',
      isUseTabsRouter: 'setting/isUseTabsRouter',
      menuRouters: 'permission/routers',
      tabRouterList: 'tabRouter/tabRouterList',
    }),
    setting(): SettingType {
      return this.$store.state.setting;
    },
  },
  methods: {
    handleRemove(path: string, routeIdx: number) {
      const nextRouter = this.tabRouterList[routeIdx + 1] || this.tabRouterList[routeIdx - 1];

      this.$store.commit('tabRouter/subtractCurrentTabRouter', { path, routeIdx });
      if (path === this.$router.history?.current?.path) {
        this.$router.push(nextRouter.path);
      }
    },
    handleChangeCurrentTab(path: string) {
      this.$router.push(path);
    },
    handleRefresh(currentPath: string, routeIdx: number) {
      this.$store.commit('tabRouter/toggleTabRouterAlive', routeIdx);
      this.$nextTick(() => {
        this.$store.commit('tabRouter/toggleTabRouterAlive', routeIdx);
        this.$router.replace({ path: currentPath });
      });
    },
    handleCloseAhead(path: string, routeIdx: number) {
      this.$store.commit('tabRouter/subtractTabRouterAhead', { path, routeIdx });
    },
    handleCloseBehind(path: string, routeIdx: number) {
      this.$store.commit('tabRouter/subtractTabRouterBehind', { path, routeIdx });
    },
    handleCloseOther(path: string, routeIdx: number) {
      this.$store.commit('tabRouter/subtractTabRouterOther', { path, routeIdx });
    },
  },
});
</script>
