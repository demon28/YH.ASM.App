import Vue from 'vue'
import App from './App'


import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount();

//通讯加密key
Vue.prototype.ApiKey="58b59b3ae5d0ec0629950ebdd4dabe39"

//测试环境  host
Vue.prototype.LoginHost="http://www.asm.cn:50428";

//签名方法
Vue.prototype.getImgSrc = function(array,ApiKey){
  
  var str="";
  for(var i=0 ;i<array.length;i++){
	  str+=array[i];
  }
  
  
}