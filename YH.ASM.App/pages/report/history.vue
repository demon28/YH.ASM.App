<template>
	
		<view class="content">
			<uni-list loadmoreoffset="1" >
				<uni-list-item  :title="item.type" :note="item.date"  v-bind:key="item.traid" v-for="(item,index) in list"  :rightText="item.address" :show-arrow="false"  @click="onDetails(item.traid)">
				</uni-list-item>
			</uni-list>
			
		</view>
</template>

<script>
	import unilist from '../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../components/uni-list/uni-list.vue';
	import {mapState} from 'vuex';
	import config from '../../static/js/Config.js';
	
	 export default {
		 computed: { ...mapState(['forcedLogin', 'hasLogin', 'userName', 'workid', 'department', 'dtname','userId'])
		 },
		 components: {
		    unilist,
			unilist_item
		 },
	    data () {
	      return {
	        list: [],
			pageindex:1,
			pagesize:15,
			pageTotal:10
			}
	    },
		 created(){
		 
			 this.loadData();
		}, 
		onReachBottom() {
			console.log("上拉加载");
			this.pageindex = this.pageindex + 1;
			this.loadData();
			
		},onPullDownRefresh() {
			console.log("下拉刷新");
			this.pageindex = 1;
			this.list=[];
			this.loadData();
			uni.stopPullDownRefresh();

		},
	    methods: {
	     
		   loadData(){
			   
			   
			     var _self=this;
			     
				    console.log( "当前页码："+this.pageindex +"===当前总数量"+_self.pageTotal);
					
				  if( _self.pageindex>_self.pageTotal){
					  
					  uni.showToast({
					  	icon: 'none',
					  	title: "没有更多数据了...",
					  });
					  return ;
				  }
				  
			 
			 
			   var Key=config.Parameters.ApiKey;
			   
			   //加载提示
			   uni.showLoading({
			       title: '加载中...'
			   });
			   
			   uni.request({
			       url:config.Parameters.LoginHost()+"/api/Direction/List", //仅为示例，并非真实接口地址。
			       data: {
			   		userId:_self.userId,
			   	    pageindex:_self.pageindex,
					pagesize:_self.pagesize,
			   		SigningKey :Key
			       },
			   	  method :"GET",
			       header: {
			           'content-type': 'application/text' //自定义请求头信息
			       },
			       success: (res) => {
			        
			  // 	 console.log(JSON.stringify(res));
			  
				   //关闭加载框
			   	 uni.hideLoading(); 
			   		 if (!res.data.Success) {
			   			
			   			uni.showToast({
			   				icon: 'none',
			   				title: res.data.Message,
			   			});
			   			
			   			return;
			   	   }
			   	  // console.log(JSON.stringify(res.data));
			   	   _self.pageTotal=res.data.PageTotal;
				   
				   
			   	   for(var i=0;i<res.data.Content.length; i++){
			   		   
			   		   var str_type=res.data.Content[i].TYPE==0?"早报":"晚报";
			   		   var str_Date= res.data.Content[i].CREATETIME.substr(0,10);;
			   		   var str_address=res.data.Content[i].ADDRESS;
					   var str_traid=res.data.Content[i].TRAID;
			   		   _self.list.push({type:str_type,date:str_Date,address:str_address,traid:str_traid});
			   		   
			   	   }
			   		 
			       }
			   });
		   },
		   //查看详情
		   onDetails(traid){
			   console.log("进来了"+traid)
			   uni.navigateTo({
				   url:'./details/details?traid='+traid
			   })
				   
			   
		   }
		   
	    }
		
		
		
	  }
	
	
</script>

<style>
</style>
