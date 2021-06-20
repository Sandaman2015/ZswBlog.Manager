import request from '@/utils/request'
/**
 * 获取留言列表
 * @param {*} data 
 */
export function getMessageList(limit, pageIndex) {
  return request({
    url: `/api/message/admin/get/page?limit=${limit}&pageIndex=${pageIndex}`,
    method: 'get',
  })
}

/**
 * 删除留言
 * @param {*} data 
 */
export function removeMessage(id) {
  return request({
    url: `/api/message/admin/remove/${id}`,
    method: 'delete'
  })
}
/**
 * 更新留言
 * @param {*} data 
 */
export function updateMessage(id, isShow) {
  return request({
    url: `/api/message/admin/update?id=${id}&isShow=${isShow}`,
    method: 'post'
  })
}
