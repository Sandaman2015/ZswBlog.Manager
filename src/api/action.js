import request from '@/utils/request'

/**
 * 获取操作日志列表
 * @param {*} data
 */
export function getActionLogList(params) {
  return request({
    url: '/action/admin/get/page',
    method: 'get',
    params: params
  })
}
/**
 * 获取操作详情
 * @param {*} id
 */
export function getActionLogById(id) {
  return request({
    url: `/action/admin/get/${id}`,
    method: 'get'
  })
}
