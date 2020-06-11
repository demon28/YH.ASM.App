<template>




	<view class="content">

		<uni-list>
			<uni-list-item title="姓名:" :show-arrow="false" :rightText="unionName"></uni-list-item>
			<uni-list-item title="部门:" :show-arrow="false" :rightText="unionDtname"></uni-list-item>
			<uni-list-item title="日期:" :show-arrow="false" :rightText="datetime"></uni-list-item>
			<uni-list-item title="定位地址:" :show-arrow="false" :rightText="locatladdress"></uni-list-item>
		</uni-list>

		    <view class="uni-list" style="margin-top: 30upx;">
								<view class="uni-list-cell">
									<view class="uni-list-cell-left">
										* 日报类型:
									</view>
									
									<view class="uni-list-cell-db">
										<picker @change="bindPickerChange" :value="indexType" :range="arrayType">
											<view class="uni-input">{{arrayType[indexType]}}</view>
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
										<picker @change="projectPickerChange" :value="indexProject" :range="arrayProject" :range-key="'value'">
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

		
    
                     <view class="uni-textarea" style="margin-top: 30upx;">
                         <textarea placeholder="请输入今日简报的内容"  v-model="content" />
                     </view>
                

		<button class="btn-logout" style="margin-top: 20upx;" @click="onInfoSubmit()">提交</button>


	</view>







</template>

<script>
	import unilist from '../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../components/uni-list/uni-list.vue';

	

	import {
		mapState
	} from 'vuex'


	export default {
		computed: { ...mapState(['forcedLogin', 'hasLogin', 'userName', 'workid', 'department', 'dtname','userId'])
		},

		components: {
			unilist,
			unilist_item
		},

		data() {
			return {

				arrayType: ['早报', '晚报'],

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

				indexType: 0,
				indexProject: 0,
				indexProjectkehu: 0,
				indexSupport: 0,
				locatladdress: "",
				locatllongitude: "0",
				locatllatitude: "0",

				unionName: "",
				unionDtname: "",
				datetime: "",
				content:""
			}
		},

		mounted() {

			//变量赋值
			var myDate = new Date();
			
			this.datetime = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
			
			
			this.unionName = this.userName + "(" + this.workid + ")";
			this.unionDtname = this.department + "-" + this.dtname + "";

			//当前定位
			this.getAuthorizeInfo();

		},

		methods: {


			bindPickerChange: function(e) {
			console.log(e.target.value);
				this.indexType = e.target.value
			},

			projectPickerChange: function(e) {

				this.indexProject = e.target.value
			},
			projectkehuPickerChange: function(e) {

				this.indexProjectkehu = e.target.value
			},
			supportPickerChange: function(e) {
                console.log(e.target.value);
				this.indexSupport =e.target.value;
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
	   uni.showLoading({
				    title: '正在获取当前位置...'
				});
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						console.log(res);
						


						if(!res.latitude){
							
							console.log("经纬度不存在！");
							
							uni.showModal({
								title: '定位失败',
								content: '请打开手机GPS定位',
								showCancel:false,
								success: (res) => {}
							});
							
							return;
							
						}

						console.log(res.latitude.toString());
						_self.locatllatitude = res.latitude.toString();
						_self.locatllongitude = res.longitude.toString();
						
						
						
						
						uni.request({
							header: {
								"Content-Type": "application/text"
							},
							url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude +
								'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
							success(re) {



					//关闭加载框
					 uni.hideLoading(); 
					 
								console.log(re.data.result.address)

								if (re.statusCode === 200) {
									_self.locatladdress = re.data.result.address;
									console.log("获取中文街道地理位置成功"+_self.locatladdress);
								} else {
									console.log("获取信息失败，请重试！");
									uni.showToast({
										title: '获取地理位置信息失败！',
										icon: 'none',
										duration: 1000
									})
									
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
				var _self=this;
				
				uni.showLoading({
				    title: '提交中'
				});
				
				var Key=this.ApiKey;
				 console.log(_self.userId);
				 console.log(_self.indexProject);
				 console.log(_self.indexProjectkehu);
				 console.log(this.indexType);
				  console.log(_self.indexType);
				 console.log(_self.indexSupport);
				uni.request({
				    url:this.LoginHost+"/api/Direction/Put", //仅为示例，并非真实接口地址。
				    data: {
						userId:_self.userId,
						projecId:_self.indexProject,
						customerId:_self.indexProjectkehu,
						type:_self.indexType,
						supportId:_self.indexSupport,
						longitude:_self.locatllongitude,
						latitude:_self.locatllatitude,
						content:_self.content,
						address:_self.locatladdress,
						date:_self.datetime,
					   SigningKey:Key
				    },
					method :"POST",
				    header: {
				        'content-type': 'application/json' //自定义请求头信息
				    },
				    success: (res) => {
				     
					 console.log(JSON.stringify(res));
					 
					 //关闭加载框
					 uni.hideLoading(); 
					 
						 if (!res.data.Success) {
							
							uni.showToast({
								icon: 'none',
								title: res.data.Message,
							});
							
							return;
							}
						
							
						uni.showModal({
							
							content: '提交成功，是否返回首页？',
							showCancel: true,
							success: (res) => {
								if (res.confirm) {
								
											uni.navigateBack();
									
								   }
							    }
					     	});
						 
				    }
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
