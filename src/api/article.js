import request from '@/utils/request'

/**
 * 添加文章
 * @param {*} data 
 */
export function saveArticle(data) {
  return request({
    url: '/api/article/admin/save',
    method: 'post',
    data,
  })
}
/**
 * 更新文章
 * @param {*} data 
 */
export function updateArticle(data) {
  return request({
    url: '/api/article/admin/update',
    method: 'post',
    data,
  })
}
/**
 * 获取文章列表
 * @param {*} data 
 */
export function articleList(limit, pageIndex){
  return request({
    url: `/api/article/admin/get/page?limit=${limit}&pageIndex=${pageIndex}`,
    method: 'get'
  })
}
/**
 * 
 * @param {根据类型获取文章} limit 
 * @param {*} pageIndex 
 * @param {*} categoryId 
 */
export function categoryArticleList(limit, pageIndex, categoryId, dimTitle){
  return request({
    url: `/api/article/admin/get/page/category?limit=${limit}&pageIndex=${pageIndex}&categoryId=${categoryId}&dimTitle=${dimTitle}`,
    method: 'get'
  })
}
/**
 * 获取文章详情
 * @param {*} data 
 */
export function articleDetails(id){
  return request({
    url: `/api/article/admin/get/${id}`,
    method: 'get'
  })
}
/**
 * 禁用文章
 * @param {*} id 
 */
export function disabledArticle(data){
  return request({
    url: `/api/article/admin/disable`,
    method: 'post',
    data
  })
}
/**
 * 删除文章
 * @param {*} data 
 */
export function removeArticle(id) {
  return request({
    url: `/api/article/admin/remove/${id}`,
    method: 'post'
  })
}