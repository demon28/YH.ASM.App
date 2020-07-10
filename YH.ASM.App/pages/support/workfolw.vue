<template>
	<view class="content">
		
		
		<component :is="item.SID" :model="item.text" v-for="item in items" v-bind:key="item.SID">
			
			
			
		</component>
		
		
	</view>
	
	
</template>
<script>		
	import {mapState,mapMutations} from 'vuex';
	import {Support_Prioritylist, Support_Severitylist} from "@/static/js/Enum.js";
	
	import siteInfo from '@/components/support-workflow/siteInfo.vue';
	import supportInfo from '@/components/support-workflow/supportInfo.vue';
		import SugarRequest from '../../static/js/SugarRequest.js';
	export default {
		components: {  
				...mapState(['userId']),  
				supportInfo,
				siteInfo
		},
		data() {
			return {
				Sid:0,
				items:[],
				 his:[],
			}
		},
		onLoad(prames){
			
		  this.Sid=prames.sid
		  
		  let model={};
		  model.sid=this.Sid;
		  console.log("工单id:"+ this.Sid);
		  let path="/api/Support/ListByHistory";
		  
		  this.$SugarRequest.Get(model,path,(data,res)=>{
			  
				        _self.his = data.Content;
						
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
				console.log("InsertSupport======="+sid);
				  
				  let model={};
				  model.sid=sid;
				 
				  
				  let path="/api/Support/GetDisposerInfo";
				 this.$SugarRequest.Get(model,path,(data,res)=>{
					 
					 
					 
					 
				 });
				
			},
			InsertDisposer(sid,tid){},
			InsertPmc(sid,tid){},
			InsertSite(sid,tid){},
			InsertPrincipal(sid,tid){},
			
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
