import request from '@/utils/request'

/**
 * 上传文件
 * @param {*} params 
 * @param {*} data 
 * @param {*} config 
 */
export function upload(params,data,config) {
  return request({
    url: '/api/attachment/upload/image',
    method: 'post',
    params,
    data,
    config
  })
}
