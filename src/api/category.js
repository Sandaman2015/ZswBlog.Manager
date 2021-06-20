import request from '@/utils/request'
/**
 * 获取所有分类
 * @param {*} params
 */
export function getAllCategory(params) {
  return request({
    url: `/category/get/all`,
    method: 'get',
    params
  })
}
/**
 * 获取分类详情
 * @param {*} params
 */
export function getCategory(id) {
  return request({
    url: `/category/get/${id}`,
    method: 'get'
  })
}
/**
 * 删除分类
 * @param {*} params
 */
export function removeCategory(id) {
  return request({
    url: `/category/admin/remove/${id}`,
    method: 'delete'
  })
}
/**
 * 保存分类
 * @param {*} params
 */
export function saveCategory(data) {
  return request({
    url: '/category/admin/save',
    method: 'post',
    data
  })
}
/**
 * 更新分类
 * @param {*} params
 */
export function updateCategory(data) {
  return request({
    url: '/category/admin/update',
    method: 'post',
    data
  })
}
