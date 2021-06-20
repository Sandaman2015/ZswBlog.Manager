import request from '@/utils/request'
/**
 * 获取评论列表
 * @param {*} data
 */
export function getCommentList(limit, pageIndex) {
  return request({
    url: `/comment/admin/get/page?limit=${limit}&pageIndex=${pageIndex}`,
    method: 'get'
  })
}

/**
 * 删除评论
 * @param {*} data
 */
export function removeComment(id) {
  return request({
    url: `/comment/admin/remove/${id}`,
    method: 'delete'
  })
}
/**
 * 更新评论
 * @param {*} data
 */
export function updateComment(id, isShow) {
  return request({
    url: `/comment/admin/update?id=${id}&isShow=${isShow}`,
    method: 'post'
  })
}
