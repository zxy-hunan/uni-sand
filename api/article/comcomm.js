import request from '@/utils/request'

// 查询pingl 列表
export function listComm(query) {
  return request({
    url: '/system/comm/list',
    method: 'get',
    params: query
  })
}

// 查询pingl 详细
export function getComm(id) {
  return request({
    url: '/system/comm/' + id,
    method: 'get'
  })
}

// 新增pingl 
export function addComm(data) {
  return request({
    url: '/system/comm',
    method: 'post',
    data: data
  })
}

// 修改pingl 
export function updateComm(data) {
  return request({
    url: '/system/comm',
    method: 'put',
    data: data
  })
}

// 删除pingl 
export function delComm(id) {
  return request({
    url: '/system/comm/' + id,
    method: 'delete'
  })
}
