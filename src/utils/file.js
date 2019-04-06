import axios from 'axios'
import {Message, MessageBox} from "element-ui";
import store from '../store'

const service = axios.create({
  baseURL: "http://47.95.208.59:6010",
  timeout: 15000
})

service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  console.log("data:" +response.data)
  const res = response.data
  // if (res.code !== 200) {
  //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //   if (res.code === 400 || res.code === 500 ) {
  //     MessageBox.confirm(res.message, '确定登出', {
  //       confirmButtonText: '重新登录',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       store.dispatch('FedLogOut').then(() => {
  //         location.reload()// 为了重新实例化vue-router对象 避免bug
  //       })
  //     })
  //   }
  //   return Promise.reject('error')
  // } else {
    // console.log(response.data)
    return res
  // }
}, error => {
  return Promise.reject(error);
})

export default service
