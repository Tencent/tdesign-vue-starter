<template>
  <div>
    <div class="dashboard-panel">
      <!-- 顶部 card  -->
      <t-row :gutter="[16, 16]">
        <t-col :xs="6" :xl="3" v-for="(item, index) in panelList" :key="item.title">
          <card :subtitle="item.title" :style="{ height: '168px' }" :class="{ 'main-color': index == 0 }" size="small">
            <div class="dashboard-item">
              <div class="dashboard-item-top">
                <span :style="{ fontSize: `${resizeTime * 36}px` }">{{ item.number }}</span>
              </div>
              <div class="dashboard-item-left">
                <div v-if="index === 0">
                  <div
                    id="moneyContainer"
                    class="dashboard-chart-container"
                    :style="{ width: `${resizeTime * 120}px`, height: `${resizeTime * 66}px`, marginTop: '22px' }"
                  ></div>
                </div>
                <div v-else-if="index === 1">
                  <div
                    id="refundContainer"
                    class="dashboard-chart-container"
                    :style="{ width: `${resizeTime * 120}px`, height: `${resizeTime * 42}px`, marginTop: '24px' }"
                  ></div>
                </div>

                <span v-else-if="index === 2">
                  <t-icon name="usergroup" />
                </span>
                <span v-else>
                  <t-icon name="file" />
                </span>
              </div>
              <div class="dashboard-item-bottom">
                <div class="dashboard-item-block">
                  自从上周以来
                  <trend
                    class="dashboard-item-trend"
                    :type="item.upTrend ? 'up' : 'down'"
                    :is-reverse-color="index === 0"
                    :describe="item.upTrend || item.downTrend"
                  />
                </div>
                <t-icon name="chevron-right" />
              </div>
            </div>
          </card>
        </t-col>
      </t-row>

      <!-- 中部图表  -->
      <t-row :gutter="[16, 16]" class="row-container">
        <t-col :xs="12" :xl="9">
          <card title="统计数据" describe="(万元)">
            <template #option>
              <div class="dashboard-chart-title-container">
                <t-date-picker
                  class="card-date-picker-container"
                  theme="primary"
                  mode="date"
                  range
                  :default-value="LAST_7_DAYS"
                  @change="onCurrencyChange"
                />
              </div>
            </template>
            <div
              id="monitorContainer"
              ref="monitorContainer"
              class="dashboard-chart-container"
              :style="{ width: '100%', height: `${resizeTime * 326}px` }"
            ></div>
          </card>
        </t-col>
        <t-col :xs="12" :xl="3">
          <card title="销售渠道" :describe="currentMonth">
            <div
              id="countContainer"
              ref="countContainer"
              :style="{ width: `${resizeTime * 326}px`, height: `${resizeTime * 326}px`, margin: '0 auto' }"
              class="dashboard-chart-container"
            ></div>
          </card>
        </t-col>
      </t-row>

      <!-- 列表排名 -->
      <t-row :gutter="[16, 16]" class="row-container">
        <t-col :xs="12" :xl="6">
          <card title="销售订单排名">
            <div slot="option">
              <t-radio-group default-value="dateVal">
                <t-radio-button value="dateVal">本周</t-radio-button>
                <t-radio-button value="monthVal">近三个月</t-radio-button>
              </t-radio-group>
            </div>
            <t-table :data="saleTendList" :columns="saleColumns" rowKey="productName">
              <template #index="{ rowIndex }">
                <span :class="getRankClass(rowIndex)">
                  {{ rowIndex + 1 }}
                </span>
              </template>
              <span slot="growUp" slot-scope="{ row }">
                <trend :type="row.growUp > 0 ? 'up' : 'down'" :describe="Math.abs(row.growUp)" />
              </span>
              <template #operation="slotProps">
                <a class="link" @click="rehandleClickOp(slotProps)">详情</a>
              </template>
            </t-table>
          </card>
        </t-col>
        <t-col :xs="12" :xl="6">
          <card title="采购订单排名">
            <div slot="option">
              <t-radio-group default-value="dateVal">
                <t-radio-button value="dateVal">本周</t-radio-button>
                <t-radio-button value="monthVal">近三个月</t-radio-button>
              </t-radio-group>
            </div>
            <t-table :data="buyTendList" :columns="buyColumns" rowKey="productName">
              <template #index="{ rowIndex }">
                <span :class="getRankClass(rowIndex)">
                  {{ rowIndex + 1 }}
                </span>
              </template>
              <span slot="growUp" slot-scope="{ row }">
                <trend :type="row.growUp > 0 ? 'up' : 'down'" :describe="Math.abs(row.growUp)" />
              </span>
              <template #operation="slotProps">
                <a class="link" @click="rehandleClickOp(slotProps)">详情</a>
              </template>
            </t-table>
          </card>
        </t-col>
      </t-row>

      <!-- 出入库概览 -->
      <div class="overview-panel row-container">
        <t-row>
          <t-col :xs="12" :xl="9">
            <card title="出入库概览" describe="(件)">
              <template #option>
                <t-date-picker
                  class="card-date-picker-container"
                  theme="primary"
                  mode="date"
                  range
                  :default-value="LAST_7_DAYS"
                  @change="onStokeDataChange"
                />
              </template>
              <div
                id="stokeContainer"
                style="width: 100%; height: 351px"
                ref="stokeContainer"
                class="dashboard-chart-container"
              ></div>
            </card>
          </t-col>
          <t-col :xs="12" :xl="3">
            <card>
              <template #option>
                <t-button>导出数据</t-button>
              </template>
              <t-row>
                <t-col :xs="6" :xl="12">
                  <card describe="本月出库总计（件）" class="inner-card" size="small">
                    <div class="dashboard-item">
                      <div class="dashboard-item-top">
                        <span>1726</span>
                      </div>
                      <div class="dashboard-item-bottom">
                        <div class="dashboard-item-block">
                          自从上周以来
                          <trend class="dashboard-item-trend" type="down" :is-reverse-color="false" describe="20.3%" />
                        </div>
                      </div>
                    </div>
                  </card>
                </t-col>

                <t-col :xs="6" :xl="12">
                  <card describe="本月入库总计（件）" class="inner-card" size="small">
                    <div class="dashboard-item">
                      <div class="dashboard-item-top">
                        <span>226</span>
                      </div>
                      <div class="dashboard-item-bottom">
                        <div class="dashboard-item-block">
                          自从上周以来
                          <trend class="dashboard-item-trend" type="down" :is-reverse-color="false" describe="20.3%" />
                        </div>
                      </div>
                    </div>
                  </card>
                </t-col>
              </t-row>
            </card>
          </t-col>
        </t-row>
      </div>
    </div>
  </div>
</template>
<script>
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { mapState } from 'vuex';

import { prefix } from '@/config/global';
import { LAST_7_DAYS } from '@/utils/date';

import Trend from '@/components/trend/index.vue';
import Card from '@/components/card/index.vue';

import {
  changeChartsTheme,
  constructInitDataset,
  getPieChartDataSet,
  getLineChartDataSet,
  constructInitDashboardDataset,
} from './index';
import { PANE_LIST, SALE_TEND_LIST, BUY_TEND_LIST, SALE_COLUMNS, BUY_COLUMNS } from '@/service/service-base';

echarts.use([TooltipComponent, LegendComponent, PieChart, GridComponent, LineChart, BarChart, CanvasRenderer]);

export default {
  components: {
    Card,
    Trend,
  },
  data() {
    return {
      x: 0,
      y: 10,
      resizeTime: 1,
      timer: '',
      prefix,
      panelList: PANE_LIST,
      buyTendList: BUY_TEND_LIST,
      saleTendList: SALE_TEND_LIST,
      saleColumns: SALE_COLUMNS,
      buyColumns: BUY_COLUMNS,
      LAST_7_DAYS,
      currentMonth: this.getThisMonth(),
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
  },
  watch: {
    brandTheme() {
      changeChartsTheme([this.refundChart, this.countChart, this.monitorChart, this.stokeChart]);
    },
    mode() {
      [this.moneyCharts, this.refundChart, this.countChart, this.monitorChart, this.stokeChart].forEach((item) => {
        item.dispose();
      });
      this.renderCharts();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateContainer();
    });

    window.addEventListener('resize', this.updateContainer, false);
    this.renderCharts();
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    /** 获取当前选中时间的短时间表达法 */
    getThisMonth(checkedValues = '') {
      let date;
      if (!checkedValues || checkedValues.length === 0) {
        date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      }
      date = new Date(checkedValues[0]);
      const date2 = new Date(checkedValues[1]);
      const startMonth = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const endMonth = date2.getMonth() + 1 > 9 ? date2.getMonth() + 1 : `0${date2.getMonth() + 1}`;

      return `${date.getFullYear()}-${startMonth}  至  ${date2.getFullYear()}-${endMonth}`;
    },
    /** 资金走趋选择 */
    onCurrencyChange(checkedValues) {
      const { chartColors } = this.$store.state.setting;

      this.currentMonth = this.getThisMonth(checkedValues);
      this.monitorChart.setOption(getLineChartDataSet({ dateTime: checkedValues, ...chartColors }));
    },
    /** 出入库概览日期更新 */
    onStokeDataChange(checkedValues) {
      const { chartColors } = this.$store.state.setting;

      this.stokeChart.setOption(constructInitDataset({ dateTime: checkedValues, ...chartColors }));
    },
    go(link) {
      if (link) {
        this.$router.push(link);
      }
    },
    rehandleClickOp(val) {
      console.log(val);
    },
    updateContainer() {
      if (document.documentElement.clientWidth >= 1400 && document.documentElement.clientWidth < 1920) {
        this.resizeTime = (document.documentElement.clientWidth / 2080).toFixed(2);
      } else if (document.documentElement.clientWidth < 1080) {
        this.resizeTime = (document.documentElement.clientWidth / 1080).toFixed(2);
      } else {
        this.resizeTime = 1;
      }
      this.moneyCharts.resize({
        // 根据父容器的大小设置大小
        width: `${this.resizeTime * 120}px`,
        height: `${this.resizeTime * 66}px`,
      });

      this.refundChart.resize({
        // 根据父容器的大小设置大小
        width: `${this.resizeTime * 120}px`,
        height: `${this.resizeTime * 42}px`,
      });

      this.countChart.resize({
        // 根据父容器的大小设置大小
        width: `${this.resizeTime * 326}px`,
        height: `${this.resizeTime * 326}px`,
      });

      this.monitorChart.resize({
        // 根据父容器的大小设置大小
        width: this.monitorContainer.clientWidth,
        height: `${this.resizeTime * 326}px`,
      });

      this.stokeChart.resize({
        // 根据父容器的大小设置大小
        width: this.stokeContainer.clientWidth,
        height: this.stokeContainer.clientHeight,
      });
    },

    getRankClass(index) {
      return ['dashboard-rank', { 'dashboard-rank__top': index < 3 }];
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;

      // 收入汇总图
      if (!this.moneyContainer) {
        this.moneyContainer = document.getElementById('moneyContainer');
      }
      this.moneyCharts = echarts.init(this.moneyContainer);
      this.moneyCharts.setOption(constructInitDashboardDataset('line'));

      // 退款图
      if (!this.refundContainer) {
        this.refundContainer = document.getElementById('refundContainer');
      }
      this.refundChart = echarts.init(this.refundContainer);
      this.refundChart.setOption(constructInitDashboardDataset('bar', chartColors));

      // 出入库概览
      if (!this.stokeContainer) {
        this.stokeContainer = document.getElementById('stokeContainer');
      }
      this.stokeChart = echarts.init(this.stokeContainer);
      this.stokeChart.setOption(constructInitDataset({ dateTime: LAST_7_DAYS, ...chartColors }));

      // 资金走势
      if (!this.monitorContainer) {
        this.monitorContainer = document.getElementById('monitorContainer');
      }
      this.monitorChart = echarts.init(this.monitorContainer);
      this.monitorChart.setOption(getLineChartDataSet({ ...chartColors }));

      // 销售合同占比
      if (!this.countContainer) {
        this.countContainer = document.getElementById('countContainer');
      }
      this.countChart = echarts.init(this.countContainer);

      const option = getPieChartDataSet(chartColors);
      this.countChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>

<style lang="less">
@import '@/style/variables.less';

.card-container.main-color {
  background: @brand-color;
  color: @text-color-primary;

  .card-subtitle {
    color: @text-color-anti;
  }
  .card-describe {
    color: @text-color-anti;
  }

  .dashboard-item-top span {
    color: @text-color-anti;
  }

  .dashboard-item-block {
    color: @text-color-anti;
    opacity: 0.6;
  }

  .dashboard-item-bottom {
    color: @text-color-anti;
  }
}
</style>
