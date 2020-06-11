<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<view class="title">
				您好 ：{{userName}}  [{{workid}}] 
			</view>
			
			
		<view class="title">
		<button v-if="hasLogin" type="default" @tap="AddReport">提交日报</button>
		
		</view>
		
		<view class="title">
		<button v-if="hasLogin" type="default" @tap="ViewReportHis">日报记录</button>
		
		</view>
		
		</view>
		
	</view>
</template>

<script>
	
	
	import {mapState} from 'vuex'


	export default {
		computed: {...mapState(['forcedLogin', 'hasLogin', 'userName','workid'])},
		onLoad() {
			
			console.log(this.forcedLogin+"===="+this.hasLogin+"==="+this.userName+"==="+this.workid+"==="+this.department+"===");
			   
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					//是否强制登录
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
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
	    ,methods:{
			AddReport(){
				uni.navigateTo({
					url: '../report/report'
				});
			},
			ViewReportHis(){
				
				uni.navigateTo({
					//url: '../report/history'
				url: '../report/reportHis'
				});
				
			}
		}
	
	
	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}
</style>
