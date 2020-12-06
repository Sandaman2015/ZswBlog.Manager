import request from '@/utils/request'

/**
 * 添加文章
 * @param {*} data 
 */
export function saveArticle(data) {
  return request({
    url: '/api/article/save',
    method: 'post',
    data,
  })
}
