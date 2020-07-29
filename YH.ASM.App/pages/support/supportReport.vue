<template>
	<view class="content">
	
	
		<view >
			<uni-search-bar :radius="100" @input="Search()" v-model="words"></uni-search-bar>
		</view>
		  <view class=" uni-flex uni-row headerView">
		                <view class="flex-item  itemview">
							
							<view class="uni-flex uni-column" @click="ChangeState(0)">
							                <view class="flex-item flex-item-V "><text>待处理</text></view>
							                <view class="flex-item flex-item-V "><text class="counttext" style="color:#F37B1D;">{{wait}}</text></view>
							               
							 </view>
						
						</view>
		                <view class="flex-item  itemview" @click="ChangeState(1)">
							<view class="uni-flex uni-column">
							                <view class="flex-item flex-item-V "><text>处理中</text></view>
							                <view class="flex-item flex-item-V " ><text class="counttext" style="color:#0FAEFF;">{{being}}</text></view>
							               
							 </view>
						</view>
		                <view class="flex-item itemview" @click="ChangeState(2)">
							<view class="uni-flex uni-column">
							                <view class="flex-item flex-item-V "><text>已完成</text></view>
							                <view class="flex-item flex-item-V "><text class="counttext" style="color:#1AAD19;">{{complete}}</text></view>
							 </view>
						</view>
		    </view>
		
		<view class="list-view" v-for="(info,index) in list" v-bind:key='info.SID'>
			
			<view class="uni-flex uni-column " style="padding: 20upx;">
				
				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">
					编号：	<text style="color:#A5673F;"   @click="clickCard(info)"> {{info.CODE}}</text>
							
				</view>
				
				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">
					项目名称： {{info.PROJECTNAME}}[{{info.PROJECTCODE}}]
			
				</view>
				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">
					<text class="uni-text">问题机型： {{info.MACHINENAME}}[{{info.MACHINESERIAL}}] </text>
				</view>
				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">当前节点： 
				<text style="color: #007AFF;">{{SetStatus(info.STATUS)}}</text>
				</view>
				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">创建时间： {{info.CREATETIME}}</view>
				
				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">
					<view class="uni-flex uni-row">
						<view class="flex-item flex-item-V">严重程度：{{SetSeverity(info.SEVERITY)}}  </view>
					</view>
				</view>
			<!-- 	<view class="flex-item flex-item-V ">
					<view class="uni-flex uni-row">
			
						<view class="flex-item flex-item-V">工单状态： </view>
						<view class="flex-item flex-item-V">
							<uni-tag :text="SetState(info.PSTATUS)" type="primary" size="small" />
						</view>
					</view>
				</view> -->
				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">
					<view class="uni-flex uni-row">
						<view class="flex-item flex-item-V" style="width: 50%;">创 建 人： {{info.CREATORNAME}}</view>
						<view class="flex-item flex-item-V" style="width: 50%;">当前处理人： {{info.CONDUCTORNAME}}</view>
					</view>
				</view>
				<view class="flex-item flex-item-V " style="margin-top: 5upx;">
					<view class="uni-flex uni-row">
						<view class="flex-item flex-item-V">查看附件： </view>
						<view class="flex-item flex-item-V">
							<uni-tag text="附件信息" type="warning" size="small"  @click="ViewAttachment(info.SID)"/>
						</view>
					</view>
				</view>
				<view class="flex-item flex-item-V " style="margin-top: 10upx;">
					<view class="uni-flex uni-row">
						<view class="flex-item flex-item-V" style="min-width: 25%;">问题描述： </view>
						<view class="flex-item flex-item-V">
						 {{info.CONTENT}}
						</view>
				
				
					</view>
				</view>
			</view>
			
			
			
		</view>
		
		
		
	</view>
	
	
	
</template>

<script>
	
	
		import {mapState,mapMutations} from 'vuex';
		import uniCard from '@/components/uni-card/uni-card.vue';
		import config from '../../static/js/Config.js'
		import uniTag from "@/components/uni-tag/uni-tag.vue"
		import {
			Support_Prioritylist,
			Support_Severitylist,
			Support_Statuslist,
			Support_State,
			EnumGetSingle
		} from "@/static/js/Enum.js";
		
		export default {
			computed: {...mapState(['userId','forcedLogin', 'hasLogin', 'userName','workid'])},
			components: {uniCard,uniTag},
			onLoad() {
				this.Init();
			},
			data(){
				return{
					list:[],
				  	keywords: "",
					words:"",
					wait:0,
					being:0,
					complete:0,
					pageindex:1,
					pagesize:10,
					state:3    //0，待处理，1，处理中，2已完成，3，全部（统一按时间排倒叙）
				}
			},
			methods:{
				Support_State,
				Support_Statuslist,
				Support_Severitylist,
				EnumGetSingle,
				Init(){
					this.InitReportCount();
					this.InitListData();
				},
				InitReportCount(){
					var  _self=this;
					
					let path="/api/Support/SelectCount";
					
					console.log(config.Parameters.LoginHost()+path +"========请求的服务路径，好诡异isdevops："+config.Parameters.Isdevpos);
					
					this.$SugarRequest.Get({},path,(data,res)=>{
						
						console.log(data);
						_self.wait=	data.Content.Wait;
						_self.being=data.Content.Being;
						_self.complete=data.Content.Complete;
					});
					
				},
				InitListData(){
					
					var  _self=this;
				
					let model={};
					model.Uuid=_self.userId;   //查所有人工单，不指定useriid，指定也没有用
					model.WatchState=this.state;
					model.WatchType=0;  //看所有人的
					model.pageindex=this.pageindex;
					model.pagesize=this.pagesize;
					model.keywords=this.keywords;
				
					let path="/api/Support/List";
					
					//console.log(JSON.stringify(model))
					
					this.$SugarRequest.Post(model,path,(data,res)=>{
						
						//console.log("======="+JSON.stringify(data));
						
						for (let item of data.Content) {
							_self.list.push(item);
						}
						
					});
				
				
				},
				Search(){
					console.log("输入框搜索===="+this.list.length);
					this.list=[];
					this.keywords=this.words.value;
					this.pageindex = 1;
					this.InitListData();
					
						console.log("搜索之后===="+this.list.length);
				},
				clickCard(item){
					
					
					
					console.log("看Sid："+JSON.stringify(item))
					uni.navigateTo({
						url: 'workfolw?sid='+item.SID
					})
				},
				ChangeState(value){
					
					this.list=[];
					this.pageindex = 1;
					this.state=value;
					this.InitListData();
					
				},
				SetSeverity(value) {
					return this.EnumGetSingle(value, this.Support_Severitylist());
				},
				SetStatus(value) {
					return this.EnumGetSingle(value, this.Support_Statuslist());
				},
				SetState(value) {
					return this.EnumGetSingle(value, this.Support_State());
				},	
				ViewAttachment(sid){
				uni.navigateTo({
					url: 'attachment?sid='+sid
				})
			},
				
			},
			
			onPullDownRefresh() {
				console.log("下拉刷新");
				this.pageindex = 1;
				this.list=[];
				this.Init();
				uni.stopPullDownRefresh();
			
			},
			onReachBottom() {
				console.log("上拉加载===="+this.list.length);
				this.pageindex = this.pageindex + 1;
				this.InitListData();
			},
			
			
			
			
			
			
		}

	
	
</script>

<style scoped>
	.headerView{
		width: 100%;
		text-align: center;
		 justify-content: center;
		 border: #000000;
		 background-color: #FFFFFF;
		 margin-top: 10upx;
	}
	.itemview{
		width: 30%;
		height: 150upx;
		padding: 10upx;
		font-size: 30upx;
	}
	.counttext{
		margin-top: 30upx;
		font-size: 40upx;
	}
	.list-view{ 
		background-color: #FFFFFF;
		margin-top: 20upx;
	}
	
</style>
