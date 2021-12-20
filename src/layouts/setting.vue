<template>
  <div>
    <t-drawer
      size="408px"
      :footer="false"
      :visible.sync="showSettingPanel"
      value="medium"
      header="页面配置"
      :closeBtn="true"
      :onCloseBtnClick="handleCloseDrawer"
      class="setting-drawer-container"
    >
      <div class="setting-container">
        <t-form :data="formData" size="large" ref="form" labelAlign="left" @reset="onReset" @submit="onSubmit">
          <div class="setting-group-title">主题模式</div>
          <t-radio-group v-model="formData.mode">
            <div v-for="(item, index) in modeOption" :key="index" class="setting-layout-drawer">
              <div>
                <t-radio-button :key="index" :value="item.type"
                  ><thumbnail :src="getThumbnailUrl(item.type)"
                /></t-radio-button>
                <p :style="{ textAlign: 'center', marginTop: '8px' }">{{ item.text }}</p>
              </div>
            </div>
          </t-radio-group>
          <div class="setting-group-title">主题色</div>
          <t-radio-group v-model="formData.brandTheme">
            <div v-for="(item, index) in colorOption" :key="index" class="setting-layout-drawer">
              <t-radio-button :key="index" :value="item" class="setting-layout-color-group"
                ><color-container :value="item" />
              </t-radio-button>
            </div>
          </t-radio-group>
          <div class="setting-group-color">
            <color-picker
              v-model="colors"
              v-if="formData.brandTheme === 'dynamic' && isColorPickerDisplay"
              @blur="handleColorPickerBlur"
            ></color-picker>
          </div>
          <div class="setting-group-title">导航布局</div>

          <t-radio-group v-model="formData.layout">
            <div v-for="(item, index) in layoutOption" :key="index" class="setting-layout-drawer">
              <t-radio-button :key="index" :value="item"><thumbnail :src="getThumbnailUrl(item)" /></t-radio-button>
            </div>
          </t-radio-group>

          <!-- <t-form-item label="导航风格" name="theme" class="setting-route-theme">
              <t-radio-group v-model="formData.theme" defaultValue="light" variant="default-filled" size="small">
                <t-radio-button value="light">明亮</t-radio-button>
                <t-radio-button value="dark">暗黑</t-radio-button>
              </t-radio-group>
            </t-form-item> -->

          <t-form-item v-show="formData.layout === 'mix'" label="分割菜单（混合模式下有效）" name="splitMenu">
            <t-switch v-model="formData.splitMenu"></t-switch>
          </t-form-item>

          <t-form-item v-show="formData.layout !== 'side'" label="固定 Header" name="isHeaderFixed">
            <t-switch v-model="formData.isHeaderFixed"></t-switch>
          </t-form-item>
          <t-form-item v-show="formData.layout !== 'top'" label="固定 Sidebar" name="isSidebarFixed">
            <t-switch v-model="formData.isSidebarFixed"></t-switch>
          </t-form-item>

          <div class="setting-group-title">元素开关</div>
          <t-form-item label="显示 Header" name="showHeader" v-show="formData.layout === 'side'">
            <t-switch v-model="formData.showHeader"></t-switch>
          </t-form-item>
          <t-form-item label="显示 Breadcrumbs" name="showBreadcrumb">
            <t-switch v-model="formData.showBreadcrumb"></t-switch>
          </t-form-item>
          <t-form-item label="显示 Footer" name="showFooter">
            <t-switch v-model="formData.showFooter"></t-switch>
          </t-form-item>
          <t-form-item
            label="footer 内收"
            name="footerPosition"
            v-show="formData.showFooter && !formData.isSidebarFixed"
          >
            <t-switch v-model="formData.isFooterAside"></t-switch>
          </t-form-item>
        </t-form>
        <div class="setting-info">
          <p>请复制后手动修改配置文件: /src/config/style.js</p>
          <t-button theme="primary" variant="text" @click="handleCopy"> 复制配置项 </t-button>
        </div>
      </div>
    </t-drawer>
  </div>
</template>
<script lang="ts">
import { mapGetters } from 'vuex';
import { Color } from 'tvision-color';
import { Sketch } from 'vue-color';

import STYLE_CONFIG from '@/config/style';
import { insertThemeStylesheet, generateColorMap } from '@/config/color';

import Thumbnail from '@/components/thumbnail/index.vue';
import ColorContainer from '@/components/color/index.vue';

export default {
  name: 'DefaultLayoutSetting',
  components: { Thumbnail, ColorContainer, 'color-picker': Sketch },
  data() {
    return {
      colors: {
        hex: null,
      },
      modeOption: [
        { type: 'light', text: '明亮' },
        { type: 'dark', text: '暗黑' },
        { type: 'auto', text: '跟随系统' },
      ],
      layoutOption: ['side', 'top', 'mix'],
      colorOption: ['default', 'purple', 'cyan', 'green', 'yellow', 'orange', 'red', 'pink', 'dynamic'],
      visible: false,
      formData: { ...STYLE_CONFIG },
      isColorPickerDisplay: false,
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
  },
  watch: {
    formData: {
      handler(newVal) {
        this.$store.dispatch('setting/changeTheme', newVal);
        if (newVal.brandTheme === 'dynamic') {
          this.isColorPickerDisplay = true;
        }
      },
      deep: true,
    },
    colors: {
      handler(newColor) {
        const { hex } = newColor;
        // hex 主题色
        const newPalette = Color.getPaletteByGradation({
          colors: [hex],
          step: 10,
        })[0];
        const { mode } = this.$store.state.setting;
        const colorMap = generateColorMap(hex, newPalette, mode);

        this.$store.commit('setting/addColor', { [hex]: colorMap });

        insertThemeStylesheet(hex, colorMap, mode);

        this.$store.dispatch('setting/changeTheme', { ...this.formData, brandTheme: hex });
      },
    },
  },

  methods: {
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
    getThumbnailUrl(name: string) {
      return `https://tdesign.gtimg.com/starter/setting/${name}.png`;
    },
    handleClick(): void {
      this.$store.commit('setting/toggleSettingPanel', true);
      // this.visible = !this.visible;
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

.tdesign-setting {
  z-index: 100;
  position: fixed;
  bottom: 200px;
  right: 0;
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1), visibility 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  height: 40px;
  width: 40px;
  border-radius: 20px 0 0 20px;
  transition: all 0.3s;

  .t-icon {
    margin-left: 8px;
  }

  .tdesign-setting-text {
    font-size: 12px;
    display: none;
  }

  &:hover {
    width: 96px;

    .tdesign-setting-text {
      display: inline-block;
    }
  }
}

.setting-layout-color-group {
  display: inline-flex;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 50% !important;
  padding: 6px !important;
  border: 2px solid transparent !important;

  > .t-radio-button__label {
    display: inline-flex;
  }
}

.tdesign-setting-close {
  position: fixed;
  bottom: 200px;
  right: 300px;
}

.setting-group-title {
  font-size: 14px;
  line-height: 22px;
  margin: 32px 0 24px 0;
  text-align: left;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 500;
  color: @text-color-primary;
}

.setting-group-color {
  position: relative;

  > div {
    position: absolute;
    z-index: 2;
    right: 0;
  }
}

.setting-link {
  cursor: pointer;
  color: @brand-color;
  margin-bottom: 8px;
}

.setting-info {
  position: absolute;
  padding: 24px;
  bottom: 0;
  left: 0;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  color: @text-color-placeholder;
  width: 100%;
  background: @bg-color-container;
}

.setting-drawer-container {
  .setting-container {
    padding-bottom: 100px;
  }

  .t-radio-group.t-radio-group-medium {
    min-height: 32px;
    width: 100%;
    height: auto;
    justify-content: space-between;
    align-items: center;
  }

  .setting-layout-drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;

    .t-radio-button {
      display: inline-flex;
      max-height: 78px;
      padding: 6px;
      border-radius: @border-radius;
      border: 2px solid #e3e6eb;

      // &:last-child {
      //   border-right: 2px solid transparent;
      // }

      > .t-radio-button__label {
        display: inline-flex;
      }
    }

    .t-is-checked {
      border: 2px solid @brand-color !important;
    }

    .t-form__controls--content {
      justify-content: end;
    }
  }

  .t-form__controls--content {
    justify-content: end;
  }
}

.setting-route-theme {
  .t-form__label {
    min-width: 310px !important;
    color: @text-color-secondary;
  }
}

.setting-color-theme {
  .setting-layout-drawer {
    .t-radio-button {
      height: 32px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
