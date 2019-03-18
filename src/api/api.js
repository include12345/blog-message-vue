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
    url: '/api/getArticleList',
    method: 'post',
    data: {
      "page":form.page,
      "limit":form.limit
    },
    headers:{
      "token":getToken()+'-'+'getArticleList'
    }
  })
}


export function removeOneArticle(id) {
  return request({
    url: '/api/removeOneArticle',
    method: 'get',
    params: {id},
    headers:{
      "token":getToken()+'-'+'removeOneArticle'
    }
  })
}

