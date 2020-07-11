<template>
	<view class="content">
		
		<!--第一个流程，显示工单创建-->
		<view class="uni-list" style="margin-top: 30upx;"  v-if="supportModelShow">
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 流程节点：
				</view>
				<view class="uni-list-cell-db">
					<text> {{GetStatus(supportModel.STATUS)}} </text>
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
				<view class="uni-list-cell-db" >
					<text> {{ supportModel.MACHINENAME}}-{{supportModel.MACHINESERIAL}} </text>
				</view>
			</view>
		
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 问题类型：
				</view>
				<view class="uni-list-cell-db">
				<view class="uni-input">{{GetType(supportModel.TYPE)}}</view>
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
					<text> {{supportModel.CONDUCTORNAME}} </text>
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
			<view style="margin-left: 20upx;">	问题描述：</view>
					<view class="uni-textarea" >
						<textarea  v-model="supportModel.CONTENT" />
					</view>
				
				</view>
			</view>
			
		</view>
		
		<!--第二个流程，显示技术人员处理-->
		<view class="uni-list" style="margin-top: 30upx;" v-if="disporerModelShow">
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 流程节点：
				</view>
				<view class="uni-list-cell-db">
					<text> {{GetStatus(disporerModel.NEXT_STATUS)}} </text>
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
					<text> {{GetStatus(pmcModel.NEXT_STATUS)}} </text>
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
					发货时间：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{ pmcModel.SENDDATE}} </text>
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
		
		
		
	</view>
	
	  
	
	</view>
	
</template>
<script>		
	import {mapState,mapMutations} from 'vuex';
	import {Support_Prioritylist, Support_Severitylist} from "@/static/js/Enum.js";
	import * as Enum from "@/static/js/Enum.js";
	
	import siteInfo from '@/components/support-workflow/siteInfo.vue';
	import supportInfo from '@/components/support-workflow/supportInfo.vue';
	import disposerInfo from '../../components/support-workflow/disposerInfo.vue'
	import pmcInfo from '../../components/support-workflow/pmcInfo.vue'
	import principalInfo from '../../components/support-workflow/principalInfo.vue'
	
		import SugarRequest from '../../static/js/SugarRequest.js';
	export default {
		components: {  
				...mapState(['userId']),  
				supportInfo,
				disposerInfo,
				pmcInfo,
				siteInfo,
				principalInfo
		},
		data() {
			return {
				Sid:0,
				items:[],
				supportModel:{},
				supportModelShow:false,
				
				disporerModel:{},
				disporerModelShow:false,
				
				pmcModel:{},
				pmcModelShow:false,
				
				
				siteModel:{},
				siteModelShow:false,
				
				
			
			}
		},
		onLoad(prames){
		   var	_self=this;
		  this.Sid=prames.sid
		  
		  let model={};
		  model.sid=this.Sid;
		  console.log("工单id:"+ this.Sid);
		  let path="/api/Support/ListByHistory";
		  
		  this.$SugarRequest.Get(model,path,(result,res)=>{
			  
						console.log(result.Content)
						    for (var i = 0; i < result.Content.length; i++) {
						
						                var type = result.Content[i].TYPE;
						                var sid = result.Content[i].SID;
						                var tid = result.Content[i].TID;
						
						                if (type==0) {
						                    _self.InsertSupport(sid);
						                    console.log(1);
						                }
						                if (type == 1) {
						
						                    _self.InsertDisposer(sid, tid);
						                    console.log(2);
						                }
						                if (type == 2) {
						
						                    _self.InsertPmc(sid, tid);
						                    console.log(3);
						                }
						                if (type == 3) {
						
						                    _self.InsertSite(sid, tid);
						                    console.log(4);
						                }
						                if (type == 4) {
						
						                    _self.InsertPrincipal(sid, tid);
						                    console.log(5);
						                }
						      }

				
				
				
			  
			  
		  });
			
			
			
		},
		methods: {
			InsertSupport(sid,tid){
				var _self=this;
				console.log(tid+"InsertSupport======="+sid);
				  
				  let path="/api/Support/GetSupportInfo";
				  let model={};
				  model.sid=sid;
				  
				  
				 this.$SugarRequest.Get(model,path,(data,res)=>{
					 
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
			InsertSite(sid,tid){
				
				var _self=this;
				console.log(tid+"InsertSite======="+sid);
				  
				  let path="/api/Support/GetSiteInfo";
				  let model={};
				  model.sid=sid;
				  model.tid=tid;
				  
				 this.$SugarRequest.Get(model,path,(data,res)=>{
					 
					 console.log(data);
					 let supportModel={ };
							
					 supportModel.component=siteInfo;
					 supportModel.list=data.Content;
					 
					 _self.items.push(supportModel);
					 
					 
				 });
				
			},
			InsertPrincipal(sid,tid){
				  
				var _self=this;
				console.log(tid+"InsertSite======="+sid);
				  
				  let path="/api/Support/GetPrincipalInfo";
				  let model={};
				  model.sid=sid;
				  model.tid=tid;
				  
				 this.$SugarRequest.Get(model,path,(data,res)=>{
					 
					 console.log(data);
					 let supportModel={ };
							
					 supportModel.component=principalInfo;
					 supportModel.list=data.Content;
					 
					 _self.items.push(supportModel);
					 
					 
				 });
				
			},
			
			GetSeverity(value){
				return EnumGetSingle(value,Enum.Support_Severitylist())
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
