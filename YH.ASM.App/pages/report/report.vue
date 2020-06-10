<template>




	<view class="content">

		<uni-list>
			<uni-list-item title="姓名:" :show-arrow="false" :rightText="unionName"></uni-list-item>
			<uni-list-item title="部门:" :show-arrow="false" :rightText="unionDtname"></uni-list-item>
			<uni-list-item title="日期:" :show-arrow="false" :rightText="datetime"></uni-list-item>
			<uni-list-item title="定位地址:" :show-arrow="false" :rightText="locatladdress"></uni-list-item>
		</uni-list>


		<uni-section title="必填信息" type="line" style="height: 80upx;"></uni-section>
		    <view class="uni-list" >
								<view class="uni-list-cell">
									<view class="uni-list-cell-left">
										* 日报类型:
									</view>
									
									<view class="uni-list-cell-db">
										<picker @change="bindPickerChange" :value="index" :range="array">
											<view class="uni-input">{{array[index]}}</view>
										</picker>
									</view>
								</view>
							</view>
		
							<view class="uni-list" >
								<view class="uni-list-cell">
									<view class="uni-list-cell-left">
										* 当前项目:
									</view>
									<view class="uni-list-cell-db">
										<picker @change="bindPickerChange" :value="indexProject" :range="arrayProject" :range-key="'value'">
											<view class="uni-input">{{arrayProject[indexProject].value}}</view>
										</picker>
									</view>
								</view>
							</view>
							<view class="uni-list" >
								<view class="uni-list-cell">
									<view class="uni-list-cell-left">
										* 项目客户:
									</view>
									<view class="uni-list-cell-db">
										<picker @change="projectkehuPickerChange" :value="indexProjectkehu" :range="arrayProjectKehu" :range-key="'value'">
											<view class="uni-input">
												{{arrayProjectKehu[indexProjectkehu].value}}
											</view>
										</picker>
									</view>
								</view>
							</view>
	<view class="uni-list" >
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								* 问题工单:
							</view>
							<view class="uni-list-cell-db">
								<picker @change="supportPickerChange" :value="indexSupport" :range="arraySupport" :range-key="'value'">
									<view class="uni-input">
										{{arraySupport[indexSupport].value}}
									</view>
								</picker>
							</view>
						</view>
					</view>
<!--
		<uni-list>
			<uni-list-item title="日报类型:">

				<template v-slot:right="">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</template>
			</uni-list-item>


			<uni-list-item title="项目名称:">

				<template v-slot:right="">
					<picker @change="bindPickerChange" :value="indexProject" :range="arrayProject" :range-key="'value'">
						<view class="uni-input">{{arrayProject[indexProject].value}}</view>
					</picker>
				</template>
			</uni-list-item>

			<uni-list-item title="项目客户:" >

				<template v-slot:right="" >
					<picker style="width:100%;" @change="projectkehuPickerChange" :value="indexProjectkehu" :range="arrayProjectKehu" :range-key="'value'">
						<view class="uni-input">
							{{arrayProjectKehu[indexProjectkehu].value}}
						</view>
					</picker>
				</template>
			</uni-list-item>
			<uni-list-item title="问题工单:">

				<template v-slot:right="">
					<picker @change="supportPickerChange" :value="indexSupport" :range="arraySupport" :range-key="'value'">
						<view class="uni-input">
							{{arraySupport[indexSupport].value}}
						</view>
					</picker>
				</template>
			</uni-list-item>
		</uni-list>
		-->
		<uni-section title="填写简报" type="line" style="height: 80upx;"></uni-section>
    
                     <view class="uni-textarea">
                         <textarea placeholder="请输入今日简报的内容" />
                     </view>
                

		<button class="btn-logout" style="margin-top: 20upx;" @click="onInfoSubmit()">提交</button>


	</view>







</template>

<script>
	import unilist from '../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../components/uni-list/uni-list.vue';

	
	// import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	// import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	// import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	// import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	// import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"

	import {
		mapState
	} from 'vuex'


	export default {
		computed: { ...mapState(['forcedLogin', 'hasLogin', 'userName', 'workid', 'department', 'dtname'])
		},

		components: {
			// cmdNavBar,
			// cmdPageBody,
			// cmdTransition,
			// cmdCelItem,
			// cmdAvatar
		},

		data() {
			return {

				array: ['早报', '晚报'],

				arrayProject: [{
					key: "0",
					value: "惠州长治项目"
				}, {
					key: "1",
					value: "深圳龙华项目"
				}],

				arrayProjectKehu: [{
					key: "0",
					value: "张福军"
				}, {
					key: "1",
					value: "刘之龙"
				}],

				arraySupport: [{
					key: "0",
					value: "拿铁001设备噪音较大"
				}, {
					key: "1",
					value: "宏观002设备没声音"
				}],

				index: 0,
				indexProject: 0,
				indexProjectkehu: 0,
				indexSupport: 0,
				locatladdress: "",
				locatllongitude: "0",
				locatllatitude: "0",

				unionName: "",
				unionDtname: "",
				datetime: ""
			}
		},

		mounted() {

			//变量赋值
			var myDate = new Date();
			this.datetime = myDate.toLocaleDateString();
			this.unionName = this.userName + "(" + this.workid + ")";
			this.unionDtname = this.department + "-" + this.dtname + "";

			//当前定位
			this.getAuthorizeInfo();

		},

		methods: {


			bindPickerChange: function(e) {

				this.index = e.target.value
			},

			projectPickerChange: function(e) {

				this.indexProject = e.target.value
			},
			projectkehuPickerChange: function(e) {

				this.indexProjectkehu = e.target.value
			},
			supportPickerChange: function(e) {

				this.indexSupport = e.target.value
			},
			// 位置授权
			getAuthorizeInfo() {
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() { // 允许授权
						that.getLocationInfo();
					},
					fail() { // 拒绝授权
						that.openConfirm();
						console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			// 获取地理位置
			getLocationInfo() {
				var _self = this;

				uni.getLocation({
					type: 'wgs84',
					success(res) {
						console.log(res);
						console.log(res.latitude.toString());

						_self.locatllatitude = res.latitude.toString();
						_self.locatllongitude = res.longitude.toString();
						uni.request({
							header: {
								"Content-Type": "application/text"
							},
							url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude +
								'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
							success(re) {

								console.log(re.data.result.address)

								if (re.statusCode === 200) {
									_self.locatladdress = re.data.result.address;
									console.log("获取中文街道地理位置成功")
								} else {
									console.log("获取信息失败，请重试！")
								}
							}
						});

					}
				});
			},

			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm() {
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '你拒绝了授权，无法获得周边信息',
								icon: 'none',
								duration: 1000
							})
						}
					}
				});
			},

			onInfoSubmit() {

				uni.showToast({
					title: '提交成功',
					duration: 2000
				});

			}

		}
	}
</script>

<style>
	.btn-logout {
		margin-top: 100upx;
		width: 80%;
		border-radius: 50upx;
		font-size: 16px;

		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.btn-logout-hover {
		background: linear-gradient(to right, #365fdd, #36bbfa);
	}
</style>
