import request from '@/utils/request'

/**
 * 获取所有文章标签
 * @param {*} params 
 */
export function getAllTag(params) {
  return request({
    url: '/api/tag/get/all',
    method: 'get',
    params,
  })
}
