import request from '@/utils/request'
const adminApi={
  LogIn(Msg) {
    return request.post(`/cctv/user/login`,Msg)
  },
  Logout(Msg) {
    return request.post(`/cctv/user/logout`,Msg)
  },
  editUser(Msg) {
    return request.post(`/cctv/user/editUser`,Msg)
  },
  delUser(Msg) {
    return request.post(`/cctv/user/delUser`,Msg)
  },
  userList(Msg) {
    return request.post(`/cctv/user/userList`,Msg)
  },

  updatdeAdminUser(Msg) {
    return request.put(`/adminUser/updatdeAdminUser`,Msg)
  }
}
export { adminApi }
