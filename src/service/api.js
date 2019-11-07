import http from '../utils/request'
/**
 * @description: 事件列表
 * @param {Object} {exp:'xxx'}
 * @return: Promise
 */
export const getEventList = parmas => http({
  url: '/cctv/event/eventList',
  method: 'get',
  parmas
})

export const searchFaceDB = parmas => http({
  url: '/cctv/face/searchFaceDB',
  method: 'post',
  parmas
})

export const login = data => http({
  url: '/cctv/user/login',
  method: 'post',
  data
})
