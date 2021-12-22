<template>
  <t-row :gutter="[16, 16]">
    <t-col :flex="3">
      <div class="user-left-greeting">
        <div>
          Hi，Image
          <span class="regular"> 下午好，今天是你加入鹅厂的第 100 天～</span>
        </div>
        <img src="@/assets/assets-tencent-logo.png" class="logo" />
      </div>

      <card class="user-info-list" size="small" title="个人信息">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-row class="content" justify="space-between">
          <t-col v-for="(item, index) in USER_INFO_LIST" :key="index" class="contract" :span="item.span || 3">
            <div class="contract-title">
              {{ item.title }}
            </div>
            <div class="contract-detail">
              {{ item.content }}
            </div>
          </t-col>
        </t-row>
      </card>

      <card class="content-container">
        <t-tabs value="second">
          <t-tab-panel value="first" label="内容列表">
            <p>内容列表</p>
          </t-tab-panel>
          <t-tab-panel value="second" label="内容列表">
            <card class="card-padding-no" title="主页访问数据" describe="（次）">
              <template #options>
                <t-date-picker
                  class="card-date-picker-container"
                  :default-value="LAST_7_DAYS"
                  theme="primary"
                  mode="date"
                  range
                  @change="onLineChange"
                />
              </template>
              <div id="lineContainer" style="width: 100%; height: 330px" />
            </card>
          </t-tab-panel>
          <t-tab-panel value="third" label="内容列表">
            <p>内容列表</p>
          </t-tab-panel>
        </t-tabs>
      </card>
    </t-col>

    <t-col :flex="1">
      <card class="user-intro">
        <t-avatar size="90px">T</t-avatar>
        <div class="name">My Account</div>
        <div class="position">XXG 港澳业务拓展组员工 直客销售</div>
      </card>

      <card title="团队成员" class="user-team" size="small">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-list :split="false">
          <t-list-item v-for="(item, index) in TEAM_MEMBERS" :key="index">
            <t-list-item-meta :image="item.avatar" :title="item.title" :description="item.description" />
          </t-list-item>
        </t-list>
      </card>

      <card title="服务产品" class="product-container" size="small">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-row class="content" :getters="16">
          <t-col :span="3">
            <product-a-icon />
          </t-col>
          <t-col :span="3">
            <product-b-icon />
          </t-col>
          <t-col :span="3">
            <product-c-icon />
          </t-col>
          <t-col :span="3">
            <product-d-icon />
          </t-col>
        </t-row>
      </card>
    </t-col>
  </t-row>
</template>
<script>
import { prefix } from '@/config/global';

import { LAST_7_DAYS } from '@/utils/date.ts';
import * as echarts from 'echarts/core';
import { mapState } from 'vuex';

import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { changeChartsTheme, getFolderLineDataSet } from '@/pages/dashboard/base/index';

import { USER_INFO_LIST, TEAM_MEMBERS, PRODUCT_LIST } from '@/service/service-user';
import ProductAIcon from '@/assets/assets-product-1.svg';
import ProductBIcon from '@/assets/assets-product-2.svg';
import ProductCIcon from '@/assets/assets-product-3.svg';
import ProductDIcon from '@/assets/assets-product-4.svg';

import Card from '@/components/card/index.vue';

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

export default {
  components: {
    Card,
    ProductAIcon,
    ProductBIcon,
    ProductCIcon,
    ProductDIcon,
  },
  data() {
    return {
      prefix,
      dashboardBase: '',
      lineContainer: '',
      lineChart: '',
      LAST_7_DAYS,
      USER_INFO_LIST,
      TEAM_MEMBERS,
      PRODUCT_LIST,
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
  },
  watch: {
    brandTheme() {
      changeChartsTheme([this.lineChart]);
    },
    mode() {
      this.renderCharts();
    },
    lineChart() {
      this.updateContainer();
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateContainer, false);
    this.renderCharts();
    this.$nextTick(() => {
      this.updateContainer();
    });
  },
  methods: {
    /** 图表选择 */
    onLineChange(value) {
      this.lineChart.setOption(getFolderLineDataSet({ dateTime: value }));
    },
    updateContainer() {
      this.lineChart.resize?.({
        width: this.lineContainer.clientWidth,
        height: this.lineContainer.clientHeight,
      });
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;
      if (!this.lineContainer) {
        this.lineContainer = document.getElementById('lineContainer');
      }
      this.lineChart = echarts.init(this.lineContainer);
      this.lineChart.setOption({
        grid: {
          x: 30, // 默认是80px
          y: 30, // 默认是60px
          x2: 10, // 默认80px
          y2: 30, // 默认60px
        },
        ...getFolderLineDataSet({ ...chartColors }),
      });
    },
    getIcon(type) {
      switch (type) {
      case 'a':
        return ProductAIcon;
      case 'b':
        return ProductBIcon;
      case 'c':
        return ProductCIcon;
      case 'd':
        return ProductDIcon;
      default:
        return ProductAIcon;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
