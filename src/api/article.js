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
 * 获取文章详情
 * @param {*} data 
 */
export function articleDetails(id){
  return request({
    url: `/api/article/admin/get/${id}`,
    method: 'get'
  })
}