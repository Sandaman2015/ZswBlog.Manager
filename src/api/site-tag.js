import request from '@/utils/request'
/**
 * 获取所有站点标签信息
 * @param {*} data
 */
export function getSiteTags(params) {
  return request({
    url: '/sitetag/get/all',
    method: 'get',
    params
  })
}
/**
 * 添加站点标签信息
 * @param {*} data
 */
export function saveSiteTag(data) {
  return request({
    url: '/siteTag/save',
    method: 'post',
    data
  })
}
/**
 * 删除站点标签信息
 * @param {*} data
 */
export function removeSiteTag(id) {
  return request({
    url: `/siteTag/remove/${id}`,
    method: 'delete'
  })
}
