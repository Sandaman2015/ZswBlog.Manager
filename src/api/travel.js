import request from '@/utils/request'
/**
 * 添加旅行分享信息
 * @param {*} data
 */
export function saveTravel(data) {
  return request({
    url: '/travel/admin/save',
    method: 'post',
    data
  })
}

/**
 * 获取旅行分享列表
 * @param {*} data
 */
export function travelList(limit, pageIndex) {
  return request({
    url: `/travel/admin/get/page?limit=${limit}&pageIndex=${pageIndex}`,
    method: 'get'
  })
}

/**
 * 删除分享
 * @param {}} id
 */
export function removeTravel(id) {
  return request({
    url: `/travel/admin/remove/${id}`,
    method: 'delete'
  })
}

/**
 * 获取详情
 * @param {*} id
 * @returns
 */
export function getTravelById(id) {
  return request({
    url: `/travel/admin/get/${id}`,
    method: 'get'
  })
}

/**
 * 获取详情
 * @param {*} id
 * @returns
 */
export function updateTravel(data) {
  return request({
    url: `/travel/admin/update`,
    method: 'post',
    data
  })
}
