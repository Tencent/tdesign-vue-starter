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
        name: 'vben',
        list: Mock.mock({
          'list|1-10': [{
            'id|+1': 1,
        }],
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
