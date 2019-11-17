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
  },
  eventList(Msg){
    return request.post(`/cctv/event/eventList`,Msg)
  },
  deviceGroupList(Msg){
    return request.post(`/cctv/device/deviceGroupList`,Msg)
  },

  deviceList(Msg){
    return request.post(`/cctv/device/deviceList`,Msg)
  },
  editDevice(Msg){
    return request.post(`/cctv/device/editDevice`,Msg)
  },
  deviceGroupList(Msg){
    return request.post('/cctv/device/deviceGroupList',Msg)
  },
  // 智能搜索
  Smartsearch(Msg){
    return request.post('/cctv/ai/search',Msg)
  },
  // 事件列表
  // /cctv/event/eventList
  eventList(Msg){
    return request.post('/cctv/event/eventList',Msg)
  },
  eventDetail(Msg){
    return request.post('/cctv/event/eventDetail',Msg)
  }

}
export { adminApi }
