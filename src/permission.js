import router from './router'
import store from './store'
import NProgress from 'nprogress' //  进度条
import {getToken} from './utils/auth' //校验

router.beforeEach((to, from, next) => {
  NProgress.start()
  if(to.path === '/' || to.path.indexOf("/show") !== -1) {
    next()
    NProgress.done()
    return;
  } 
  console.log("token:" +getToken())
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/admin' })
      NProgress.done()
    } else {
      if (store.getters.addRouters.length === 0) {  // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => {  // 拉取user_info
          store.dispatch('GenerateRoutes',{res}).then(()=>{// 生成可访问的路由表
            router.addRoutes(store.getters.addRouters)// 动态添加可访问路由表
          })
        next()
        })
      } else {
        next()
      }
    }
  } else {
    if(to.path.indexOf("/login") !== -1) {
      next()
    } else {
      console.log("bai:"+to.path)
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
