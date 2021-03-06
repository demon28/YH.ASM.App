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
		userId:"",
		userName: "",
		workid:"",
		department:"",
		dtname:"",
		mobile:"",
		useR_SEX:"",
		
		maintainer:[],   //创建日报时 的 人员集合   ...全局参数统一为集合
		supportProject:[], //创建工单时 的 集合
		supportConductor:[], //创建工单时 集合
		supportCopy:[],  //创建工单时的抄送对象
		supportMachine:[],//工单设备
		disporseAnalyzeuser:[],//技术处理，分析人员
		
		reportProject:[],  //日报选择项目 ---暂不启用
		reportMachine:[],  //日报选择设备 ---展不启用
		
		reportSupport:[],
		
		loading:false,
	},
	mutations: {
		switch_loading(state){
			state.loading = !state.loading
		},
		
		
		setReportSupport(state,items){
			state.reportSupport=[];
			state.reportSupport=items;
		},
		
		
		//未启用
		setReportMachine(state,items){
			state.reportMachine=[];
			state.reportMachine=items;
		},
		//未启用
		setReportProject(state,items){
			state.reportProject=[];
			state.reportProject=items;
		},
		
		
		setDisporseAnalyzeuser(state,items){
			state.disporseAnalyzeuser=[];
			state.disporseAnalyzeuser=items;
		},
		
		setSupportCopy(state,items){
			state.supportCopy=[];
			state.supportCopy=items;
			
		},
		setSupportConductor(state,items){
			state.supportConductor=[];
			state.supportConductor=items;
			
		},
		
		setSupportProject(state,items){
			state.supportProject=[];
			state.supportProject=items;
			
		},
		
		setSupportMachine(state,items){
			state.supportMachine=[];
			state.supportMachine=items;
			
		},
		
		setMaintainer(state,items){
			state.maintainer={};
			state.maintainer=items;
			
		},
		
		login(state, data) {
			
			state.userId = data.USER_ID;
			state.userName = data.USER_NAME ;
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
