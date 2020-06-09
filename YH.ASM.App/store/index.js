import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		hasLogin: false,
		userName: "",
		workid:"12313213",
		department:"",
		dtname:"",
		mobile:"",
		useR_SEX:""
	},
	mutations: {
		login(state, data) {
			state.userName = data.USER_NAME || '新用户';
			state.hasLogin = true;
			
			state.workid= data.WORK_ID;
			state.department= data.DEPARTMENT;
			state.dtname= data.DTNAME;
			state.mobile= data.MOBILE;
			state.useR_SEX= data.USER_SEX;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store
