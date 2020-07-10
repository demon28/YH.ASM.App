<template>
	
		<view class="uni-list" style="margin-top: 30upx;">
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 流程节点：
				</view>
				<view class="uni-list-cell-db">
					<text> {{GetStatus(model.NEXT_STATUS)}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 实际完成时间：
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.ENDDATE}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 审核人：
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.CHECKUSER}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 审核结果：
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.RESULT}} </text>
				</view>
			</view>
			


			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 处 理 人:
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.NEXT_USER}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 处理时间：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{model.CREATETIME}}</view>
			
				</view>
			</view>
			
	
		
			
		
			</view>
	
	
	
	
</template>

<script>		
	import {mapState,mapMutations} from 'vuex';
	import * as Enum from "@/static/js/Enum.js";
	
	
	export default {
		name:"disposerInfo",
		components: {
				...mapState(['userId']),  
		},
		data() {
			return {
				
			}
		},
		methods: {
			
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
	.btn-logout {
		margin-top: 100upx;
		width: 80%;
		border-radius: 50upx;
		font-size: 16px;

		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.btn-logout-hover {
		background: linear-gradient(to right, #365fdd, #36bbfa);
	}
</style>
