<template>
	<view class='purchase-list'>
		<my-tabs @change="tapChange" :modelData="modelData" :initIndex="initIndex"></my-tabs>
		<scroll-view class="purchase-body" scroll-y="true" @scrolltolower="scrolltolower" @scrolltoupper="scrolltoupper"
		 @scroll="scroll" @touchstart="touchstart" @touchend="touchend">
			<my-unit v-for="(item,index) in listData" :key="index" :info="item" v-on:child-say="accept" v-on:child-do="handle"></my-unit>
		</scroll-view>
		<my-loading></my-loading>
	</view>
</template>
<script>
	import myTabs from '@/components/toptab/myTabs/myTabs.vue';
	import myUnit from '@/components/toptab/myUnits/purchaseUnit/unit.vue';
	import myPull from '@/static/js//myPull.js';
	import myLoading from '@/components/toptab/myLoading/myLoading.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import ApiSingin from '../../static/js/ApiSingin.js';
	import {
		Support_Prioritylist,
		Support_Severitylist,
		Support_Statuslist,
		EnumGetSingle
	} from "../../static/js/Enum.js";
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	import config from '../../static/js/Config.js';
		
	export default {
		computed: {
			...mapState(['userId']),
		},
		components: {
			myTabs,
			myUnit,
			myLoading,
			uniRate
		},
		data() {
			return {
				list: [],
				WatchState: 0,
				WatchType: 2,
			}
		},
		onLoad() {
			this.refresh();
		},
		methods: {
			/**
			 * @name 获取列表
			 */
			...Support_Statuslist,
			...Support_Severitylist,
			...EnumGetSingle,
			getList(page, done) {

				var _self = this;


				if (page == 1) {
					_self.list = [];
				}


				_self.WatchState = _self.initIndex;

				if (_self.WatchState == 3) {
					_self.WatchType == 1;
				} else {
					_self.WatchType == 2;
				}

				let model = {
					pageindex: page,
					pagesize: 10,
					Uuid: _self.userId,
					WatchState: _self.WatchState,
					WatchType: _self.WatchType
				};
				let jsonString = JSON.stringify(model);
				let timestamp =  Math.round(new Date().getTime()/1000); 
				let path = "/api/Support/ListPersonal";
				let Singinkey = ApiSingin.Singin(path, jsonString, config.Parameters.ApiKey, timestamp);

				//加载提示
				uni.showLoading({
					title: '加载中...'
				});

				uni.request({
					url: config.Parameters.LoginHost() + path,
					data: model,
					method: "POST",
					header: {
						// 'content-type': 'application/json' ,//自定义请求头信息
						'timestamp': timestamp,
						'SigningKey': Singinkey
					},
					success: (res) => {

						uni.hideLoading();
						console.log(res);
						//console.log("看看json字符串"+JSON.stringify(res));

						if (res.statusCode != 200) {
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



					},
					fail(re) {

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
			scrolltolower(event) {
				this.getList(this.page, this.__pulldone)
			},

			scroll(e) {
				// 重新设置pulldown
				this.setPullDown(e.detail.scrollTop < 10)
			},

			scrolltoupper() {

			},
			accept(item) {


				console.log("开始处理:" + JSON.stringify(item));
				var _self = this;

				let path = "/api/Support/UpdatePersernalStatus";
				let model = {
					id: item.ID,
					status: 1
				}

				_self.$SugarRequest.Post(model, path, (data, res) => {

					if (!res.data.Success) {
						uni.showToast({
							icon: 'none',
							title: res.data.Message
						});
						return;
					}

					uni.showModal({
						content: '接单成功',
						showCancel: false,
						success: (re) => {
							if (re.confirm) {
								this.initIndex = 1;
								this.WatchState = 1;
								this.refresh();
							}
						}
					})


					console.log(res);
				});

			},
			handle(item) {
				console.log("我要开始处理工单了：" + JSON.stringify(item));

				let url = "";
				if (item.STATUS == 0) {
					url = `checkByDisporer?sid=${item.SID}&personal=${item.ID}`; //创建工单后，状态为0， 跳转到处理工单  （处理后状态为1 或 2  PMC 或 非PMC ）
				}
				if (item.STATUS == 1) {
					url = `checkByPmc?sid=${item.SID}&personal=${item.ID}`;        //处理工单后，状态为1， 需要PMC处理，（处理完成后 状态为3   PMC）
				}
				if (item.STATUS == 2) {
					url = `checkBySite?sid=${item.SID}&personal=${item.ID}`;   //处理工单后，状态为2，无需PMC处理 （处理完成后  状态为3  非PMC）
				}
				if (item.STATUS == 3) {
					url = `checkBySite?sid=${item.SID}&personal=${item.ID}`;  //技术或PMC处理后，状态为3， 现场人员检测 （处理完成后状态为4  负责人审核）
				}
				if (item.STATUS == 4) {
					url = `checkByPrincipal?sid=${item.SID}&personal=${item.ID}`;   //现场取人后， 状态为4， 负责人审核， （处理完成后状态 为 5或 6，6为已完成，5为完成）
				}
				if (item.STATUS == 5) {
					url = `checkBySite?sid=${item.SID}&personal=${item.ID}`; //审核后，状态为5属于未完成，被打回，重新提交审核
				}

				console.log(url);
				
				uni.navigateTo({
					url:url
				})



			},
			tapChange(val) {
				this.initIndex = val
				/**
				 * @name 改变tab
				 * @param val 索引
				 */
				console.log("tab变化" + this.initIndex);
				this.refresh();
			}
		},
		mixins: [myPull({})],

	}
</script>


<style lang='scss'>
	.purchase-list {
		background-color: #f5f5f5;
		height: 100%;
		overflow: hidden;

		.purchase-body {
			height: calc(100% - 88upx);
			overflow: auto
		}
	}
</style>
