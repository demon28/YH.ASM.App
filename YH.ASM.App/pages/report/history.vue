<template>
	
		<view class="content">
			<uni-list loadmoreoffset="1" @loadmore="loadData()" >
				<uni-list-item  :title="item.type" :note="item.date"  v-for="(item,index) in dataList"  :rightText="item.address" :show-arrow="false"  >
							
				</uni-list-item>
				
			</uni-list>
			
		</view>
</template>

<script>
	import unilist from '../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../components/uni-list/uni-list.vue';
	import {
		mapState
	} from 'vuex';
	
	
	 export default {
		 computed: { ...mapState(['forcedLogin', 'hasLogin', 'userName', 'workid', 'department', 'dtname','userId'])
		 },
		 components: {
		    unilist,
			unilist_item
		 },
	    data () {
	      return {
	        dataList: [],
			pageindex:1,
			}
	    },
		 created(){
		    this.pageindex=0;
			 this.loadData();
			
			
		},
	    methods: {
	    
		   
		   loadData(){
			      this.pageindex+=1;
				  
			   var _self=this;
			   var Key=this.ApiKey;
			   uni.showLoading({
			       title: '加载中...'
			   });
			   
			   uni.request({
			       url:this.LoginHost+"/api/Direction/List", //仅为示例，并非真实接口地址。
			       data: {
			   		userId:_self.userId,
			   	    pageindex:_self.pageindex,
			   		SigningKey :Key
			       },
			   	method :"GET",
			       header: {
			           'content-type': 'application/text' //自定义请求头信息
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
			   	   console.log(JSON.stringify(res.data.Content));
			   	   
			   	   for(var i=0;i<res.data.Content.length; i++){
			   		   
			   		   var str_type=res.data.Content[i].TYPE==0?"早报":"晚报";
			   		   var str_Date= res.data.Content[i].CREATETIME.substr(0,10);;
			   		   var str_address=res.data.Content[i].ADDRESS;
			   		   _self.dataList.push({type:str_type,date:str_Date,address:str_address});
			   		   
			   	   }
			   	   
			   		
			   	
			   		 
			       }
			   });
		   }
		   
	    }
		
		
		
	  }
	
	
</script>

<style>
</style>
