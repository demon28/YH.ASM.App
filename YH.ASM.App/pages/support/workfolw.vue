<template>
	<view class="content">

		<!--第一个流程，显示工单创建-->
		<view class="uni-list" style="margin-top: 30upx;" v-if="supportModelShow">

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					流程节点：
				</view>
				<view class="uni-list-cell-db">
					<text style="color: #007AFF;"> {{GetStatus(supportModel.NEXT_STATUS)}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					工单编号：
				</view>
				<view class="uni-list-cell-db">
					<text> {{supportModel.CODE}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					项目名称：
				</view>
				<view class="uni-list-cell-db">
					<text> {{supportModel.PROJECTNAME}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					问题机型：
				</view>
				<view class="uni-list-cell-db">
					<text> {{ supportModel.MACHINENAME}}-{{supportModel.MACHINESERIAL}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					问题类型：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{GetType(supportModel.SUPPORTTYPE)}}</view>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					严重程度:
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{GetSeverity(supportModel.SEVERITY)}}</view>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					发现时间:
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{supportModel.FINDATE}}</view>

				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					处 理 人：
				</view>
				<view class="uni-list-cell-db">
					<text> {{supportModel.NEXT_USER}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					创建时间：
				</view>
				<view class="uni-list-cell-db">
					<text> {{supportModel.CREATETIME}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-db">
					<view style="margin-left: 20upx;"> 问题描述：</view>
					<view class="uni-textarea">
						<textarea v-model="supportModel.CONTENT" />
						</view>
				
				</view>
			</view>
			
		</view>
		
		<!--第二个流程，显示技术人员处理-->
		<view class="uni-list" style="margin-top: 30upx;" v-if="disporerModelShow">
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view  class="uni-list-cell-left">
					 流程节点：
				</view>
				<view class="uni-list-cell-db">
					<text style="color: #007AFF;"> {{GetStatus(disporerModel.NEXT_STATUS)}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 分析人员：
				</view>
				<view class="uni-list-cell-db">
					<text> {{disporerModel.ANALYZEUSER}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 责 任 方：
				</view>
				<view class="uni-list-cell-db">
					<text> {{disporerModel.RESPONSIBLE}} </text>
				</view>
			</view>
		
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 责 任 人：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{ disporerModel.DUTY}} </text>
				</view>
			</view>
		
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 BOM图纸：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{disporerModel.BOM}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 是否下单：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{disporerModel.ISORDER==1?"是":"否"}}</view>
			
				</view>
			</view>
			<view v-if="disporerModel.ISORDER==1" class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 下 单 人：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{disporerModel.ORDERMAN}}</view>
			
				</view>
			</view>
			<view v-if="disporerModel.ISORDER==1" class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 下单时间：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{disporerModel.ORDERTIME}}</view>
			
				</view>
			</view>
		
		
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 处 理 人:
				</view>
				<view class="uni-list-cell-db">
					<text> {{disporerModel.NEXT_USER}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 处理时间：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{disporerModel.CREATETIME}}</view>
			
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-db">
					<view style="margin-left: 20upx;">分析原因：</view>
					<view class="uni-textarea" >
						<textarea tyle="margin-left: 20upx;"  v-model="disporerModel.ANALYZE" />
					</view>
				
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-db">
					<view style="margin-left: 20upx;"> 解决方案：</view>
					<view class="uni-textarea"  style="width: 100%;">
						<textarea tyle="margin-left: 20upx;"  v-model="disporerModel.SOLUTION" />
					</view>
				</view>
			</view>
		</view>
		
		<!--第三个流程，PMC人员处理-->
		<view class="uni-list" style="margin-top: 30upx;" v-if="pmcModelShow">
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 流程节点：
				</view>
				<view class="uni-list-cell-db">
					<text style="color: #007AFF;"> {{GetStatus(pmcModel.NEXT_STATUS)}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 订 单 号：
				</view>
				<view class="uni-list-cell-db">
					<text> {{pmcModel.BOOKNO}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					收 货 人：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{ pmcModel.CONSIGNEE}} </text>
				</view>
			</view>
			
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					发货单号：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{ pmcModel.SENDNO}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					发货时间：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{ pmcModel.SENDDATE}} </text>
				</view>
			</view>
			
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					交付时间：
				</view>
				<view class="uni-list-cell-db">
					<text> {{pmcModel.DELIVERY}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 处 理 人:
				</view>
				<view class="uni-list-cell-db">
					<text> {{pmcModel.NEXT_USER}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 处理时间：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{pmcModel.CREATETIME}}</view>
			
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-db">
					<view style="margin-left: 20upx;">备注：</view>
					<view class="uni-textarea" >
						<textarea tyle="margin-left: 20upx;"  v-model="pmcModel.REMARKS" />
					</view>
				
				</view>
			</view>
			
			
			
		</view>
		
		<!--第4,5个流程，第四个流程 与  第五个流程在uni-app中不能用动态组件，只能v-for 循环判断-->
		<view v-for="(item,index) in componetItems" v-bind:key="index">
			
			<view class="uni-list" style="margin-top: 30upx;" v-if="item.endpoint=='site'">
				
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 流程节点：
					</view>
					<view class="uni-list-cell-db">
						<text style="color: #007AFF;"> {{GetStatus(item.model.NEXT_STATUS)}} </text>
					</view>
				</view>
				
				
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 预计完成时间：
					</view>
					<view class="uni-list-cell-db">
						<text> {{item.model.ENDDATE}} </text>
					</view>
				</view>
				
			
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 处 理 人:
					</view>
					<view class="uni-list-cell-db">
						<text> {{item.model.NEXT_USER}} </text>
					</view>
				</view>
				
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 处理时间：
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input">{{item.model.CREATETIME}}</view>
				
					</view>
				</view>
			
				
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-db">
						<view style="margin-left: 20upx;">结果描述：</view>
						<view class="uni-textarea" >
							<textarea tyle="margin-left: 20upx;"  v-model="item.model.DESCRIPTION" />
						</view>
					
					</view>
				</view>
				
			</view>
			
			<view class="uni-list" style="margin-top: 30upx;" v-if="item.endpoint=='principal'">
				
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 流程节点：
					</view>
					<view class="uni-list-cell-db">
						<text style="color: #007AFF;"> {{GetStatus(item.model.NEXT_STATUS)}} </text>
					</view>
			 	</view>
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 实际完成时间：
					</view>
					<view class="uni-list-cell-db">
						<text> {{item.model.ENDDATE}} </text>
					</view>
				</view>
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 审核人：
					</view>
					<view class="uni-list-cell-db">
						<text> {{item.model.CHECKUSER}} </text>
					</view>
				</view>
				
				
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 审核结果：
					</view>
					<view class="uni-list-cell-db">
						<text style="color: #007AFF;"> {{item.model.STATUS==0?'审核通过': '审核不通过'}}  </text>
					</view>
				</view>
				
				
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 审核描述：
					</view>
					<view class="uni-list-cell-db">
						<text> {{item.model.RESULT}} </text>
					</view>
				</view>
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 处 理 人:
					</view>
					<view class="uni-list-cell-db">
						<text> {{item.model.NEXT_USER}} </text>
					</view>
				</view>
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						 处理时间：
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input">{{item.model.CREATETIME}}</view>
				
					</view>
				</view>
				
			</view>
			
		</view>
		
		
		
		
	</view>
	
	  
	
	</view>
	
</template>
<script>		
	import {mapState,mapMutations} from 'vuex';
	import * as Enum from "@/static/js/Enum.js";
	import ApiSingin from '../../static/js/ApiSingin.js';
	import config from '../../static/js/Config.js';
	import SugarRequest from '../../static/js/SugarRequest.js';
	
	export default {
		components: {  
				...mapState(['userId']),  
			
		},
		data() {
			return {
				Sid:0,
				componetItems:[],
				
				supportModel:{},
				supportModelShow:false,
				
				disporerModel:{},
				disporerModelShow:false,
				
				pmcModel:{},
				pmcModelShow:false,
				
				
				/**
				 * 有三个问题要解决：
				 * 1，uni-request 是异步请求，会造成 排列顺序乱了，
				 * 2，加载工单初始信息，不能根据工单表查，要根据 history表查，不然会导致工单信息编号 ---已处理
				 * 3，最后一步审核结果，显示错误，审核通过 和 审核不通过，显示不对  ----已解决
				 * */
				
				
			
			}
		},
		onLoad(prames){
		   var	_self=this;
		  this.Sid=prames.sid
		  
		  let model={};
		  model.sid=this.Sid;
		  console.log("工单id:"+ this.Sid);
		  let path="/api/Support/ListByHistory";
		  
		  this.$SugarRequest.Get(model,path,async (result,res)=>{
			  
						console.log(result.Content)
						 for (var i = 0; i < result.Content.length; i++) {
						
						                var type = result.Content[i].TYPE;
						                var sid = result.Content[i].SID;
						                var tid = result.Content[i].TID;
						
						                if (type==0) {
						                    _self.InsertSupport(sid,tid);
						                  
						                }
						                if (type == 1) {
						
						                    _self.InsertDisposer(sid, tid);
						                   
						                }
						                if (type == 2) {
						
						                    _self.InsertPmc(sid, tid);
						                   
						                }
										if (type == 3) {
												console.log("现场人员处理完了·····！")
											await _self.InsertSite(sid, tid);
										}
										if (type == 4) {
													console.log("到负责人审核完了·····！")
										    await _self.InsertPrincipal(sid, tid);
										}
									
											
									}
						     

				
				
				
			  
			  
		  });
			
			
			
		},
		methods: {
			InsertSupport(sid,tid){
				var _self=this;
				console.log("InsertSupport======="+sid);
				  
				  let path="/api/Support/GetSupportInfo";
				  let model={};
				  model.sid=sid;
				    model.tid=tid;
				  
				 this.$SugarRequest.Get(model,path,(data,res)=>{
					 
					 console.log("创建工单的信息。。。。")
					 console.log(data);
			
					_self.supportModel=data.Content;
					_self.supportModelShow=true;
					 
					 
				 });
				
			},
			InsertDisposer(sid,tid){
				
				var _self=this;
				console.log(tid+"InsertDisposer======="+sid);
				  
				  let path="/api/Support/GetDisposerInfo";
				  let model={};
				  model.sid=sid;
				  model.tid=tid;
				  
				 this.$SugarRequest.Get(model,path,(data,res)=>{
				
					 _self.disporerModel=data.Content;
					 _self.disporerModelShow=true;
					 
				 });
				
				
			},
			InsertPmc(sid,tid){
			
				var _self=this;
				console.log(tid+"InsertDisposer======="+sid);
				  
				  let path="/api/Support/GetPmcInfo";
				  let model={};
				  model.sid=sid;
				  model.tid=tid;
				  
				 this.$SugarRequest.Get(model,path,(data,res)=>{
					 
					 _self.pmcModel=data.Content;
					 _self.pmcModelShow=true;
					 
				 });
				
				
				
			},
		   async InsertSite(sid,tid){
				
				var _self=this;
				console.log(tid+"InsertSite======="+sid);
				  
				
				  let model={};
				  model.sid=sid;
				  model.tid=tid;
				  
				  let path="/api/Support/GetSiteInfo";
					
					let jsonString=JSON.stringify(model);
					let apikey=config.Parameters.ApiKey;
					let timestamp=Math.round(new Date().getTime()/1000);
					let Singinkey= ApiSingin.Singin(path,"",apikey,timestamp);
				  
				  	var [error, res] = await  uni.request({
				    url:config.Parameters.LoginHost()+path, //仅为示例，并非真实接口地址。
				    data: model,
					method :"Get",
				    header: {
				        'content-type': 'application/json' ,//自定义请求头信息
						 'timestamp':timestamp,
						 'SigningKey':Singinkey
				    },
				
				});
				
				
				let siteModel={ };
											
				siteModel.endpoint="site";
				siteModel.model=res.data.Content;
				
				_self.componetItems.push(siteModel);
				  
				  
				  /*
				  this.$SugarRequest.Get(model,path,(data,res)=>{
					 
					 console.log(data);
					 let siteModel={ };
							
					 siteModel.endpoint="site";
					 siteModel.model=data.Content;
					 
					 _self.componetItems.push(siteModel);
					 
					 
				 });
				*/
			},
			async InsertPrincipal(sid,tid){
				  
				var _self=this;
				console.log(tid+"InsertPrincipal======="+sid);
				  
				 	  let model={};
				 	  model.sid=sid;
				 	  model.tid=tid;
				 	  
					  let path="/api/Support/GetPrincipalInfo";
				 		
				 let jsonString=JSON.stringify(model);
				 let apikey=config.Parameters.ApiKey;
				 let timestamp=Math.round(new Date().getTime()/1000);
				 let Singinkey= ApiSingin.Singin(path,"",apikey,timestamp);
				 	  
				   var [error, res] = await  uni.request({
				 	    url:config.Parameters.LoginHost()+path, //仅为示例，并非真实接口地址。
				 	    data: model,
				 		method :"Get",
				 	    header: {
				 	        'content-type': 'application/json' ,//自定义请求头信息
				 			 'timestamp':timestamp,
				 			 'SigningKey':Singinkey
				 	    },
				 	
				 	});
				 	
				 	
				 	let siteModel={ };
				 								
				 	siteModel.endpoint="principal";
				 	siteModel.model=res.data.Content;
				 	
				 	_self.componetItems.push(siteModel);
				 
				 
				 
				 /* 
				 this.$SugarRequest.Get(model,path,(data,res)=>{
					 
					 console.log(data);
					 let princModel={}
					 princModel.endpoint="principal";
					 princModel.model=data.Content;
					 
					 _self.componetItems.push(princModel);
					 
					 
				 });
				*/
			},
			
			GetSeverity(value){
				return Enum.EnumGetSingle(value,Enum.Support_Severitylist())
			},
			GetType(value){
			 return	Enum.EnumGetSingle(value,Enum.Support_Typelist())
			},
			GetStatus(value){
				return Enum.EnumGetSingle(value,Enum.Support_Statuslist())
			}
			
		},
		computed: {
			
		},
		props: {
			model: {},
		},
		created() {
	
		},
	}
	
	
	
	
</script>


<style>
</style>
