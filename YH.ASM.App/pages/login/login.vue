<template>
	<view class="content">
		
		
		
		
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import config from'../../common/config.js';
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '11003870',
				password: '1346888',
				positionTop: 0,
				isDevtools: false,
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 4) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 4 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				
				
			  console.log("======"+ this.LoginHost+"/api/Login/Login");
				
			
				
				
				//var Key=config.Singin(array,this.ApiKey);
				var Key=this.ApiKey;
				
				console.log("======key"+Key);
				
				uni.request({
				    url:this.LoginHost+"/api/Login/Login", //仅为示例，并非真实接口地址。
				    data: {
				       Username: this.account,
				       Password: this.password,
					   SigningKey:Key
				    },
					method :"POST",
				    header: {
				        'content-type': 'application/json' //自定义请求头信息
				    },
				    success: (res) => {
				  
				        this.text = 'request success';
					 console.log(JSON.stringify(res));
			
					
						 if (res.data.Success) {
							 	console.log("======key"+res.data.Content.USER_ID);
							 //登录信息写进本地数据库
							 
						 	this.login(res.data.Content);
								
								//跳转本地数据库
								this.toMain();
									
						 } else {
						 	uni.showToast({
						 		icon: 'none',
						 		title: '用户账号或密码不正确',
						 	});
						 }
						 
				    }
				});
				
				
				
				
			
			},
			
		
			toMain() {
		
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {
			this.initPosition();
		
		}
	}
</script>

<style>
	

	
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
