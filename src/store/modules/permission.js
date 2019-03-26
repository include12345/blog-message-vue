import Vue from "vue";
import Router from 'vue-router'

Vue.use(Router)

import {asyncRouterMap, constantRouterMap} from "../../router";

const premission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({commit}, response) {
      return new Promise(resolve => {
        let childrenRouterList = []
        var resList = []
        resList = resList.concat(response.list);
        for (var n = 0; n < asyncRouterMap.length; n++) {
         let routerMap = {}
         routerMap.path = asyncRouterMap[n].path
         routerMap.component = asyncRouterMap[n].component
         routerMap.redirect = asyncRouterMap[n].redirect
         routerMap.name = asyncRouterMap[n].name
         const children = []
         for (var j = 0; j < asyncRouterMap[n].children.length; j++) {
           if (asyncRouterMap[n].children[j] === null) {
             continue;
           }
           children.push(asyncRouterMap[n].children[j])
           //后台控制界面代码
          //  for (var i = 0; i < resList.length; i++) {
          //    if (asyncRouterMap[n].children[j].path === resList[i][0]) {
          //      children.push(asyncRouterMap[n].children[j])
          //    }
          //  }
         }
         if (children.length === 0) {
           continue;
         }
         routerMap.children = children
         childrenRouterList.push(routerMap)
        }
        commit('SET_ROUTERS', childrenRouterList)
        resolve()
      })
    }
  }
}
export default premission
