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

/**
 * 添加标签信息
 * @param {*} data 
 */
 export function saveTag(data) {
  return request({
      url: '/api/tag/admin/save',
      method: 'post',
      data,
  })
}
/**
* 删除标签信息
* @param {*} data 
*/
export function removeTag(id) {
  return request({
      url: `/api/tag/admin/remove/${id}`,
      method: 'delete'
  })
}