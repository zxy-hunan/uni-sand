import request from '@/utils/request'
// import { parseStrEmpty } from "@/utils/ruoyi";

// 注册用户
// 注册方法
export function register(data) {
    return request({
      url: '/register',
      headers: {
        isToken: false
      },
      method: 'post',
      data: data
    })
  }


// 登录方法
export function login(data) {
   
    return request({
      url: '/loginOS',
      headers: {
        isToken: false,
        repeatSubmit: false
      },
      method: 'post',
      data: data
    })
  }


  // 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}


// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}


export function listSimple(data) {
  return request({
    url: '/system/user/listSimple',
    method: 'get',
    params: data
  })
}
  