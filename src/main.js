// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

import App from './App'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import VueParticles from 'vue-particles'  
import router from './router'
import store from './store'

import '@/permission'

Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(mavonEditor);
Vue.use(VueParticles)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
