<template>
  <div>
    <!-- <t-page-header>个人中心1111</t-page-header> -->
    <div class="user-panel">
      <t-row>
        <t-col class="user-left-panel" :flex="3">
          <div class="user-top">
            <div class="user-left-greeting">
              Hi，Image
              <span class="regular"> 下午好，今天是你加入鹅厂的第 100 天～</span>
              <img src="@/assets/tencent-logo.png" class="user-left-logo" />
            </div>
            <div class="user-right-info">
              <div class="head-bar">
                <div class="title">个人信息</div>
                <t-icon name="edit" size="18" />
              </div>
              <t-row class="content" justify="space-between">
                <t-col class="contract" :span="3">
                  <div class="contract-title">手机</div>
                  <div class="contract-detail">+86 13923734567</div>
                </t-col>
                <t-col class="contract" :span="3">
                  <div class="contract-title">座机</div>
                  <div class="contract-detail">734567</div>
                </t-col>
                <t-col class="contract" :span="3">
                  <div class="contract-title">办公邮箱</div>
                  <div class="contract-detail">Account@qq.com</div>
                </t-col>
                <t-col class="contract" :span="3">
                  <div class="contract-title">座位</div>
                  <div class="contract-detail">T32F 012</div>
                </t-col>
                <t-col class="contract" :span="3">
                  <div class="contract-title">管理主体</div>
                  <div class="contract-detail">腾讯集团</div>
                </t-col>
                <t-col class="contract" :span="3">
                  <div class="contract-title">直属上级</div>
                  <div class="contract-detail">Account@qq.com</div>
                </t-col>
                <t-col class="contract" :span="3">
                  <div class="contract-title">职位</div>
                  <div class="contract-detail">高级 UI 设计师</div>
                </t-col>
                <t-col class="contract" :span="3">
                  <div class="contract-title">入职时间</div>
                  <div class="contract-detail">2021-07-01</div>
                </t-col>
                <t-col class="contract" :span="6">
                  <div class="contract-title">所属团队</div>
                  <div class="contract-detail">腾讯/腾讯公司/某事业群/某产品部/某运营中心/商户服务组</div>
                </t-col>
              </t-row>
            </div>
          </div>
          <div class="user-bottom">
            <div class="t-demo-tabs">
              <t-tabs value="second">
                <t-tab-panel value="first" label="内容列表">
                  <p style="padding: 25px">内容列表</p>
                </t-tab-panel>
                <t-tab-panel value="second" label="内容列表">
                  <div class="user-bottom-container">
                    <div class="head-bar">
                      <div class="title">主页访问数据<span class="unit">（次）</span></div>
                      <t-date-picker
                        class="time-picker"
                        :defaultValue="LAST_7_DAYS"
                        theme="primary"
                        mode="date"
                        range
                        @change="onLineChange"
                      ></t-date-picker>
                    </div>
                    <div id="lineContainer" style="width: 100%; height: 330px"></div>
                  </div>
                </t-tab-panel>
                <t-tab-panel value="third" label="内容列表">
                  <p style="padding: 25px">内容列表</p>
                </t-tab-panel>
              </t-tabs>
            </div>
          </div>
        </t-col>
        <t-col class="user-right-panel" :flex="1">
          <div class="user-top">
            <div class="account">
              <img class="img" src="https://tdesign.gtimg.com/starter/personal/avatar4.png" />
              <div class="name">My Account</div>
              <div class="position">XXXG 港澳业务拓展组员工 直客销售</div>
            </div>
          </div>
          <div class="user-middle">
            <div class="head-bar">
              <div class="title">团队成员</div>
              <t-icon name="edit" size="18" />
            </div>
            <t-list :split="false">
              <t-list-item>
                <t-list-item-meta
                  avatar="https://tdesign.gtimg.com/starter/personal/avatar5.png"
                  title="Lovellzhang 张庆霖"
                  description="直客销售 港澳拓展组员工"
                ></t-list-item-meta>
              </t-list-item>
              <t-list-item>
                <t-list-item-meta
                  avatar="https://tdesign.gtimg.com/starter/personal/avatar1.png"
                  title="Jiajingwang 王佳静"
                  description="前端开发 前台研发组员工 "
                ></t-list-item-meta>
              </t-list-item>
              <t-list-item>
                <t-list-item-meta
                  avatar="https://tdesign.gtimg.com/starter/personal/avatar2.png"
                  title="cruisezhang 张超"
                  description="技术产品 产品组员工"
                ></t-list-item-meta>
              </t-list-item>
              <t-list-item>
                <t-list-item-meta
                  avatar="https://tdesign.gtimg.com/starter/personal/avatar3.png"
                  title="Tobchen 陈超建"
                  description="产品运营 港澳拓展组员工"
                ></t-list-item-meta>
              </t-list-item>
            </t-list>
          </div>
          <div class="user-bottom">
            <div class="head-bar">
              <div class="title">服务产品</div>
              <t-icon name="edit" size="18" />
            </div>
            <t-row class="content" justify="space-between">
              <t-col class="contract" :span="4">
                <img src="https://tdesign.gtimg.com/starter/tdesign-icon1.png" class="user-right-logo" />
              </t-col>
              <t-col class="contract" :span="4">
                <img src="https://tdesign.gtimg.com/starter/tdesign-icon2.png" class="user-right-logo" />
              </t-col>
              <t-col class="contract" :span="4">
                <img src="https://tdesign.gtimg.com/starter/tdesign-icon3.png" class="user-right-logo" />
              </t-col>
            </t-row>
          </div>
        </t-col>
      </t-row>
    </div>
  </div>
</template>
<script>
import { prefix } from '@/config/global';

// 导入样式
import './index.less';
import { LAST_7_DAYS } from '@/utils/date.ts';
import * as echarts from 'echarts/core';

import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { getFolderlineDataSet } from '@/pages/dashboard-base/index';

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

export default {
  data() {
    return {
      prefix,
      dashboardBase: '',
      lineContainer: '',
      lineChart: '',
      LAST_7_DAYS,
    };
  },
  mounted() {
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
      ...getFolderlineDataSet(),
    });

    window.addEventListener('resize', this.updateContainer, false);
  },
  methods: {
    /** 图表选择 */
    onLineChange(value) {
      this.lineChart.setOption(getFolderlineDataSet(value));
    },
    updateContainer() {
      this.lineChart.resize({
        width: this.lineContainer.clientWidth,
        height: this.lineContainer.clientHeight,
      });
    },
  },
};
</script>
