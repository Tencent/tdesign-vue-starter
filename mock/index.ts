import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

export default [
  {
    url: `/api/get-purchase-list`,
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|1-658': [
            {
              index: /S20201228115950[0-9][0-9][0-9]/,
              'pdName|1': ['Macbook', '椅子'],
              pdNum: 'p_tmp_60a637cd0d',
              purchaseNum: '50',
              adminName: '财务部',
              updateTime: '2020-05-20 ' + '@date("HH:mm:ss")',
            },
          ],
        }),
      },
    }),
  },
  {
    url: `/api/get-list`,
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|1-100': [
            {
              'index|+1': 1,
              'status|1': '@natural(0, 4)',
              no: 'BH00@natural(01, 100)',
              name: '@city()' + '办公用品采购项目',
              'paymentType|1': '@natural(0, 1)',
              'contractType|1': '@natural(0, 2)',
              updateTime: '2020-05-30 ' + '@date("HH:mm:ss")',
              amount: '@natural(10, 500),000,000',
              adminName: '@cname()',
            },
          ],
        }),
      },
    }),
  },
  {
    url: '/api/detail-basic',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          name: 'td_20023747',
          loginType: 'Web',
          currentRole: 'Admin',
          rightsList: '通用权限',
          userStatus: '启用',
          language: '简体中文',
          timeZone: '(GMT+08:00)中国时区—北京（Asia/Beijing）',
        }),
      },
    }),
  },
  {
    url: `/api/get-card-list`,
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|1-50': [
            {
              'index|+1': 1,
              isSetup: '@boolean',
              'banner|1': [
                'https://tdesign.gtimg.com/tdesign-pro/cloud-db.jpg',
                'https://tdesign.gtimg.com/tdesign-pro/cloud-server.jpg',
                'https://tdesign.gtimg.com/tdesign-pro/ssl.jpg',
                'https://tdesign.gtimg.com/tdesign-pro/t-sec.jpg',
                'https://tdesign.gtimg.com/tdesign-pro/face-recognition.jpg',
              ],
              'name|1': ['人脸识别', 'SSL证书', 'CVM', '云数据库', 'T-Sec 云防火墙'],
              'description|1': [
                '基于腾讯优图强大的面部分析技术，提供包括人脸检测与分析、五官定位、人脸搜索、人脸比对、人脸',
                '云硬盘为您提供用于CVM的持久性数据块级存储服务。云硬盘中的数据自动地可用区内以多副本冗',
                'SSL证书又叫服务器证书，腾讯云为您提供证书的一站式服务，包括免费、付费证书的申请、管理及部',
                '腾讯安全云防火墙产品，是腾讯云安全团队结合云原生的优势，自主研发的SaaS化防火墙产品，无需客无需客无需客无需客无需客无需客无需客',
                '云数据库MySQL为用户提供安全可靠，性能卓越、易于维护的企业级云数据库服务。',
              ],
            },
          ],
        }),
      },
    }),
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
] as MockMethod[];
