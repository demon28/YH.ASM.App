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



//开发环境  devops
//Vue.prototype.LoginHost="http://www.asm.cn:50428";


//正式环境  product
Vue.prototype.LoginHost="https://asm.yhwins.com:52420";
