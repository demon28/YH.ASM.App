<template>
	<view class='purchase-list'>
		<my-tabs @change="tapChange" :modelData="modelData" :initIndex="initIndex"></my-tabs>
		<scroll-view class="purchase-body" scroll-y="true" @scrolltolower="scrolltolower" @scrolltoupper="scrolltoupper" @scroll="scroll" @touchstart="touchstart" @touchend="touchend">
			<my-unit v-for="(item,index) in listData" :key="index" :info="item"></my-unit>
		</scroll-view>
		<my-loading></my-loading>
	</view>
</template>
<script>
	import myTabs from '@/components/toptab/myTabs/myTabs.vue';
	import myUnit from '@/components/toptab/myUnits/purchaseUnit/unit.vue';
	import myPull from '@/static/js//myPull.js';
	import myLoading from '@/components/toptab/myLoading/myLoading.vue';
	import {mapState,mapMutations} from 'vuex';
	import ApiSingin from '../../static/js/ApiSingin.js';
	import {Support_Prioritylist, Support_Severitylist,Support_Statuslist,EnumGetSingle} from "../../static/js/Enum.js";
	import uniRate from '@/components/uni-rate/uni-rate.vue'	
	export default {
		computed:
		{ 
			...mapState(['userId']),  
		},
		components:{myTabs,myUnit,myLoading,uniRate},
		data() {
			return {
				   list:[],
					WatchState:0,
					WatchType:2,
			}
		},
		onLoad(){
			this.refresh();
		},
		methods: {
			/**
			 * @name 获取列表
			 */
			...Support_Statuslist,
			...Support_Severitylist,
			...EnumGetSingle,
			getList(page,done){
				 console.log(`获取第${page}页数据`);
			
				  var _self=this;
				  
				  
				 if(page==1){
					 _self.list=[];
				 }
				
			
				_self.WatchState=_self.initIndex;
				
				if(_self.WatchState==3){
					_self.WatchType==1;
				}else{
					_self.WatchType==2;
				}
				
				 let model={
					 pageindex:page,
					 pagesize:10,
					 Uuid:_self.userId,
					 WatchState:_self.WatchState,
					 WatchType:_self.WatchType
				 };
				 let jsonString=JSON.stringify(model);
				 let timestamp=_self.$timestamp();
				 let path="/api/Support/ListPersonal";
				 let Singinkey=ApiSingin.Singin(path,jsonString,_self.ApiKey,timestamp);
				 
				 //加载提示
				 uni.showLoading({
				     title: '加载中...'
				 });
				 
				 uni.request({
				     url:_self.LoginHost+path, 
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
					 
					  done(res.data.Content);
					 
				 	
				 		 
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
				 
				 
				 
				 
				 
			}, 
			
			/**
			 * @name 触底加载
			 */
			scrolltolower(event){
				this.getList(this.page,this.__pulldone)
			},
			
			scroll(e){
				// 重新设置pulldown
				this.setPullDown(e.detail.scrollTop<10)
			},
			
			scrolltoupper(){
				
			},
			
			
			/**
			 * @name 改变tab
			 * @param val 索引
			 */
			tapChange(val){
				this.initIndex=val
				
				console.log("tab变化"+this.initIndex);
				this.refresh();
			}
		},
		mixins:[myPull({})],
		
	}
</script>


<style lang='scss'>
	.purchase-list {
		background-color: #f5f5f5;
		height: 100%;
		overflow: hidden;
		
		.purchase-body{
			height: calc(100% - 88upx);
			overflow: auto
		}
	}
</style>
