<template>
  <div class="dashboard-panel-detail">
    <card title="本月采购申请情况">
      <t-row :gutter="[16, 16]">
        <t-col v-for="(item, index) in PANE_LIST_DATA" :key="index" :xs="6" :xl="3">
          <card border class="dashboard-detail-container-item" size="small" :describe="item.title">
            <div class="number">{{ item.number }}</div>
            <div class="dashboard-detail-container-item-text">
              <div class="dashboard-detail-container-item-text-left">
                环比
                <trend class="icon" :type="item.upTrend ? 'up' : 'down'" :describe="item.upTrend || item.downTrend" />
              </div>
              <t-icon name="chevron-right" />
            </div>
          </card>
        </t-col>
      </t-row>
    </card>
    <t-row :gutter="[16, 16]" class="card-container-margin">
      <t-col :xs="12" :xl="9">
        <card title="采购商品申请趋势" describe="(件)">
          <template #option>
            <t-date-picker
              class="card-date-picker-container"
              :default-value="LAST_7_DAYS"
              theme="primary"
              mode="date"
              range
              @change="onMaterialChange"
            />
          </template>
          <div id="lineContainer" style="width: 100%; height: 416px"></div>
        </card>
      </t-col>
      <t-col :xs="12" :xl="3">
        <product-card
          v-for="(item, index) in PRODUCT_LIST"
          :key="index"
          :product="item"
          :class="{ 'card-container-margin': index !== 0 }"
        />
      </t-col>
    </t-row>
    <card title="采购商品满意度分布" class="card-container-margin">
      <template #option>
        <t-date-picker
          class="card-date-picker-container"
          :defaultValue="LAST_7_DAYS"
          theme="primary"
          mode="date"
          range
          @change="onSatisfyChange"
        ></t-date-picker>
        <t-button class="card-date-button">导出数据</t-button>
      </template>
      <div id="scatterContainer" style="width: 100%; height: 374px"></div>
    </card>
  </div>
</template>
<script lang="ts">
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart, ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { mapState } from 'vuex';

import Trend from '@/components/trend/index.vue';
import Card from '@/components/card/index.vue';
import { prefix } from '@/config/global';

import { LAST_7_DAYS } from '@/utils/date';

import ProductCard from '@/pages/list/card/components/compoonent-card.vue';
import { PANE_LIST_DATA, PRODUCT_LIST } from '@/service/service-detail';
import { changeChartsTheme, getFolderLineDataSet, getScatterDataSet } from '../base';

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, ScatterChart, CanvasRenderer]);

export default {
  components: { Trend, Card, ProductCard },
  data() {
    return {
      prefix,
      PANE_LIST_DATA,
      PRODUCT_LIST,
      dashboardBase: '',
      lineContainer: '',
      scatterContainer: '',
      lineChart: '',
      scatterChart: '',
      productList: [
        {
          description: 'SSL证书又叫服务器证书，腾讯云为您提供证书的一站式服务，包括免费、付费证书的申请、管理及部',
          index: 1,
          isSetup: true,
          name: 'SSL证书',
          type: 4,
        },
      ],
      LAST_7_DAYS,
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
  },
  watch: {
    brandTheme() {
      changeChartsTheme([this.lineChart, this.scatterChart]);
    },
    mode() {
      this.renderCharts();
    },
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    /** 采购商品满意度选择 */
    onSatisfyChange(value) {
      const { chartColors } = this.$store.state.setting;

      this.scatterChart.setOption(getScatterDataSet({ dateTime: value, ...chartColors }));
    },
    /** 采购商品申请趋势选择 */
    onMaterialChange(value) {
      const { chartColors } = this.$store.state.setting;

      this.lineChart.setOption(getFolderLineDataSet({ dateTime: value, ...chartColors }));
    },
    updateContainer() {
      this.lineChart.resize?.({
        width: this.lineContainer.clientWidth,
        height: this.lineContainer.clientHeight,
      });
      this.scatterChart.resize?.({
        width: this.scatterContainer.clientWidth,
        height: this.scatterContainer.clientHeight,
      });
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;

      if (!this.lineContainer) {
        this.lineContainer = document.getElementById('lineContainer');
      }
      this.lineChart = echarts.init(this.lineContainer);
      this.lineChart.setOption(getFolderLineDataSet({ ...chartColors }));

      window.addEventListener('resize', this.updateContainer, false);

      if (!this.scatterContainer) {
        this.scatterContainer = document.getElementById('scatterContainer');
      }
      this.scatterChart = echarts.init(this.scatterContainer);
      this.scatterChart.setOption(getScatterDataSet({ ...chartColors }));
    },
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
