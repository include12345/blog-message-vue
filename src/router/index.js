import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/index';
import Dashboard from '../views/dashboard/index';
import NotFound from '../views/NotFound'

import ArticleCreate from '../views/admin/ArticleCreate'
import ArticleList from '../views/admin/ArticleList'
import ArticleEdit from '../views/admin/ArticleEdit'
//import ClassList from '../views/admin/ClassList'

import Front from '../views/show/Front'
import Home from '../views/show/Home'
import Article from '../views/show/Article'

import Layout from '../views/layout/Layout'


Vue.use(Router)

export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {
    path:'/',
    component:Layout,//这是文章页
    redirect: 'dashboard',
    name: '根目录',
    hidden: true,
    children:[
      {path:'dashboard',component:Dashboard,  meta:{auth:false}}
      // {path:'article/:id',component:Article, meta:{auth:false,scrollToTop: true}},
    ]
  },
  {
    path:'/home',
    component:Front,//这是文章页
    hidden:true,
    children:[
      // {path:'',redirect:'home',  meta:{auth:false}},
      {path:'',component:Home,  meta:{auth:false}},
      {path:'article/:id',component:Article, meta:{auth:false,scrollToTop: true}},
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: 'dashboard',
    name: '管理面板',
    hidden: true,
    children: [{path:'articleList',component:ArticleList,name:'文章管理'}]
  },
  {
    path:'*',component: NotFound, hidden:true
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),

  routes: constantRouterMap
})


export const asyncRouterMap = [
  // {
  //   path:'/home',
  //   component:Front,
  //   redirect:'home',
  //   name:'管理面板',
  //   children:[
  //     {path:'',redirect:'home',  meta:{auth:false}},
  //     {path:'home',component:Home,  meta:{auth:false}},
  //     // {path:'article/:id',component:Article, meta:{auth:false,scrollToTop: true}},
  //     //{
  //     //  path:'classList',component:ClassList,name:'分类管理'
  //     //  // 创建分类直接在分类列表里面出现弹层
  //     //}
  //   ]
  // },
  {
    path:'/admin',
    component:Layout,
    redirect:'admin',
    name:'管理面板',
    children:[
      { path:'articleList',component:ArticleList,name:'文章管理'},
      {
       // 创建文章单独一个组件
       path:'articleCreate',component:ArticleCreate,name:'创建文章',hidden:true
      },
      {
       path:'articleEdit/:postId',component:ArticleEdit,hidden:true,name:"编辑文章"
      },
      //{
      //  path:'classList',component:ClassList,name:'分类管理'
      //  // 创建分类直接在分类列表里面出现弹层
      //}
    ]
  }
]



