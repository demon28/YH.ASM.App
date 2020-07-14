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
	
		
		<view class="example-body">
			<view v-for="item in list" :key="item.id" class="example-box">
				<uni-card :title="item.title" :is-shadow="item.shadow" :note="item.note" :extra="item.extra" :thumbnail="item.thumbnail" @click="clickCard(item)">
					<text class="content-box-text" >{{ item.content }}</text>
				</uni-card>
			</view>
		</view>
		
		
		
	</view>
	
	
	
</template>

<script>
	
	
		import {mapState,mapMutations} from 'vuex';
		import uniCard from '@/components/uni-card/uni-card.vue';
		import config from '../../static/js/Config.js'
		export default {
			computed: {...mapState(['userId','forcedLogin', 'hasLogin', 'userName','workid'])},
			components: {uniCard},
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
					console.log("打印uuid===="+_self.userId);
				
					let model={};
					model.Uuid=_self.userId;   //查所有人工单，不指定useriid，指定也没有用
					model.WatchState=this.state;
					model.WatchType=0;  //看所有人的
					model.pageindex=this.pageindex;
					model.pagesize=this.pagesize;
					model.keywords=this.keywords;
				
					let path="/api/Support/List";
					
					console.log(JSON.stringify(model))
					this.$SugarRequest.Post(model,path,(data,res)=>{
						
						console.log(res);
						for (let item of data.Content) {
							console.log("查看item"+item.CODE);
							let cardinfo={}
							cardinfo.id=item.SID;
							cardinfo.title=item.CODE;
							cardinfo.content=item.CONTENT;
							cardinfo.extra=item.CREATETIME;
							cardinfo.shadow=true;
							cardinfo.note="查看全部";
							
							_self.list.push(cardinfo);
						
						}
						
					});
				
				
				},
				Search(){
					this.list=[];
					this.keywords=this.words.value;
					this.pageindex = 1;
					this.Init();
				},
				clickCard(item){
					
					console.log("看Sid："+item.id)
					uni.navigateTo({
						url: 'workfolw?sid='+item.id
					})
				},
				ChangeState(value){
					
					this.list=[];
					this.pageindex = 1;
					this.state=value;
					this.Init();
					
				}
				
			},
			
			onPullDownRefresh() {
				console.log("下拉刷新");
				this.pageindex = 1;
				this.list=[];
				this.Init();
				uni.stopPullDownRefresh();
			
			},
			onReachBottom() {
				console.log("上拉加载");
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
	
	
</style>
