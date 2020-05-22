// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './assets/styles/layout/layout.less'
import './assets/styles/cover/cover.less'
import './assets/styles/base/base.less'
import * as THREE from 'mxreality.js/build/three';
import {VR,AVR} from 'mxreality.js/build/mxreality';
window.THREE = THREE; // 重要，不设置则会报未定义错误！！！！！！
window.VR = VR;
Vue.config.productionTip = false
Vue.use(ViewUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
