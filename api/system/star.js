import request from '@/utils/request'

// 查询点赞列表
export function listStar(query) {
  return request({
    url: '/system/star/list',
    method: 'get',
    params: query
  })
}

// 查询点赞详细
export function getStar(id) {
  return request({
    url: '/system/star/' + id,
    method: 'get'
  })
}

// 新增点赞
export function addStar(data) {
  return request({
    url: '/system/star',
    method: 'post',
    data: data
  })
}

// 修改点赞
export function updateStar(data) {
  return request({
    url: '/system/star',
    method: 'put',
    data: data
  })
}

// 删除点赞
export function delStar(data) {
  return request({
    url: '/system/star/delete',
    method: 'post',
    data: data
  })
}
