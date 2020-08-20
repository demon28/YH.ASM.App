<template>
	<view class="content">
		<uni-list>
			<uni-list-item title="姓名:" :show-arrow="false" :rightText="unionName" style="min-height:80upx ; height: 80upx;"><text></text></uni-list-item>
			<uni-list-item title="部门:" :show-arrow="false" :rightText="DEPARTMENT" style="min-height:80upx ; height: 80upx;"></uni-list-item>
			<uni-list-item title="日期:" :show-arrow="false" :rightText="CREATETIME" style="min-height:80upx ; height: 80upx;"></uni-list-item>
			<uni-list-item title="定位地址:" :show-arrow="false" :rightText="ADDRESS" style="min-height:80upx ; height: 80upx;"></uni-list-item>
		</uni-list>
		
		<view class="uni-list" style="margin-top: 30upx;">
					<view class="uni-list-cell" style="min-height:80upx ;">
						<view class="uni-list-cell-left">
							* 日报类型:
						</view>
		
						<view class="uni-list-cell-db">
							
						</view>
					</view>
			
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						* 项目名称:
					</view>
					<view class="uni-list-cell-navigate " >
						<text> {{PROJECTNAME}} </text>
					</view>
				</view>
				
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						* 设备名称:
					</view>
					<view class="uni-list-cell-navigate " >
						<text> {{PROJECTNAME}} </text>
					</view>
				</view>
				
				
				<view class="uni-list-cell" style="min-height:80upx ;">
					<view class="uni-list-cell-left">
						* 工单序号:
					</view>
					<view class="uni-list-cell-navigate " >
						<text> {{SUPPORTCODE}} </text>
					</view>
				</view>
				
			
			
					<view class="uni-list-cell" style="min-height:80upx ;">
						<view class="uni-list-cell-left">
							* 设备数量:
						</view>
						<view class="uni-list-cell-db">
						 <text>{{MACHINE_COUNT}}</text>
						</view>
					</view>
					
					<view class="uni-list-cell" style="min-height:80upx ;">
						<view class="uni-list-cell-left">
							* 需求协助:
						</view>
						<view class="uni-list-cell-db">
						 
						</view>
					</view>
					
					<view class="uni-list-cell" style="min-height:80upx ;">
						<view class="uni-list-cell-left">
						* 售后人员:
						</view>
						<view  class="uni-list-cell-navigate "   >
						 	<text>   </text> 
						</view>
					</view>
					
				</view>
		 
				<view class="uni-textarea" style="margin-top: 30upx;">
					<textarea v-model="CONTENT" disabled='true'/>
					</view>
	</view>
</template>

<script>
	import unilist from '../../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../../components/uni-list/uni-list.vue';
	import config from '../../../static/js/Config.js';
	export default {
		data() {
			return {
				USER_NAME:"",//姓名
				DEPARTMENT:"",//部门
				CREATETIME:"",//日期
				ADDRESS:"",//地址
				PROJECTNAME:"",//项目名称
				MACHINENAME:"",//设备名称
				SUPPORTCODE:"",//工单序号
				MACHINE_COUNT:"",//设备数量
				//CUSTOMER_NAME:"",//售后人员
				CONTENT:"",//内容
				WORK_ID:"",//工号
				unionName:""
			}
		},onLoad(option){
			console.log(option.traid)
			
			let path="/api/Direction/WrokReport";
			let model=option.traid;
			var _self=this;
			uni.request({
				url:config.Parameters.LoginHost()+path,
				data: {traid:option.traid},
				method :"GET",
			
				success:(res)=>{
					console.log(res)
					if (!res.data.Success) {
						uni.showToast({
							icon: 'none',
							title: res.data.Message
						});
						return;
					}else{
						_self.unionName=res.data.Content.USER_NAME + "(" + res.data.Content.WORK_ID + ")";
						
						_self.DEPARTMENT=res.data.Content.DEPARTMENT;
						_self.CREATETIME=res.data.Content.CREATETIME;
						_self.ADDRESS=res.data.Content.ADDRESS;
						_self.PROJECTNAME=res.data.Content.PROJECTNAME;
						_self.MACHINENAME=res.data.Content.MACHINENAME;
						_self.SUPPORTCODE=res.data.Content.SUPPORTCODE;
						_self.MACHINE_COUNT=res.data.Content.MACHINE_COUNT;
						_self.CONTENT=res.data.Content.CONTENT;
					}	
				},
				fail(res){
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: '网络请求失败！'
					});
				}
			});
			
			
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
