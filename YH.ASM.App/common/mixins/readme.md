## list-mixin.js
```
/**
 * uni-app上拉加载和下拉刷新混合
 * @author maybe
 */
export default {
	data() {
		return {
			loading: false, // 是否加载数据
			finished: false, // 是否加载完成
			list: [], // 数据列表
			page: 0, // 由于分页一般页面要+1，所以为了方便分页查询，这里初始设置页码为0
			size: 10, // 每页显示的条数
			total: 0 // 数据总条数
		};
	},
	async onLoad() {
		await this._getListFactory();
	},
	// 下拉刷新
	async onPullDownRefresh() {
		console.log('下拉刷新');
		this.initPageData();
		await this._getListFactory();
		uni.stopPullDownRefresh();
	},
	// 上拉加载
	async onReachBottom() {
		console.log('上拉加载');
		this._getListFactory();
	},
	methods: {
		// 初始化页面的数据
		initPageData(size) {
			this.finished = false;
			this.page = 0;
			this.list = [];
			this.size = size || 10;
			this.total = 0;
		},
		async _getListFactory() {
			// 如果已经全部加载完成直接终止执行
			if (this.finished) return;
			this.loading = true;
			this.page++;
			await this._getList();
			this.loading = false;
			// 判断是否全部加载完成
			if (this.list.length == this.total) {
				this.finished = true;
			}
		},
		// 数据请求方法需要在页面内重写
		async _getList() {},
	}
}

```
## 示例
```
<template>
	<view class="view">
		<view class="notice">本Demo演示下拉刷新和上拉加载</view>
		<view class="news-li" v-for="news in list" :key="news.id">
			<view>{{ news.title }}</view>
			<view class="new-content">{{ news.content }}</view>
		</view>
		<m-loading :loading="loading" :finished="finished"></m-loading>
	</view>
</template>

<script>
import mLoading from '@/components/m-loading.vue';
import listMixin from '@/common/mixins/list-mixin.js';
export default {
	mixins: [listMixin],
	components: { mLoading },
	data() {
		return {
			list: []
		};
	},
	methods: {
		// 模拟后端分页
		getData(requestParams) {
			let self = this;
			return new Promise((res, rej) => {
				let params = requestParams;
				if (!params) {
					params = {
						page: 1,
						size: 10
					};
				}
				console.log(params)
				setTimeout(() => {
					let arr = [];
					for (let i = (params.page - 1) * params.size; i < params.page * params.size; i++) {
						arr.push({
							id: i,
							title: '【新增新闻' + i + '】 标题',
							content: '新增新闻的内容'
						});
					}
					res({
						code: 200,
						data: {
							page: params.page,
							size: params.size,
							list: arr,
							total: 20 // 设置20就加载完成
						}
					});
				}, 500);
			});
		},
		// 数据请求(没错就是这么少的代码)
		async _getList() {
			let result = await this.getData({
				page:this.page,
				size:this.size
			});
			let self = this;
			this.total = result.data.total;
			result.data.list.map(item => {
				self.list.push(item);
			});
		}
	}
};
</script>

<style>
/*说明*/
.notice {
	font-size: 30upx;
	padding: 40upx 0;
	border-bottom: 1upx solid #eee;
	text-align: center;
}
/*展示上拉加载的数据列表*/
.news-li {
	font-size: 32upx;
	padding: 32upx;
	border-bottom: 1upx solid #eee;
	color: $uni;
}
.news-li .new-content {
	font-size: 28upx;
	margin-top: 10upx;
	margin-left: 20upx;
	color: #666;
}
</style>

```