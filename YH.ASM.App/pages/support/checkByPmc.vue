<template>




	<view class="content">

		<view class="uni-list">



			<view class="uni-list-cell" style="min-height:80upx ; ">
				<view class="uni-list-cell-left">
					* 物料单号:
				</view>
				<view class="uni-list-cell-db">
					<input placeholder="请输入物料单号" v-model="bookno" />
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 发货单号:
				</view>
				<view class="uni-list-cell-db">
					<input placeholder="请输入发货单号" v-model="sendno" />
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 收 货 人:
				</view>
				<view class="uni-list-cell-db">
					<input placeholder="请输入收货人" v-model="consignee" />
				</view>
			</view>



			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 交付时间:
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="delivery" :end="endDate" @change="bindDateChangedev">
						<view class="uni-input">{{delivery}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 送货时间:
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="senddate" :end="endDate" @change="bindDateChangeSend">
						<view class="uni-input">{{senddate}}</view>
					</picker>
				</view>
			</view>



		</view>


		<!--上传文件操作开始，不用动 -->
		<view class="uni-list" style="margin-top: 30upx;">

			<!--抄送人员以及处理人 操作开始，不用动 -->
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 下一处理人:
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right" @click="onFillUser">
					<text> {{conductor.name}} </text>

				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					抄送人员:
				</view>
				<view class="uni-list-cell-navigate" @click="onFillCopy">
					<text> <text v-for="item in copy" :key="item.uuid">{{item.name+","}}</text> </text>
				</view>
				<view>
					<text style="color: #007AFF;margin-right: 20upx;" @click="clearCC" v-if="copy.length>0">清空</text>
				</view>
			</view>
			<!--抄送人员以及处理人，不用动 -->



			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					上传附件:
				</view>
				<view>
					<button @click="onUpload" size="mini" type="default" class="mini-btn" style="margin-right: 15upx;margin-top: 5upx; ">添加</button>
				</view>
			</view>


			<view class="uni-list-cell" style="min-height:80upx ;" v-for="file in uploadfile" :key="file.tempFilePath">
				<view class="uni-list-cell-left">
					{{file.type}}
				</view>
				<view>
					<text style="margin-right: 30upx; color: #0FAEFF;">{{fileStatus}}</text>
				</view>
			</view>
			<!--上传文件操作结束（其实应该封装成组件，但是现在还不会玩）-->



		</view>


		<view class="uni-textarea" style="margin-top: 30upx;">
			<textarea placeholder="结果描述" v-model="remarks" />
			</view>

		<button class="btn-logout" style="margin-top: 30upx;" @click="onSubmit()">提交</button>



	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	import Config from '../../static/js/Config.js';
	import SugarRequest from '../../static/js/SugarRequest.js';
	import Verificat from '../../static/js/Verificat.js';

	export default {
		computed: {
			...mapState(['userId', 'supportConductor', 'supportCopy']),
			endDate() {
				return this.getDate('end');
			},

		},

		data() {
			const currentDate = this.getDate({ format: true });
			return {

				sid: 0,
				conductor: {},
				copy: [],
				uploadfile: [],
				filelist: [],
				fileStatus: "",
				personal: 0,

				bookno: "",
				sendno: "",
				consignee: "",
				
				senddate: currentDate,
				delivery: currentDate,
				
				remarks:"",
			}
		},
		onLoad(pramse) {
			var _self = this;
			_self.personal = pramse.personal;
			_self.sid = pramse.sid;

		},
		onShow(option) {
			var _self = this;

			console.log("处理人员：" + JSON.stringify(_self.supportConductor));
			let checkconductor = _self.supportConductor;
			if (checkconductor != null && checkconductor.length > 0) {
				_self.conductor = checkconductor[0];
			} else {
				_self.conductor = {
					name: "请选择"
				};;
			}

			let checkCopy = _self.supportCopy;
			if (checkCopy != null && checkCopy.length > 0) {
				_self.copy = checkCopy;
			}
		
		
		
		},
		methods: {

		onSubmit() {
			var _self = this;
			
		//检查参数
		var paramsCheck = _self.verifyParameters();
		if (!paramsCheck.res) {
			uni.showToast({
				icon: "none",
				title: paramsCheck.message
			})
			return;
		}
		
		//组装实体
			let model = this.BuilderModel();
		
			console.log("我要开始出了工单了："+JSON.stringify(model));
			let path = "/api/Support/AddPmcOrder";
		
		//提交数据
				this.$SugarRequest.Post(model,path,(res,data)=>{
					
					uni.showModal({
						content: '处理成功，返回首页！',
						showCancel: false,
						success: (re) => {
							if (re.confirm)
							{
								console.log("回到首页");
								uni.reLaunch({url:"../main/main"});
							
							}
						}
					})
					
					
				});
				
		},
		

		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		bindDateChangeSend(e) {
			this.senddate = e.target.value;
		},
		bindDateChangedev(e) {
			this.delivery = e.target.value;
		},
		onFillUser() {
			uni.navigateTo({
				url: '../user/fillUser?isSingle=true&type=conductor'
			});
		},

		onFillCopy() {
			uni.navigateTo({
				url: '../user/fillUser?isSingle=false&type=copy'
			});
		},
		onUpload() {
			var _self=this;
			uni.chooseMedia({
			  count: 1,
			  mediaType: ['image','video'],
			  sourceType: ['album', 'camera'],
			  maxDuration: 30,
			  camera: 'back',
			  success(res) {
			  
				console.log("选择的文件====="+JSON.stringify(res));
				let type=res.type=="image"?"图片":"视频";
				
				_self.uploadfile=res.tempFiles;
				_self.uploadfile[0].type=type;
				_self.fileStatus="上传中...";
				
				//上传文件
				uni.showLoading({
					title:type+"，上传中..."
				});
				
				console.log("我要上传的文件路径"+_self.uploadfile[0].tempFilePath);
				 
				 let params={
					 SigningKey: _self.ApiKey,
					 userid:_self.userId,
					 	 sid:_self.sid
				 }
				 
				 console.log("上传参数："+JSON.stringify(params));
				 
				 uni.uploadFile({
				            url:  Config.Parameters.LoginHost() + "/api/Upload/UploadFileBySid",
				            filePath: _self.uploadfile[0].tempFilePath,
				            name: 'file',
				            formData: params,
							header:{"Content-Type": "multipart/form-data"},
				            success: (uploadFileRes) => {
								
								console.log(uploadFileRes);
				                console.log("文件上传成功，返回值："+JSON.stringify(uploadFileRes.data));
									
								_self.fileStatus="上传成功";
								
								uni.hideLoading();
								uni.showToast({
									title:"上传成功！"
								});
								_self.filelist=[]; //单文件上传，清空
								
								let json=JSON.parse(uploadFileRes.data);
								let file={ID:json.Content.ID,FILENAME:json.Content.FILENAME};
								console.log("填充文件列表：" + JSON.stringify(file));
								_self.filelist.push(file);
								
								
				            },fail(e) {
								console.log("上传文件失败====="+JSON.stringify(e))
									_self.fileStatus="上传失败";
				            	uni.hideLoading();
								uni.showToast({
									title:"上传失败！",
									icon:"none"
								});
									
				            }
				        });
				
				
				
			  }
			});
			
					
			
			
		},
		verifyParameters() {

			let _self = this;
			let result = {
				res: true,
				message: ""
			};

			if (!Verificat.isNotNullTrim(_self.bookno)) {
				result.res = false;
				result.message = "请填写物料单号";
			}

			if (!Verificat.isNotNullTrim(_self.sendno)) {
				result.res = false;
				result.message = "请填写发货单号";
			}
			if (!Verificat.isNotNullTrim(_self.consignee)) {
				result.res = false;
				result.message = "请填写收货人";
			}

			if (!Verificat.isNotNullTrim(_self.delivery)) {
				result.res = false;
				result.message = "请选择交付时间";
			}
			if (!Verificat.isNotNullTrim(_self.senddate)) {
				result.res = false;
				result.message = "请选择发货时间";
			}


			console.log("处理人：" + JSON.stringify(_self.conductor));
			if (!Verificat.itemHasKeyVer(_self.conductor, "uuid")) {
				result.res = false;
				result.message = "请选择处理人";
			}


			return result;

		},
		BuilderModel() {
		var _self=this;
			

			let model = {};

			//装载model
			model.SID = this.sid;
			model.NEXTUSER = this.conductor.uuid;
			model.PERSONALID = this.personal;
			model.SUPPORTSTATUS = 3;  

			model.BOOKNO = this.bookno;
			model.SENDNO = this.sendno;
			model.CONSIGNEE = this.consignee;

			model.SENDDATE = this.senddate; //下单时间
			model.DELIVERY = this.delivery;
			model.REMARKS=this.remarks;

			let ccValue = "";
			if (_self.copy.length > 0) {

				//循环拼接推送人员
				for (var i = 0; i < _self.copy.length; i++) {
					ccValue += _self.copy[i].uuid + ",";
				}
				ccValue = ccValue.substring(0, ccValue.length - 1); //去掉最后一个逗号

				//有推送则添加推送消息，没有则不添加
				model.Push = {
					CONDUCTOR: _self.conductor.uuid,
					CC: ccValue,
					POINT: 0
				};
			}
			return model;
		},
		
		clearCC(){
			this.copy=[];
		}
		},
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

	input {
		font-size: 26upx;

	}

	.btn-logout-hover {
		background: linear-gradient(to right, #365fdd, #36bbfa);
	}
</style>
