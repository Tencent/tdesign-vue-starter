<template>
  <div>
    <t-drawer
      size="348px"
      :footer="false"
      :visible.sync="showSettingPanel"
      :header="false"
      :closeBtn="false"
      :onCloseBtnClick="handleCloseDrawer"
      class="setting-drawer-container"
    >
      <div class="setting-container">
        <t-form :data="formData" size="large" ref="form" labelAlign="left" @reset="onReset" @submit="onSubmit">
          <div class="setting-container-subgroup">
            <div class="setting-group-title">主题模式</div>
            <t-radio-group v-model="formData.mode">
              <div v-for="(item, index) in MODE_OPTIONS" :key="index" class="setting-layout-drawer">
                <div>
                  <t-radio-button :key="index" :value="item.type">
                    <component :is="getModeIcon(item.type)" class="mode-img" />
                    <picked-icon v-if="formData.mode === item.type" class="picked" />
                  </t-radio-button>
                  <p :style="{ textAlign: 'center', marginTop: '8px' }">{{ item.text }}</p>
                </div>
              </div>
            </t-radio-group>
          </div>
          <div class="setting-container-subgroup">
            <div class="setting-group-title">导航布局</div>

            <t-radio-group v-model="formData.layout">
              <div v-for="(item, index) in LAYOUT_OPTION" :key="index" class="setting-layout-drawer">
                <t-radio-button :key="index" :value="item">
                  <component :is="getLayoutIcon(item)" class="layout-img" />
                  <picked-icon v-if="formData.layout === item" class="picked" />
                </t-radio-button>
              </div>
            </t-radio-group>
          </div>
          <div :class="['setting-container-subgroup', 'setting-config-list']">
            <t-form-item v-if="formData.layout === 'mix'" label="分割菜单（混合模式下有效）" name="splitMenu">
              <t-switch v-model="formData.splitMenu"></t-switch>
            </t-form-item>

            <t-form-item v-if="formData.layout !== 'side'" label="固定 Header" name="isHeaderFixed">
              <t-switch v-model="formData.isHeaderFixed"></t-switch>
            </t-form-item>
            <t-form-item v-if="formData.layout !== 'top'" label="固定 Sidebar" name="isSidebarFixed">
              <t-switch v-model="formData.isSidebarFixed"></t-switch>
            </t-form-item>
          </div>
          <div class="setting-group-title">元素开关</div>
          <div :class="['setting-container-subgroup', 'setting-config-list']">
            <t-form-item label="显示 Header" name="showHeader" v-if="formData.layout === 'side'">
              <t-switch v-model="formData.showHeader"></t-switch>
            </t-form-item>
            <t-form-item label="显示 Breadcrumbs" name="showBreadcrumb">
              <t-switch v-model="formData.showBreadcrumb"></t-switch>
            </t-form-item>
            <t-form-item label="显示 Footer" name="showFooter">
              <t-switch v-model="formData.showFooter"></t-switch>
            </t-form-item>
            <t-form-item label="使用 多标签Tab页" name="isUseTabsRouter">
              <t-switch v-model="formData.isUseTabsRouter"></t-switch>
            </t-form-item>
            <t-form-item
              label="footer 内收"
              name="footerPosition"
              v-if="formData.showFooter && !formData.isSidebarFixed"
            >
              <t-switch v-model="formData.isFooterAside"></t-switch>
            </t-form-item>
          </div>
        </t-form>
        <div class="setting-info">
          <p>请复制后手动修改配置文件: /src/config/style.ts</p>
          <t-button theme="primary" variant="text" @click="handleCopy"> 复制配置项 </t-button>
        </div>
      </div>
    </t-drawer>
  </div>
</template>
<script lang="ts">
import { mapGetters } from 'vuex';
import { PopupVisibleChangeContext } from 'tdesign-vue';

import STYLE_CONFIG from '@/config/style';
import { DEFAULT_COLOR_OPTIONS } from '@/config/color';

import Thumbnail from '@/components/thumbnail/index.vue';
import ColorContainer from '@/components/color/index.vue';

import LayoutMixIcon from '@/assets/assets-layout-mix.svg';
import LayoutSideIcon from '@/assets/assets-layout-side.svg';
import LayoutTopIcon from '@/assets/assets-layout-top.svg';
import PickedIcon from '@/assets/assets-picked.svg';
import SettingDarkIcon from '@/assets/assets-setting-dark.svg';
import SettingLightIcon from '@/assets/assets-setting-light.svg';
import SettingAutoIcon from '@/assets/assets-setting-auto.svg';

const LAYOUT_OPTION = ['side', 'top', 'mix'];

const MODE_OPTIONS = [
  { type: 'light', text: '明亮' },
  { type: 'dark', text: '暗黑' },
  { type: 'auto', text: '跟随系统' },
];

export default {
  name: 'DefaultLayoutSetting',
  components: { Thumbnail, ColorContainer, PickedIcon },
  data() {
    return {
      colors: {
        hex: null,
      },
      MODE_OPTIONS,
      LAYOUT_OPTION,
      DEFAULT_COLOR_OPTIONS,
      visible: false,
      formData: { ...STYLE_CONFIG },
      isColoPickerDisplay: false,
    };
  },
  computed: {
    ...mapGetters('setting', ['showSettingBtn']),
    showSettingPanel: {
      get() {
        return this.$store.state.setting.showSettingPanel;
      },
      set(newVal) {
        this.$store.commit('setting/toggleSettingPanel', newVal);
      },
    },
    iconName() {
      return this.visible ? 'close' : 'setting';
    },
    showOthers() {
      return (this.formData.showFooter && !this.formData.isSidebarFixed) || !this.formData.splitMenu;
    },
    dynamicColor() {
      const isDynamic = DEFAULT_COLOR_OPTIONS.indexOf(this.formData.brandTheme) === -1;
      return isDynamic ? this.formData.brandTheme : '';
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        if (!newVal.brandTheme) return;
        // 没有在formData中 需要从store中同步过来
        const { isSidebarCompact } = this.$store.state.setting;
        this.$store.dispatch('setting/changeTheme', { ...newVal, isSidebarCompact });
      },
      deep: true,
    },
  },
  methods: {
    onPopupVisibleChange(visible: boolean, context: PopupVisibleChangeContext) {
      if (!visible && context.trigger === 'document') this.isColoPickerDisplay = visible;
    },
    onReset(): void {
      this.formData = {
        ...STYLE_CONFIG,
      };
      this.$message.success('已恢复初始设置');
    },
    onSubmit({ result, firstError, e }): void {
      e.preventDefault();
      if (result === true) {
        this.visible = false;
      } else {
        this.$message.warning(firstError);
      }
    },
    getModeIcon(mode: string) {
      if (mode === 'light') {
        return SettingLightIcon;
      }
      if (mode === 'dark') {
        return SettingDarkIcon;
      }
      return SettingAutoIcon;
    },
    getThumbnailUrl(name: string) {
      return `https://tdesign.gtimg.com/starter/setting/${name}.png`;
    },
    getLayoutIcon(mode: string) {
      const layoutIconMap = {
        side: LayoutSideIcon,
        top: LayoutTopIcon,
        mix: LayoutMixIcon,
      };
      return layoutIconMap[mode];
    },
    handleClick(): void {
      this.$store.commit('setting/toggleSettingPanel', true);
    },
    handleCloseDrawer(): void {
      this.$store.commit('setting/toggleSettingPanel', false);
    },
    handleCopy(): void {
      const text = JSON.stringify(this.formData, null, 4);
      this.$copyText(text).then(() => {
        this.$message.closeAll();
        this.$message.success('复制成功');
      });
    },
  },
};
</script>
<style lang="less">
@import '@/style/variables.less';

.setting-drawer-container {
  .t-drawer__body {
    padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-s);
    background-color: var(--td-bg-color-secondarycontainer);
  }

  .t-radio-group.t-size-m {
    min-height: 32px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .t-radio-group {
    margin: var(--td-comp-margin-m) 0;
  }

  .t-radio-group.t-size-m .t-radio-button {
    height: auto;
  }

  .setting-container {
    background-color: var(--td-bg-color-container);
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-l);
    border-radius: var(--td-radius-extraLarge);
    height: 100%;
    &-subgroup {
      margin: var(--td-comp-margin-m) 0;
    }
  }

  .setting-config-list {
    background-color: var(--td-bg-color-secondarycontainer);
    border-radius: var(--td-radius-large);
    padding: var(--td-comp-paddingTB-xs) var(--td-comp-paddingLR-xs);
    > .t-form__item {
      background-color: var(--td-bg-color-container);
      margin-bottom: var(--td-comp-margin-xs);
      padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-m);
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .setting-group-title {
    text-align: left;
    font: var(--td-font-title-medium);
    color: var(--td-text-color-primary);
  }

  .setting-layout-drawer {
    display: flex;
    flex-direction: column;
    align-items: center;

    .t-radio-button {
      display: inline-flex;
      max-height: 78px;
      padding: 0;
      border-radius: var(--td-radius-default);
      border: none;
      > .t-radio-button__label {
        display: inline-flex;
        position: relative;
        .mode-img,
        .layout-img {
          border-radius: 9px;
        }
        .picked {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }

    .t-is-checked {
      border: none;
    }

    .t-form__controls-content {
      justify-content: end;
    }
  }

  .t-form__controls-content {
    justify-content: end;
  }

  .setting-info {
    position: absolute;
    padding: 24px;
    bottom: 0;
    left: 0;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    color: var(--td-text-color-placeholder);
    width: 100%;
    background: var(--td-bg-color-container);
  }
}
</style>
