// 是否显示路由的规则
export const whetherShowRoute = (route,role) => {
  // 如果有hidden 必隐藏
  if (route.hidden) return false
  console.log('route',route)
  // 如果没有meta标签,或者meta.roles为空 则必显示
  if (!route.meta || !route.meta.roles ||!route.meta.roles.length) {
    return true
  } else {
    //  role 在 roles中
    return !~route.meta.roles.indexOf(role)
  }
}
