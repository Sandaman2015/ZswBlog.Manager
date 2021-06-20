import request from '@/utils/request'
/**
 * 添加时间线
 * @param {*} data
 */
export function saveTimeline(data) {
  return request({
    url: '/timeline/admin/save',
    method: 'post',
    data
  })
}

/**
 * 获取时间线列表
 * @param {*} data
 */
export function getTimeLineList(limit, pageIndex) {
  return request({
    url: `/timeline/get/all`,
    method: 'get'
  })
}

/**
 * 删除时间线
 * @param {}} id
 */
export function removeTimeLine(id) {
  return request({
    url: `/timeline/admin/remove/${id}`,
    method: 'delete'
  })
}
