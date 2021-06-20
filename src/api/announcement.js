import request from '@/utils/request'
/**
 * 获取通知公告
 * @param {*} data
 */
export function getAnnouncement(limit, pageIndex) {
  return request({
    url: `/announcement/admin/get/page?limit=${limit}&pageIndex=${pageIndex}`,
    method: 'get'
  })
}
/**
 * 添加通知公告
 * @param {*} data
 */
export function saveAnnouncement(data) {
  return request({
    url: '/announcement/admin/save',
    method: 'post',
    data
  })
}
/**
 * 删除通知公告
 * @param {*} data
 */
export function removeAnnouncement(id) {
  return request({
    url: `/announcement/admin/remove/${id}`,
    method: 'delete'
  })
}
