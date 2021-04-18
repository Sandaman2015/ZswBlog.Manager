import request from '@/utils/request'

/**
 * 上传文件
 * @param {*} params 
 * @param {*} data 
 * @param {*} config 
 */
export function upload(params, data, config) {
  return request({
    url: '/api/attachment/upload/image',
    method: 'post',
    params,
    data,
    config
  })
}

/**
 * 通过名称删除文件
 * @param {*} params 
 * @returns 
 */
export function remove(params) {
  return request({
    url: `/api/attachment/delete/image`,
    method: 'delete',
    params
  })
}
/**
 * 获取所有文件列表
 * @param {*} params 
 * @returns 
 */
export function getAll(params) {
  return request({
    url: `/api/attachment/get/all`,
    method: 'get',
    params
  })
}
