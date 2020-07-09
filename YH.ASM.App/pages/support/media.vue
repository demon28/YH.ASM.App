<template>
	
	<view class="content">
		
		          <image v-if="type=='img'"  :src="url" style="width: 100%;"></image>
				  <video v-if="type!=='img'" id="myVideo" :src="url" style="width: 100%;" autoplay="true"   controls="true"></video>
		
	</view>
	
</template>

<script>
	
	import config from '../../static/js/Config.js';
		export default {
			
			data(){
				return {
					type:'img',
					url:""
				}
				
			},
			onLoad(pramse){
				
			
				
				if(pramse.url==null ||pramse.url==""){
					return;	
				}
				let deurl=decodeURIComponent(pramse.url)
				this.url=config.Parameters.LoginHost()+deurl;
				var index= this.url.lastIndexOf(".");
				var ext = this.url.substr(index+1);
				
				console.log(this.url);
				
				if( ['png', 'jpg', 'jpeg'].indexOf(ext.toLowerCase()) !== -1){
					this.type='img'
				}
				
				if(['mp4', 'mov', 'AVI'].indexOf(ext.toLowerCase()) !== -1){
					this.type='videp'
				}
				
				
			}
			
		} 
	
	
</script>

<style>
</style>
