<template>
	<view class="content">
		
		<view v-if="hasLogin" class="hello">
			
			<view class="title">
				您好 ：{{userName}}  [{{workid}}] 
			</view>
		
		</view>
			
			<view >
				<view style="margin-left: 15upx;">日报</view> 
				<uni-grid :column="4" :highlight="true" style="background-color: #F5F5F5;">
					<uni-grid-item >
						<view class="grid-item-box" @click="AddReport"  >
							<image src="../../static/img/report.png" class="image" mode="aspectFill" />
							<text class="text">提交日报</text>
						</view>
					</uni-grid-item>
					
					<uni-grid-item >
						<view class="grid-item-box"  @click="ViewReportHis" >
							<image src="../../static/img/reporthis.png" class="image" mode="aspectFill" />
							<text class="text">日报记录</text>
						</view>
					</uni-grid-item>
					
					<uni-grid-item >
					
					</uni-grid-item>
					<uni-grid-item >
						
					</uni-grid-item>
				</uni-grid>
			</view>
			
			<view >
				<view style="margin-left: 15upx;margin-top: 15px;">工单</view> 
				<uni-grid :column="4" :highlight="true" style="background-color: #F5F5F5;">
					<uni-grid-item >
						<view class="grid-item-box" @click="ViewSupporCreate"  >
							<image src="../../static/img/createSupport.png" class="image" mode="aspectFill" />
							<text class="text">创建工单 </text>
						</view>
					</uni-grid-item>
					
					<uni-grid-item >
						<view class="grid-item-box"  @click="ViewSupporMy" >
							<image src="../../static/img/mySupprot.png" class="image" mode="aspectFill" />
							<text class="text">我的任务</text>
						</view>
					</uni-grid-item>
					
					<uni-grid-item >
					<view class="grid-item-box"  @click="ViewSupportList" >
						<image src="../../static/img/allSupport.png" class="image" mode="aspectFill" />
						<text class="text">工单汇总</text>
					</view>
					</uni-grid-item>
					
					
					<uni-grid-item >
						
					</uni-grid-item>
				</uni-grid>
			</view>
			
			
				
		
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	
	import service from '../../service.js';
	import config from'../../common/config.js';
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
  

	export default {
		   components: {uniGrid,uniGridItem},
		computed: {...mapState(['forcedLogin', 'hasLogin', 'userName','workid'])},
		onLoad() {
			var _self=this;
			console.log(this.forcedLogin+"===="+this.hasLogin+"==="+this.userName+"==="+this.workid+"==="+this.department+"===");
			   
			   
			   console.log("是否登录过："+this.hasLogin);
			   
			   //先取持久化的值
			   
			   uni.getStorage({
			       key: 'IsLogined',
			       success: function (res) {
			           console.log("====有登录过"+ JSON.stringify(res.data));
					   if(res.data){
						   
						   uni.getStorage({
						       key: 'loginfo',
						       success: function (res) {
						           console.log("====登录数据："+JSON.stringify(res.data));
								   
								    _self.login(res.data);
								
						       }
						   });
					   }
					   
					   
			       }
			  ,fail:function(e){
				  
				  if (!_self.hasLogin) {
				   	uni.showModal({
				   		title: '未登录',
				   		content: '您未登录，需要登录后才能继续',
				   		//是否强制登录
				   		showCancel: !_self.forcedLogin,
				   		success: (res) => {
				   			if (res.confirm) {
				   				/**
				   				 * 如果需要强制登录，使用reLaunch方式
				   				 */
				   				if (_self.forcedLogin) {
				   					uni.reLaunch({
				   						url: '../login/login'
				   					});
				   				} else {
				   					uni.navigateTo({
				   						url: '../login/login'
				   					});
				   				}
				   			}
				   		}
				   	});
				   }
				  
				  
			  }
			  
			  
			  
			   });
			   
			   
		    
		}
	    ,methods:{
			...mapMutations(['login']),
			AddReport(){
				console.log("提交日报");
				uni.navigateTo({
					url: '../report/report'
				});
			},
			ViewReportHis(){
				console.log("日报记录");
				uni.navigateTo({
					url: '../report/history'
			    	//url: '../report/reportHis'
				});
				
			},
			ViewSupportList(){
				
					uni.navigateTo({
						url: '../support/list'
					});
			}
			,
			ViewSupporMy(){
				
					uni.navigateTo({
						url: '../support/mysupport'
					});
			},
			ViewSupporCreate(){
					
					uni.navigateTo({
						url: '../support/create'
					});
			}
			
		}
	
	
	}
</script>

<style>
	.hello {
	  
		margin-bottom: 30upx;
	}

	.title {
		color: #8f8f94;
	
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}
	
	
	
	.example {
			padding: 0 15px 15px;
		}
	
		.example-info {
			padding: 15px;
			color: #3b4144;
			background: #ffffff;
		}
	
		.example-body {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			padding: 0;
			font-size: 14px;
			background-color: #ffffff;
		}
	
	
		.example {
			padding: 0 15px;
		}
	
		.example-info {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
			padding: 15px;
			color: #3b4144;
			background-color: #ffffff;
			font-size: 14px;
			line-height: 20px;
		}
	
		.example-info-text {
			font-size: 14px;
			line-height: 20px;
			color: #3b4144;
		}
	
	
		.example-body {
			flex-direction: column;
			padding: 15px;
			background-color: #ffffff;
		}
	
		.word-btn-white {
			font-size: 18px;
			color: #FFFFFF;
		}
	
		.word-btn {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-radius: 6px;
			height: 48px;
			margin: 15px;
			background-color: #007AFF;
		}
	
		.word-btn--hover {
			background-color: #4ca2ff;
		}
	
	
		.image {
			width: 50rpx;
			height: 50rpx;
		}
	
		.text {
			font-size: 26rpx;
			margin-top: 10rpx;
		}
	
		.example-body {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
		}
	
		.grid-dynamic-box {
			margin-bottom: 15px;
		}
	
		.grid-item-box {
			flex: 1;
			/* position: relative;
	         */
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15px 0;
		}
	
		.grid-dot {
			position: absolute;
			top: 5px;
			right: 15px;
		}
	
		.swiper {
			height: 420px;
		}
</style>
