<template>
  <div>
    <t-row :gutter="12">
      <t-col :lg="6" :xs="12">
        <card title="部署趋势">
          <div class="deploy-panel-left">
            <div id="monitorContainer" style="width: 100%; height: 265px" />
          </div>
        </card>
      </t-col>
      <t-col :lg="6" :xs="12">
        <card title="告警情况">
          <template #option>
            <t-radio-group default-value="dateVal" @change="onAlertChange">
              <t-radio-button value="dateVal"> 本周 </t-radio-button>
              <t-radio-button value="monthVal"> 本月 </t-radio-button>
            </t-radio-group>
          </template>
          <div id="dataContainer" style="width: 100%; height: 265px" />
        </card>
      </t-col>
    </t-row>

    <!-- 项目列表 -->
    <card title="项目列表" class="container-base-margin-top">
      <t-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :hover="hover"
        rowKey="index"
        @sort-change="sortChange"
        @change="rehandleChange"
      >
        <template #op="slotProps">
          <a class="t-button-link" @click="listClick(slotProps)">管理</a>
          <a class="t-button-link" @click="deleteClickOp(slotProps)">删除</a>
        </template>
        <t-icon slot="op-column" name="descending-order" />
      </t-table>
    </card>
    <t-dialog header="基本信息" :visible.sync="visible" @confirm="onConfirm">
      <div slot="body">
        <div class="dialog-info-block">
          <div v-for="(item, index) in baseInfoData" :key="index" class="info-item">
            <h1>{{ item.name }}</h1>
            <span
              :class="{
                ['green']: item.type && item.type.value === 'green',
                ['blue']: item.type && item.type.value === 'blue',
              }"
              >{{ item.value }}</span
            >
          </div>
        </div>
      </div>
    </t-dialog>
  </div>
</template>
<script lang="ts">
import { prefix } from '@/config/global';
import * as echarts from 'echarts/core';
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import Card from '@/components/card/index.vue';
import { BarChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { mapState } from 'vuex';
import { getSmoothLineDataSet, get2ColBarChartDataSet } from '../../dashboard/base/index';
import { TableSort } from 'tdesign-vue';
import model from '@/service/service-detail-deploy';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
]);

/** 部署配置 */
export default {
  name: 'detail-deploy',
  components: { Card },
  data() {
    return {
      monitorContainer: '',
      dataContainer: '',
      dashboardBase: '',
      formData: {},
      data: [],
      prefix,
      bordered: true,
      hover: true,
      pagination: {
        defaultPageSize: 10,
        total: 100,
        defaultCurrent: 1,
        pageSizeOptions: [],
      },
      baseInfoData: model.getBaseInfoData(),
      columns: model.getTableColumns(),
      visible: false,
      areaChart: '',
      timer: '',
      columnChart: '',
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    brandTheme(val): void {
      const { chartColors } = this.$store.state.setting;

      this.areaChart.setOption(getSmoothLineDataSet({ ...chartColors }));
      this.columnChart.setOption(get2ColBarChartDataSet({ ...chartColors }));
    },
    mode() {
      this.renderCharts();
    },
  },
  beforeDestroy(): void {
    clearInterval(this.timer);
  },

  async mounted() {
    this.$request
      .get('/api/get-project-list')
      .then((res) => {
        if (res.code === 0) {
          const { list = [] } = res.data;
          this.data = list;
          this.pagination = {
            ...this.pagination,
            total: list.length,
          };
        }
      })
      .catch((e) => {
        console.log(e);
      });

    window.addEventListener('resize', this.updateContainer, false);

    this.renderCharts();
  },
  methods: {
    onAlertChange(val: string): void {
      // console.log(val);
      const isMonth = val === 'monthVal';
      const { chartColors } = this.$store.state.setting;

      this.columnChart.setOption(get2ColBarChartDataSet({ isMonth, ...chartColors }));
    },
    updateContainer(): void {
      this.areaChart.resize({
        width: this.monitorContainer.clientWidth,
        height: this.monitorContainer.clientHeight,
      });
      this.columnChart.resize({
        width: this.dataContainer.clientWidth,
        height: this.dataContainer.clientHeight,
      });
    },
    sortChange(val: TableSort): void {
      console.log(val);
    },
    rehandleChange(changeParams, triggerAndData): void {
      console.log('统一Change', changeParams, triggerAndData);
    },
    listClick(e): void {
      console.log(e);
      this.visible = true;
    },
    deleteClickOp(e): void {
      this.data.splice(e.rowIndex, 1);
    },
    onConfirm(): void {
      this.visible = false;
    },
    renderCharts(): void {
      const { chartColors } = this.$store.state.setting;

      if (!this.monitorContainer) {
        this.monitorContainer = document.getElementById('monitorContainer');
      }
      this.areaChart = echarts.init(this.monitorContainer);
      this.areaChart.setOption(getSmoothLineDataSet({ ...chartColors }));

      // 定时动态效果
      this.timer = setInterval(() => {
        this.areaChart.setOption(getSmoothLineDataSet({ ...chartColors }));
      }, 3000);

      if (!this.dataContainer) {
        this.dataContainer = document.getElementById('dataContainer');
      }
      this.columnChart = echarts.init(this.dataContainer);
      this.columnChart.setOption(get2ColBarChartDataSet({ ...chartColors }));
    },
  },
};
</script>
<style lang="less" scoped>
@import '../base/index.less';
</style>
