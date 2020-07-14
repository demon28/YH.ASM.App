<template>
	<view class="content">
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view>
		
	
		<view class="headerView">{{Version}}[{{Mark}}]</view>
		
		<view class="headerView">{{Url}}</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
import Config from '../../static/js/Config.js';
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		data(){
			
			return{
				Version:Config.Parameters.Version,
				Mark:Config.Parameters.Mark(),
				Url:Config.Parameters.LoginHost()
			}
			
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				
				try {
				    uni.removeStorageSync('IsLogined');
				    uni.removeStorageSync('loginfo');
				} catch (e) {
				    // error
				}
				
				
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			}
		}
	}
</script>

<style>
.headerView{
		width: 100%;
		text-align: center;
		 justify-content: center;
		margin-top: 40upx;
	}
</style>
