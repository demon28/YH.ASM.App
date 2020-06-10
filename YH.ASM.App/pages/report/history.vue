<template>
	
		<view class="content">
			<uni-list>
				<uni-list-item :title="item.type" :note="item.date"  v-for="(item,index) in dataList"  :show-arrow="false" >
							
				</uni-list-item>
				
			</uni-list>
			
		</view>
</template>

<script>
	import unilist from '../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../components/uni-list/uni-list.vue';
	
	 export default {
		 components: {
		    unilist,
			unilist_item
		 },
	    data () {
	      return {
	        dataList: [],
			
			}
	    },
		mounted(){
			this.dataList.push({key:"1", type:"早报",date:"2020-06-07"})
		},
	    methods: {
	       
		   loadData(){
			   
		   }
		   
	    }
		
		
		
	  }
	
	
</script>

<style>
</style>
