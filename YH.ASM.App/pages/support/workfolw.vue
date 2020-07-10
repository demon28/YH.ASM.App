<template>
	<view class="content">
		
		
		<component :is="item.component" :model="item.list" v-for="item in items" v-bind:key="item.SID">
			
			
			
		</component>
		
		
	</view>
	
	
</template>
<script>		
	import {mapState,mapMutations} from 'vuex';
	import {Support_Prioritylist, Support_Severitylist} from "@/static/js/Enum.js";
	
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
						                                    _self.InsertSupport(sid, tid);
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
				  model.tid=tid;
				  
				 this.$SugarRequest.Get(model,path,(data,res)=>{
					 
					 console.log(data);
					 let supportModel={ };
			
					 supportModel.component=supportInfo;
					 supportModel.list=data.Content;
					 
					 _self.items.push(supportModel);
					 
					 
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
					 
					 console.log(data);
					 let supportModel={ };
							
					 supportModel.component=disposerInfo;
					 supportModel.list=data.Content;
					 
					 _self.items.push(supportModel);
					 
					 
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
					 
					 console.log(data);
					 let supportModel={ };
							
					 supportModel.component=pmcInfo;
					 supportModel.list=data.Content;
					 
					 _self.items.push(supportModel);
					 
					 
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
