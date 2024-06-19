const getters = {
  token: state => state.user.token,
   id: state => state.user.id,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  nickname: state => state.user.nickname,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions
}
export default getters
