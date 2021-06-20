import request from '@/utils/request'
/**
 * 获取通知公告
 * @param {*} data
 */
export function getFriendLink(limit, pageIndex) {
  return request({
    url: `/friendlink/admin/get/page?limit=${limit}&pageIndex=${pageIndex}`,
    method: 'get'
  })
}
/**
 * 更新友情连接
 * @param {*} data
 */
export function updateFriendLink(data) {
  return request({
    url: '/friendlink/admin/update',
    method: 'post',
    data
  })
}
/**
 * 添加友情连接
 * @param {*} data
 */
export function saveFriendLink(data) {
  return request({
    url: '/friendlink/save',
    method: 'post',
    data
  })
}
/**
 * 删除友情连接
 * @param {*} data
 */
export function removeFriendLink(id) {
  return request({
    url: `/friendlink/admin/remove/${id}`,
    method: 'delete'
  })
}
/**
 * 获取友情连接详情
 * @param {*} data
 */
export function getFriendLinkById(id) {
  return request({
    url: `/friendlink/admin/get/${id}`,
    method: 'get'
  })
}
