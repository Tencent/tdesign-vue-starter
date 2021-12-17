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
          <card title="统计数据" :describe="`(万元)${currentMonth}`">
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
              :style="{ width: `${resizeTime * 326}px`, height: `${resizeTime * 326}px` }"
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
                <t-radio-button value="dateVal">月份</t-radio-button>
                <t-radio-button value="monthVal">季度</t-radio-button>
              </t-radio-group>
            </div>
            <t-table :data="saleTendList" :columns="saleColumns" rowKey="productName" :style="{ overflow: 'scroll' }">
              <template #index="{ rowIndex }">
                <span :class="getRankClass(rowIndex)">
                  {{ rowIndex + 1 }}
                </span>
              </template>
              <span slot="growUp" slot-scope="{ row }">
                <trend :type="row.growUp > 0 ? 'up' : 'down'" :describe="Math.abs(row.growUp)" />
              </span>
              <template #operation="slotProps">
                <a class="link" @click="rehandleClickOp(slotProps)">操作</a>
              </template>
            </t-table>
          </card>
        </t-col>
        <t-col :xs="12" :xl="6">
          <card title="采购订单排名">
            <div slot="option">
              <t-radio-group default-value="dateVal">
                <t-radio-button value="dateVal">月份</t-radio-button>
                <t-radio-button value="monthVal">季度</t-radio-button>
              </t-radio-group>
            </div>
            <t-table :data="buyTendList" :columns="buyColumns" rowKey="productName" :style="{ overflow: 'scroll' }">
              <template #index="{ rowIndex }">
                <span :class="getRankClass(rowIndex)">
                  {{ rowIndex + 1 }}
                </span>
              </template>
              <span slot="growUp" slot-scope="{ row }">
                <trend :type="row.growUp > 0 ? 'up' : 'down'" :describe="Math.abs(row.growUp)" />
              </span>
              <template #operation="slotProps">
                <a class="link" @click="rehandleClickOp(slotProps)">操作</a>
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
                  @change="onWarehouseChange"
                />
              </template>
              <div
                id="dataContainer"
                style="width: 100%; height: 351px"
                ref="dataContainer"
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
    ...mapState('setting', ['brandTheme']),
  },
  watch: {
    brandTheme(val) {
      changeChartsTheme([this.incomeCharts, this.charts, this.lineChartItem, this.pieChart], val);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateContainer();
    });

    window.addEventListener('resize', this.updateContainer, false);
    // 收入汇总图
    if (!this.moneyContainer) {
      this.moneyContainer = document.getElementById('moneyContainer');
    }
    this.moneyCharts = echarts.init(this.moneyContainer);
    this.moneyCharts.setOption(constructInitDashboardDataset('line'));

    // 退款图
    if (!this.incomeContainer) {
      this.incomeContainer = document.getElementById('refundContainer');
    }
    this.incomeCharts = echarts.init(this.incomeContainer);
    this.incomeCharts.setOption(constructInitDashboardDataset('bar'));

    // 出入库概览
    if (!this.dataContainer) {
      this.dataContainer = document.getElementById('dataContainer');
    }
    this.charts = echarts.init(this.dataContainer);
    this.charts.setOption(constructInitDataset(LAST_7_DAYS));

    // 资金走势
    if (!this.monitorContainer) {
      this.monitorContainer = document.getElementById('monitorContainer');
    }
    this.lineChartItem = echarts.init(this.monitorContainer);
    this.lineChartItem.setOption(getLineChartDataSet());

    // 销售合同占比
    if (!this.countContainer) {
      this.countContainer = document.getElementById('countContainer');
    }
    this.pieChart = echarts.init(this.countContainer);
    const option = getPieChartDataSet();
    this.pieChart.setOption(option);

    // 定时动态效果
    // this.timer = setInterval(() => {
    //   this.x += 5;
    //   this.y = Math.floor(Math.sin((this.x / 60) * 2 * Math.PI) * 30) + 30;
    //   this.pieChart.setOption(getPieChartDataSet(this.y));
    // }, 1000);
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

      return `${date.getFullYear()}-${date.getMonth() + 1}  至  ${date2.getFullYear()}-${date2.getMonth() + 1}`;
    },
    /** 资金走趋选择 */
    onCurrencyChange(checkedValues) {
      this.currentMonth = this.getThisMonth(checkedValues);
      this.lineChartItem.setOption(getLineChartDataSet(checkedValues));
    },
    /** 出入库概览日期更新 */
    onWarehouseChange(checkedValues) {
      this.charts.setOption(constructInitDataset(checkedValues));
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
      } else {
        this.resizeTime = 1;
      }
      this.moneyCharts.resize({
        // 根据父容器的大小设置大小
        width: `${this.resizeTime * 120}px`,
        height: `${this.resizeTime * 66}px`,
      });

      this.incomeCharts.resize({
        // 根据父容器的大小设置大小
        width: `${this.resizeTime * 120}px`,
        height: `${this.resizeTime * 42}px`,
      });

      this.pieChart.resize({
        // 根据父容器的大小设置大小
        width: `${this.resizeTime * 326}px`,
        height: `${this.resizeTime * 326}px`,
      });

      this.lineChartItem.resize({
        // 根据父容器的大小设置大小
        width: this.monitorContainer.clientWidth,
        height: `${this.resizeTime * 326}px`,
      });

      this.charts.resize({
        // 根据父容器的大小设置大小
        width: this.dataContainer.clientWidth,
        height: this.dataContainer.clientHeight,
      });
    },

    getRankClass(index) {
      return ['dashboard-rank', { 'dashboard-rank__top': index < 3 }];
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
