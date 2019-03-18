const getters = {
  sidebar: state => state.app.sidebar,
  username: state=>state.user.username,
  name: state=>state.user.name,
  token: state => state.user.token,
  menu: state => state.user.menu,
  admin: state => state.user.admin,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
