import request from '@/utils/request'
import md5 from 'js-md5'
import {getToken} from '@/utils/auth'

export function login(username, password) {
  const salt = '78683a7a-f258-11e5-ab7f-00163e0043c9';
  password = md5(password+salt);
  return request({
    url: '/user/api',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getMenus',
    method: 'get',
    params: {token}
  })
}






export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'get',
    params: {token}
  })
}


export function getArticleList(form) {
  return request({
    url: '/blog/listBlog',
    method: 'post',
    data: {
      "page":form.page,
      "pageSize":form.limit
    },
    headers:{
      "token":getToken()+'-'+'getArticleList'
    }
  })
}


export function removeOneArticle(id) {
  return request({
    url: '/blog/deleteBlog',
    method: 'get',
    params: {id},
    headers:{
      "token":getToken()+'-'+'removeOneArticle'
    }
  })
}

export function getOneArticle(id) {
  return request({
    url: '/blog/getBlog',
    method: 'get',
    params: {id},
    headers:{
      "token":getToken()+'-'+'getOneArticle'
    }
  })
}
export function createArticle(param) {
  return request({
    url: '/blog/createBlog',
    method: 'post',
    data: param,
    headers:{
      "token":getToken()+'-'+'createArticle'
    }
  })
}

export function editArticle(param) {
  return request({
    url: '/blog/updateBlog',
    method: 'post',
    data: param,
    headers:{
      "token":getToken()+'-'+'editArticle'
    }
  })
}

export function getClassify() {
  return request({
    url: '/blog/getClassify',
    method: 'get',
    headers:{
      "token":getToken()+'-'+'getClassify'
    }
  })
}
        
