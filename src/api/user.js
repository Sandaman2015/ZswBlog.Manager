import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/authorize/get/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/admin/get/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
