import axios from 'axios'
import request from '@/utils/request'
/**
 * 随机获取美丽文章信息
 * @param {*} data
 */
export function getRandomText() {
  return axios({
    methods: 'get',
    url: 'https:/.ixiaowai.cn/ylapi/index.php'
  })
}
export function getInitVideoConfig() {
  return request({
    url: `/config/get/index`,
    method: 'get'
  })
}

export function getDetailsConfig() {
  return request({
    url: `/config/get/details`,
    method: 'get'
  })
}

export function getIllustrationConfig() {
  return request({
    url: `/config/get/illustration`,
    method: 'get'
  })
}
/**
 * 更新详情配置
 * @param {*} data
 * @returns
 */
export function updateDetailsConfig(data) {
  return request({
    url: `/config/admin/update/details`,
    method: 'post',
    data
  })
}
/**
 * 更新插图配置
 * @param {*} data
 * @returns
 */
export function updateIllustrationConfig(data) {
  return request({
    url: `/config/admin/update/illustration`,
    method: 'post',
    data
  })
}
/**
 * 更新首页配置
 * @param {*} data
 * @returns
 */
export function updateIndexConfig(data) {
  return request({
    url: `/config/admin/update/index`,
    method: 'post',
    data
  })
}
