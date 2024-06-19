import request from '@/utils/request'

// 查询签到列表
export function listSign(query) {
  return request({
    url: '/system/sign/list',
    method: 'get',
    params: query
  })
}

// 查询签到详细
export function getSign(id) {
  return request({
    url: '/system/sign/' + id,
    method: 'get'
  })
}

// 新增签到
export function addSign(data) {
  return request({
    url: '/system/sign',
    method: 'post',
    data: data
  })
}

// 修改签到
export function updateSign(data) {
  return request({
    url: '/system/sign',
    method: 'put',
    data: data
  })
}

// 删除签到
export function delSign(id) {
  return request({
    url: '/system/sign/' + id,
    method: 'delete'
  })
}
