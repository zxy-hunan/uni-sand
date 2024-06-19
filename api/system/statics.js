import request from '@/utils/request'
// import { parseStrEmpty } from "@/utils/ruoyi";



export function list(data) {
  return request({
    url: '/system/statics/list',
    method: 'get',
    data: data
  })
}

export function articleList(data) {
  return request({
    url: '/system/statics/articleList',
    method: 'get',
    data: data
  })
}



export function userList(data) {
  return request({
    url: '/system/statics/userList',
    method: 'get',
    data: data
  })
}

  