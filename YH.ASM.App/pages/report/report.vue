<template>




	<view class="content">

		<uni-list>
			<uni-list-item title="姓名:" :show-arrow="false" :rightText="unionName" style="min-height:80upx ; height: 80upx;"></uni-list-item>
			<uni-list-item title="部门:" :show-arrow="false" :rightText="unionDtname" style="min-height:80upx ; height: 80upx;"></uni-list-item>
			<uni-list-item title="日期:" :show-arrow="false" :rightText="datetime" style="min-height:80upx ; height: 80upx;"></uni-list-item>
			<uni-list-item title="定位地址:" :show-arrow="false" :rightText="locatladdress" style="min-height:80upx ; height: 80upx;"></uni-list-item>
		</uni-list>

	 <view class="uni-list" style="margin-top: 30upx;">
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 日报类型:
				</view>

				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="indexType" :range="arrayType">
						<view class="uni-input">{{arrayType[indexType]}}</view>
					</picker>
				</view>
			</view>
	
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 项目名称:
				</view>
				<view class="uni-list-cell-db">
					 <input class="uni-input"  placeholder="请输入当前项目名称" v-model="projectName" />
				</view>
			</view>
		
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 设备名称:
				</view>
				<view class="uni-list-cell-db">
				 <input class="uni-input"  placeholder="请输入项目客户信息" v-model="machineName" />
				</view>
			</view>
	
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 工单序号:
				</view>
				<view class="uni-list-cell-db">
				 <input class="uni-input"  placeholder="请输入处理的工单序号"  v-model="supportName" />
				</view>
			</view>
	
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 设备数量:
				</view>
				<view class="uni-list-cell-db">
				 <input class="uni-input"  placeholder="请输入设备数量"  v-model="machineCount"  type="number"  />
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 需求协助:
				</view>
				<view class="uni-list-cell-db">
				 <input class="uni-input"  placeholder="请输入需求协助"  v-model="machineAssist"    />
				</view>
			</view>
			
			
			
	
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
				* 售后人员:
				</view>
				<view  class="uni-list-cell-navigate uni-navigate-right"  @click="onSelectPeople()" >
					
					<text>  <text  v-for="item in checks">{{item.name+","}}</text>  </text>
				</view>
			</view>
			
		</view>
 


		<view class="uni-textarea" style="margin-top: 30upx;">
			<textarea placeholder="请输入今日简报的内容" v-model="content" />
			</view>
                

		<button class="btn-logout" style="margin-top: 20upx;" @click="onInfoSubmit()">提交</button>
 
	</view>



</template>

<script>
	import unilist from '../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../components/uni-list/uni-list.vue';

	
import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: { ...mapState(['forcedLogin', 'hasLogin', 'userName', 'workid', 'department', 'dtname','userId',"maintainer"])
		},

		components: {
			unilist,
			unilist_item
		},

		data() {
			return {

				arrayType: ['早报', '晚报'],

				
				indexType: 0,          //日报类型，早报，晚报
				indexProject: 0,       //项目外键id （已作废）
				indexProjectkehu: 0,   //客户外键id （已作废）
				indexSupport: 0,       //工单外键id （已作废） 
				locatladdress: "",    //地址
				locatllongitude: "0", //精度
				locatllatitude: "0",  //纬度

				unionName: "",     //用户
				unionDtname: "",   //部门信息
				datetime: "",    //时间
				content:"",    //工单内容
				
				projectName:"",      //项目名称
				customerName:"",   //客户名称   （已作废）
				supportName:"",    //工单名称
				
				machineName:"",  //设备名称
				machineCount:"", //设备数量
				
				maintenancePeople:[],//售后维护人员外键userid
				
				machineAssist:"",
				
				checks:[],
			}
		},
		onShow(option) { 
			
			console.log("子窗体传参数量："+this.maintainer.length);
		    
			let checkitem=this.maintainer;
			if(checkitem!=null && checkitem.length>0){
				this.checks=checkitem;
			}
			
			
			
		},
		mounted() {

			//变量赋值
			var myDate = new Date();
			
			this.datetime = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() +" "+myDate.getHours()+":"+myDate.getMinutes()+":"+ myDate.getSeconds();
			
			
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
				
				//加载提醒
	             uni.showLoading({
				    title: '正在获取当前位置...'
				});
				
				
				
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						console.log(res);
						


						if(!res.latitude){
							//关闭加载框
							 uni.hideLoading(); 
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
										duration: 3000
									});
									
								}
							}
						});

					},fail: (err) => {
							console.log(err);
							 uni.hideLoading(); 
							uni.showToast({
								title: '获取地理位置信息失败！请打开手机GPS定位!',
								icon: 'none',
								duration: 3000
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
				
				
				console.log(_self.projectName);
				console.log(_self.customerName);
				console.log(_self.projectName);
				
				if(_self.projectName==""){
					
					uni.showToast({
						icon: 'none',
						title: "请输入当前项目名称",
					});
					return
				}
				
				
				if(_self.machineName==""){
					
					uni.showToast({
						icon: 'none',
						title: "请输入设备名称",
					});
					return
				}
				
				
				if(_self.supportName==""){
					
					uni.showToast({
						icon: 'none',
						title: "请输入工单序号",
					});
					return
				}
				
				　if (parseFloat(_self.machineCount).toString() == "NaN") { 
				　　　
				 uni.showToast({
				 	icon: 'none',
				 	title: "设备数量为数字",
				 });
				 
				　　　　return ; 
				　　} 
				
				
				if(_self.machineCount==""){
					
					uni.showToast({
						icon: 'none',
						title: "请输入设备数量",
					});
					return
				}
				
				
				// if(this.indexType==1){
					
				// 	if(_self.content==""||_self.content.length<10)
				// 	{
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: "请输入写今日简报的内容，字数不低于10个字",
				// 		});
				// 		return
						
				// 	}
				// }
				
				
				
				uni.showLoading({
				    title: '提交中'
				});
				
				var Key=this.ApiKey;
				 // console.log(_self.userId);
				 // console.log(this.indexType);
				 
				 // console.log(_self.projectName);
				 // console.log(_self.customerName);
				 // console.log(_self.supportName);
				 // console.log(_self.content);
				 
				 
				 let afterUser="";
				 
				 for (let i = 0; i < _self.checks.length; i++) {
				 	afterUser+=_self.checks[i].name+","
				 }
				 
				console.log("打印售后人员："+_self.checks);
				   
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
						
						projectName:_self.projectName,
						customerName:_self.customerName,
						supportName:_self.supportName,
						
						 machineName:_self.machineName,
						 machineCount:_self.machineCount,
							remarks: afterUser  ,    //本来想用外键表的，这里tu简单，直接用的备注字段
					  machineAssist:_self.machineAssist,
					
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
								 
								console.log("回到首页");
								uni.reLaunch({
										url:"../main/main"
								});
											
								   }
							    }
					     	});
						 
				    }
				
				    ,fail(error){
						 console.log(error);
							uni.showToast({
								title:"网络请求失败！"
							})	
						
					}
				
				
				});
				
				
				
				

			}
			,
			onSelectPeople(){
		
				uni.navigateTo({
				
					url: 'person?isSingle=false'
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
