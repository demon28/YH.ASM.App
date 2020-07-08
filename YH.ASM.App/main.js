import Vue from 'vue'
import App from './App'

import store from './store'


Vue.prototype.$timestamp=()=>{ return Math.round(new Date().getTime()/1000); }    
Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount();

//通讯加密key
Vue.prototype.ApiKey="58b59b3ae5d0ec0629950ebdd4dabe39"


//Config文件要去改啊      开发环境  devops   Config 文件也要去改啊！！！！
Vue.prototype.LoginHost="http://www.asm.cn:50428";

//Config文件要去改啊     正式环境  product  Config 文件也要去改啊！！！
//Vue.prototype.LoginHost="https://asm.yhwins.com:52420";



import SugarRequest from '@/static/js/SugarRequest.js' 

Vue.prototype.$SugarRequest=SugarRequest;