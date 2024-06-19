import request from '@/utils/request'

// 查询关注列表
export function listAttention(query) {
  return request({
    url: '/system/attention/list',
    method: 'get',
    params: query
  })
}


export function listFans(query) {
  return request({
    url: '/system/attention/listFans',
    method: 'get',
    params: query
  })
}

// 查询关注详细
export function getAttention(id) {
  return request({
    url: '/system/attention/' + id,
    method: 'get'
  })
}

// 新增关注
export function addAttention(data) {
  return request({
    url: '/system/attention',
    method: 'post',
    data: data
  })
}

// 修改关注
export function updateAttention(data) {
  return request({
    url: '/system/attention',
    method: 'put',
    data: data
  })
}

// 删除关注
export function delAttention(id) {
  return request({
    url: '/system/attention/' + id,
    method: 'delete'
  })
}
