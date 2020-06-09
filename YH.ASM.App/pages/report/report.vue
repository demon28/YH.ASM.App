<template>
	<view>

		<cmd-page-body type="top">
			<cmd-transition name="fade-up">
				<view>

					<cmd-cel-item title="姓名" addon="文天成 (11003870)"></cmd-cel-item>
					<cmd-cel-item title="部门" addon="信息中心-MES"></cmd-cel-item>
					<cmd-cel-item title="日期" :addon="datetime"></cmd-cel-item>
					<cmd-cel-item title="定位地址" :addon="locatladdress"></cmd-cel-item>


					<view class="uni-list" style="margin-top: 30upx;">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								* 日报类型（必填）:
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker>
							</view>
						</view>
					</view>

					<view class="uni-list" style="margin-top: 10upx;">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								* 当前项目（必填）:
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="indexProject" :range="arrayProject" :range-key="'value'">
									<view class="uni-input">{{arrayProject[indexProject].value}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="uni-list" style="margin-top: 10upx;">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								* 项目客户（必填）:
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
					<view class="uni-list" style="margin-top: 10upx;">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								* 问题工单（必填）:
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
					<cmd-cel-item title="*日报类型"  addon="必选"  arrow></cmd-cel-item>
					<cmd-cel-item title="*当前项目" addon="必选" arrow></cmd-cel-item>
					<cmd-cel-item title="*项目客户" addon="必选" arrow></cmd-cel-item>
					<cmd-cel-item title="*项目客户" addon="必选" arrow></cmd-cel-item>
					 -->



					<view style="margin-top: 20upx;">

						<textarea class="uni-input" style="border:solid 1upx #D3D3D3 ; height: 150upx; width: 100%;" name="input"
						 placeholder="每日简报" />
						</view>


					<button class="btn-logout" style="margin-top: 20upx;">提交</button>
				</view>
			</cmd-transition>
		</cmd-page-body>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"

	export default {
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCelItem,
			cmdAvatar
		},

		data() {
			return {
			
				 array: ['早报', '晚报'],
				 
				  arrayProject: [{
					  key:"0",
					  value:"惠州长治项目"
				  },{
					  key:"1",
					  value:"深圳龙华项目"
				  }],
				  
				  arrayProjectKehu: [{
				  		  key:"0",
				  		 value:"张福军"
				  },{
				  		 key:"1",
				  		value:"刘之龙"
				  }],
				  
				  arraySupport: [{
				  		  key:"0",
				  		 value:"拿铁001设备噪音较大"
				  },{
				  		 key:"1",
				  		value:"宏观002设备没声音"
				  }],
				  
				 index: 0,
				 indexProject:0,
				 indexProjectkehu:0,
				 indexSupport:0,
				 locatladdress:"",
				 locatllongitude:"0",
				 locatllatitude:"0",
				datetime:""
			}
		},

		mounted() {
			
			//当前时间
			    var myDate = new Date();
			    this.datetime= myDate.toLocaleDateString();
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
		        getAuthorizeInfo(){
		            const that = this;
		            uni.authorize({
		                scope: 'scope.userLocation',
		                success() { // 允许授权
		                    that.getLocationInfo();
		                },
		                fail(){    // 拒绝授权
		                    that.openConfirm();
		                    console.log("你拒绝了授权，无法获得周边信息")
		                }
		            })
		        },
		        // 获取地理位置
		        getLocationInfo(){  
					var _self=this;
					
		            uni.getLocation({
		                type: 'wgs84',
		                success (res) {
		                    console.log(res);
							console.log(res.latitude.toString());
							
											_self.locatllatitude= res.latitude.toString();
											_self.locatllongitude  = res.longitude.toString();
							uni.request({
										header:{
													"Content-Type": "application/text"
												},
											url:'http://apis.map.qq.com/ws/geocoder/v1/?location='+res.latitude+','+res.longitude+'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
												success(re) {
													console.log(re)
													console.log(re.data.result.address)	 
													 
													if(re.statusCode===200){
														 _self.locatladdress=re.data.result.address;
														console.log("获取中文街道地理位置成功")
													}else{
														console.log("获取信息失败，请重试！")
													}
												 }
											});
							
						
							
							
		                }
		            });
		        },
		
		        // 再次获取授权
		        // 当用户第一次拒绝后再次请求授权
		        openConfirm(){
		            uni.showModal({
		                title: '请求授权当前位置',
		                content: '需要获取您的地理位置，请确认授权',
		                success: (res)=> {
		                    if (res.confirm) {
		                        uni.openSetting();// 打开地图权限设置
		                    } else if (res.cancel) {
		                        uni.showToast({
		                            title: '你拒绝了授权，无法获得周边信息',
		                            icon: 'none',
		                            duration: 1000
		                        })
		                    }
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
