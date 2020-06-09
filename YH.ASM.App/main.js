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




Vue.prototype.LoginHost="http://sso.asm.cn:51419";

Vue.prototype.LoginUrl="http://sso.asm.cn:51419"+"/api/Login2/Login";

