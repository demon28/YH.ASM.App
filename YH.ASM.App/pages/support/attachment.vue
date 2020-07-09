<template>
	
	<view class="content">
		
		<view style="text-align: center;" v-if="list.length<=0">没有附件</view>
		
		<view class="uni-list" style="margin-top: 20upx;">
			<label class="uni-list-cell-navigate " style=" min-height: 60upx; height: 60upx;" v-for="item in list" :key="item.AID">
				<view>
					<view> {{item.FILENAME}}</view>
				</view>
				<view>
					<button class="mini-btn" size="mini"  @click="Viewfile(item)" type="default">预览</button>
				</view>
				
			</label>
		</view>
		
		
	</view>
	
	
</template>
<script>
	
	import {mapState,mapMutations} from 'vuex';
	import ApiSingin from '../../static/js/ApiSingin.js';
	import config from '../../static/js/Config.js';
	export default {
		computed:	{
			...mapState(['userId'])
		},
		
		data() {
			return {
				   list:[],
				   sid:0
			}
		},
		onLoad(params){
			console.log( params.sid);
			this.sid = params.sid;
			this.Init(); 
		},
		methods: {
			
			
			Viewfile(item){
			console.log(item.URL);
				uni.navigateTo({  
				    url: 'media?url=' + encodeURIComponent(item.URL)  
				});
				
			},
			Init(){
				
				console.log("sid"+this.sid)
				if(this.sid==0 || this.sid==""|| this.sid.toString()=="undefined"){
					return;
				}
				
				
				 var _self=this;
				
				 let model={
					 sid:_self.sid,
					pageindex:1,
					pagesize:20
				 };
				 let jsonString=JSON.stringify(model);
				 let timestamp=Math.round(new Date().getTime()/1000);
				 let path="/api/Support/LisAttachmentt";
				 let Singinkey=ApiSingin.Singin(path,jsonString,config.Parameters.ApiKey,timestamp);
				 
				 console.log("请求内容是："+JSON.stringify(model));
				 
				 //加载提示
				 uni.showLoading({
				     title: '加载中...'
				 });
				  
				 uni.request({
				     url:config.Parameters.LoginHost()+path, 
				     data: model,
				 	 method :"POST",
				     header: {
				        // 'content-type': 'application/json' ,//自定义请求头信息
				 		 'timestamp':timestamp,
				 		 'SigningKey':Singinkey
				     },
				     success: (res) => {
				   
				      uni.hideLoading();
				 	 console.log(res);
				 	 //console.log("看看json字符串"+JSON.stringify(res));
				 	 		
				 	if(res.statusCode!=200){
				 		uni.showToast({
				 			icon: 'none',
				 			title: "服务器内部错误！"
				 		});
				 		return;
				 	}		
				 	 if (!res.data.Success) {
				 	 	uni.showToast({
				 	 		icon: 'none',
				 	 		title: res.data.Message
				 	 	});
				 		return;
				 	 }
					 
					  _self.list=res.data.Content;
				 		 
				     }
				 	,fail(re){
				 		
				 		console.log(re);
				 		
				 		uni.hideLoading();
				 		uni.showToast({
				 			icon: 'none',
				 			title: '网络请求失败！'
				 		});
				 	}
				 
				 });
				 
				 
				 
				 }
				 
			}, 
			
		
	}
</script>


<style>
</style>
