<template>




	<view class="content">



		<view class="uni-list" style="margin-top: 30upx;">



			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 项目名称:
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right" @click="onFillProject">
					<text> {{project.name}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 问题机型:
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right" @click="onFillMachine">
					<text> {{machine.name}}-{{machine.serial}} </text>
				</view>
			</view>


			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 严重程度:
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="Severity" :range="SeverityList" :range-key="'text'">
						<view class="uni-input">{{SeverityList[Severity].text}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 发现时间:
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="finddate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{finddate}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 处理人:
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right" @click="onFillUser">
					<text> {{conductor.name}} </text>

				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					抄送人员:
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right" @click="onFillCopy">
					<text> <text v-for="item in copy" :key="item.uuid">{{item.name+","}}</text> </text>
				</view>
			</view>

		</view>

		<view class="uni-list" style="margin-top: 30upx;">
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




		</view>


		<view class="uni-textarea" style="margin-top: 30upx;">
			<textarea placeholder="请输入问题描述" v-model="content" />
			</view>
                

		<button class="btn-logout" style="margin-top: 30upx;" @click="onSubmit()">提交</button>
 
	

 </view>

</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import unilist from '../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../components/uni-list/uni-list.vue';
	
	import {Support_Prioritylist, Support_Severitylist} from "../../static/js/Enum.js";
	
	
	import ApiSingin from '../../static/js/ApiSingin.js';
	import Verificat from '../../static/js/Verificat.js';

	export default {
		computed:
		{ 
		...mapState(['userId','supportProject','supportConductor','supportCopy','supportMachine']),  
        endDate() {
            return this.getDate('end');
        }
		
		},
		components: {
			
		},
		data() {
			const currentDate = this.getDate({ format: true });
			
			return {
					list:[],
				project:{},
				machine:{},
				content:"",
				Severity:0,
				SeverityList:this.Support_Severitylist(),
				conductor:{},
				finddate: currentDate,
				copy:[],
				uploadfile:[],
				filelist:[],
				fileStatus:""
			}
		},
		onShow(option){
			var _self=this;
			  let checkproject=_self.supportProject;
			  
			  console.log("===========哎哟，wx不执行吗"+JSON.stringify(checkproject));
			  if(checkproject!=null && checkproject.length>0){
				  _self.project=checkproject[0];
			  }else{
				    console.log("=========== this.project.name");
				  _self.project={name:"请选择"};
			  }  
			  
			  	  let checkconductor=_self.supportConductor;
			  	  if(checkconductor!=null && checkconductor.length>0){
			  		  _self.conductor=checkconductor[0];
			  	  }else{
					     console.log("=========== this.conductor.name");
					  _self.conductor={name:"请选择"};;
					  
				  }
				  
				  
				  let checkMid=_self.supportMachine;
				  if(checkMid!=null && checkMid.length>0){
				  			  		  _self.machine=checkMid[0];
				  }else{
				  					     console.log("=========== this.conductor.name");
				  					  _self.machine={name:"请选择",serial:""};;
				  					  
				  }
				  
				  
				  
				  
				  
				  
				let checkCopy=_self.supportCopy;
				if(checkCopy!=null && checkCopy.length>0){
					_self.copy=checkCopy;
				}
				  
			  
			
		},
		mounted() {
				console.log("我是可以获取到值的："+this.supportProject);
		},
		methods: {
		Support_Severitylist,
		onSubmit(){
			var _self=this;
			var paramsCheck=_self.verifyParameters();
			if(!paramsCheck.res)
			{
				uni.showToast({
					icon:"none",
					title:paramsCheck.message
				})
				return;
			}
			
			let supportModel={};
			supportModel.CreatorId=_self.userId;
			supportModel.ConductorId=_self.conductor.uuid;
			supportModel.ProjectId=_self.project.id;
			supportModel.Severity=_self.Severity;
			supportModel.FindDate=_self.finddate;
			supportModel.Title="";
			supportModel.Content=_self.content;
			supportModel.Mid=_self.machine.id;
			console.log(_self.filelist);
			supportModel.Filelist=_self.filelist;
			
			
			
			let ccValue="";
			if(_self.copy.length>0){
				
				//循环拼接推送人员
				for (var i = 0; i < _self.copy.length; i++) {
					ccValue+=_self.copy[i].uuid+",";
				}
				ccValue = ccValue.substring(0, ccValue.length - 1);   //去掉最后一个逗号
				
				//有推送则添加推送消息，没有则不添加
				supportModel.Push={CONDUCTOR:_self.conductor.uuid,CC:ccValue,POINT:0};
			}
			
			let jsonString=JSON.stringify(supportModel);
			let path="/api/Support/Create";
			let apikey=config.Parameters.ApiKey;
			
			let timestamp=Math.round(new Date().getTime()/1000);
		 	let Singinkey= ApiSingin.Singin(path,jsonString,apikey,timestamp);
			
			uni.showLoading({
			    title: '提交中'
			});
			
			
			
			console.log("请求参数jsonString:"+jsonString);
			console.log("请求参数path:"+path);
			console.log("请求参数apikey:"+apikey);
			console.log("请求参数timestamp:"+timestamp);
			console.log("请求参数Singinkey:"+Singinkey);
		
			
			 
			uni.request({
			    url:config.Parameters.LoginHost()+path, //仅为示例，并非真实接口地址。
			    data: supportModel,
				method :"POST",
			    header: {
			        'content-type': 'application/json' ,//自定义请求头信息
					 'timestamp':timestamp,
					 'SigningKey':Singinkey
			    },
			    success: (res) => {
			  
			     uni.hideLoading();
				 console.log(res);
				 console.log("看看json字符串"+JSON.stringify(res));
				 		
				if(res.statusCode!=200){
					uni.showToast({
						icon: 'none',
						title: "请填写正确的参数信息"
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
				 
				 
				 uni.showModal({
				 	        content: '提交成功，返回首页！',
				 	        showCancel: false,
				 	        success: (res) => 
					        			{
					        				if (res.confirm) 
					        				{
					        					console.log("回到首页");
					        					uni.reLaunch({url:"../main/main"});
				 	        				
					        				}
					        			}
				  	});
					
					
					 
			    }
				,fail(re){
					
					console.log(re);
					
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: '网络请求失败！'
					});
					
				}
			
			
			});
			
			
			
			
			
			
		},
		bindPickerChange(e){
			this.Severity = e.target.value
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
		bindDateChange(e){
			
			      this.finddate = e.target.value
		},
		onFillUser(){
			uni.navigateTo({
				url: '../user/fillUser?isSingle=true&type=conductor'
			});
		},
		onFillProject(){
			
			uni.navigateTo({
				url: '../project/fillProject?isSingle=true'
			});
			
		},
		onFillCopy(){
			uni.navigateTo({
				url: '../user/fillUser?isSingle=false&type=copy'
			});
		},
		onFillMachine(){
			uni.navigateTo({
				url: '../machine/fillMachine?isSingle=true'
			});
		},
		
		onUpload(){
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
					 userid:_self.userId
				 }
				 
				 console.log("上传参数："+JSON.stringify(params));
				 
				 uni.uploadFile({
				            url:  _self.LoginHost + "/api/Upload/UploadFile",
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
		verifyParameters(){
			
			let _self=this;
			let result={res:true,message:""};
			
			 console.log("项目："+JSON.stringify(_self.project));
			if(!Verificat.itemHasKeyVer(_self.project,"id")){
				result.res=false;
				result.message="请选择项目";
			}
			
			if(!Verificat.itemHasKeyVer(_self.machine,"id")){
				result.res=false;
				result.message="请填写问题机型";
			}
			  
			 console.log("处理人："+JSON.stringify(_self.conductor));
			if(!Verificat.itemHasKeyVer(_self.conductor,"uuid"))
			{
				result.res=false;
				result.message="请选择处理人";
			}
	     
			if(!Verificat.isNotNullTrim(_self.content)){
				result.res=false;
				result.message="请填写问题描述";
			}
			 
			return result;
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
