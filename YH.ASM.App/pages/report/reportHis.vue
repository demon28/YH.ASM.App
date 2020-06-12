<template>
	<view class="content">

		<view class="news-li" v-for="item in list" :key="item.TRAID">
			<view>{{ item.type }}</view>
			
			<view >	
			     <view class="new-content" style="float:left;display:inline;">{{ item.date }}</view>
			     <view class="new-content" style="float:right;">{{ item.address }}</view>
			</view>
		
		</view>
		<m-loading :loading="loading" :finished="finished"></m-loading>
	</view>
</template>

<script>
	import mLoading from '@/components/m-loading.vue';
	import listMixin from '@/common/mixins/list-mixin.js';

	import '@/common/colorui/main.css';
	import '@/common/colorui/icon.css';

	import {
		mapState
	} from 'vuex';

	export default {
		computed: { ...mapState(['forcedLogin', 'hasLogin', 'userName', 'workid', 'department', 'dtname', 'userId'])
		},
		mixins: [listMixin],
		components: {
			mLoading
		},
		data() {
			return {
				list: []
			};
		},
		methods: {
			// 模拟后端分页
			getData(requestParams) {
				let _self = this;
				return new Promise((res, rej) => {

					let params = requestParams;
					let resload = res;


					uni.request({
						url: this.LoginHost + "/api/Direction/List",
						data: {
							userId: _self.userId,
							pageindex: params.page,
							pagesize: params.size,
							SigningKey: _self.ApiKey
						},
						method: "GET",
						header: {
							'content-type': 'application/text'
						},
						success: (re) => {

							console.log(re);
							var arry = [];
							for (var i = 0; i < re.data.Content.length; i++) {

								var str_type = re.data.Content[i].TYPE == 0 ? "早报" : "晚报";
								var str_Date = re.data.Content[i].CREATETIME.substr(0, 10);;
								var str_address = re.data.Content[i].ADDRESS;
								arry.push({
									type: str_type,
									date: str_Date,
									address: str_address
								});

							}
							resload({
								code: 200,
								data: {
									page: params.page,
									size: params.size,
									list: arry,
									total: re.data.PageTotal
								}
							});
						},
						fail(r) {
							console.log(r);

						}
					});



				});

			},



			// 数据请求(没错就是这么少的代码)
			async _getList() {
				let result = await this.getData({
					page: this.page,
					size: this.size
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
		margin-top: 5upx;
		
		color: #666;
	}
</style>
