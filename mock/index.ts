/* eslint-disable */
import { MockMethod } from 'vite-plugin-mock';
const Mock = require('mockjs');
export default [
  {
    url: '/api/get-list',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|1-100': [{
            'index|+1': 1,
            'name': '@ctitle(2,4)',
            'updateTime': '@date("HH:mm:ss")',
            'adminName': '@cname'
        }]
      }),
    }
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
