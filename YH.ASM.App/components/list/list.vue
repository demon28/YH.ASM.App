<template>
	<view>
		<scroll-view class="scroll-view" scroll-y="true" @scroll="onScroll" :scroll-top="scrollTopValue" @scrolltolower="request" :scroll-with-animation="false">			
			<slot></slot>
			<view class="tip">
				<template v-if="hasMore">{{ loadingTip }}</template>
				<template v-else>{{ noMoreTip }}</template>
			</view>			
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		/**
		 * 列表配置
		 */
		options: {
			type: Object,
			default: () => {
				return {
					url: '',
					params: {}
				};
			}
		},
		// 没有更多值提示
		noMoreTip: {
			type: String,
			default: '暂无更多'
		},
		// 正在加载提示
		loadingTip: {
			type: String,
			default: '加载中...'
		}
	},
	data() {
		return {
			list: [], 
			hasMore: true,
			loadingMore: false,
			pi: 1,
			ps: 20,
			scrollTopValue: 0,
			scrollTopValueOld: 0,
		};
	},
	methods: {
		/**
		 * 刷新
		 */
		refresh() {
			this.pi = 1;
			this.list = [];
			this.hasMore = true;
			this.request();
		},
		/**
		 * 获取数据
		 * url：options配置中的url值
		 * params：options中的params内容 + 当前页码 + 每页内容数
		 */
		getData({url, params}) {
			console.log("调用拉："+url);
			
			return new Promise((resolve, reject) => {
				uni.showToast({
					icon: 'none',
					title: '第${params.pi}页的${params.ps}条数据'
				})
				
				 
				uni.request({
				     url:url, 
				     data: params,
				 	 method :"GET",
				     header: {
				         'content-type': 'application/text' //自定义请求头信息
				     },
				     success: (res) => {
				 	// console.log(JSON.stringify(res));
				
				 		 if (!res.data.Success) {
				 			
				 			uni.showToast({
				 				icon: 'none',
				 				title: res.data.Message,
				 			});
				 			
				 			return;
				 	   }
				 	   console.log(JSON.stringify(res.data));
								   
							let currentList = [];	   
				 	   for(var i=0;i<res.data.Content.length; i++){
				 		   
				 		   var str_type=res.data.Content[i].TYPE==0?"早报":"晚报";
				 		   var str_Date= res.data.Content[i].CREATETIME.substr(0,10);;
				 		   var str_address=res.data.Content[i].ADDRESS;
				 		   currentList.push({type:str_type,date:str_Date,address:str_address});
				 		   
				 	   }
					   resolve(currentList)
				 		 
				     }
				 });
				
				
			})
		},
		
		/**
		 * 请求过程
		 */
		request() {
			let {hasMore, loadingMore} = this
			if (hasMore && !loadingMore) {
				this.loadingMore = true
				
				//处理参数
				let {url, params} = this.options
				params = typeof params === "function" ? params() : params // 如果params是个方法，则调用方法获取值
				// 更新页数
				this.pi = params.pi || this.pi
				this.ps = params.ps || this.ps
				
				this.getData({url, params: {...params, ps: this.ps, pi: this.pi}}).then((list) => {
					this.list = this.list.concat(list) // 合并列表内容
					// 判断列表是否更多
					if(list.length == 0 || list.length < this.ps) {
						this.hasMore = false
					} else {
						this.pi++
					}
					this.$emit('success', this.list);
					this.loadingMore = false;
				}) .catch(() => {
					this.loadingMore = false;
					this.hasMore = false;
				})
			}
		},
		/**
		 * 滚动事件
		 */
		onScroll(e) {
			this.scrollTopValueOld = e.detail.scrollTop 
			this.$emit('scroll', e)
		},
		/**
		 * 滚动到顶部
		 */
		scrollTop() {
			this.scrollTopValue = this.scrollTopValueOld
			this.$nextTick(function() {
				this.scrollTopValue = 0
			});
		}
	}
};
</script>

<style lang="css" scoped>
.scroll-view {
	height: 100vh;
	position: absolute;
	
}
.tip {
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #999999;
	font-size: 28upx;
}
</style>
