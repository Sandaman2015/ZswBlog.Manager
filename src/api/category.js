import request from '@/utils/request'

/**
 * 获取所有分类
 * @param {*} params 
 */
export function getAllCategory(params) {
  return request({
    url: '/api/category/get/all',
    method: 'get',
    params,
  })
}
