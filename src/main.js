import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import ElementUI from 'element-ui';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import GeminiScrollbar from 'vue-gemini-scrollbar'
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
import './assets/icon/iconfont.css'

const mock = false;
if(mock){
  require('./mock/api')
}
// Vue.use(mavonEditor)
// Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.use(GeminiScrollbar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
