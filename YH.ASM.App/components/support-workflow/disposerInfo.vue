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
					 分析人员：
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.ANALYZEUSER}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 责 任 方：
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.RESPONSIBLE}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 责 任 人：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{ model.DUTY}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 BOM图纸：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{model.BOM}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 是否下单：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{model.ISORDER==1?"是":"否"}}</view>
			
				</view>
			</view>
			<view v-if="model.ISORDER==1" class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 下 单 人：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{model.ORDERMAN}}</view>
			
				</view>
			</view>
			<view v-if="model.ISORDER==1" class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 下单时间：
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{model.ORDERTIME}}</view>
			
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
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-db">
					<view style="margin-left: 20upx;">分析原因：</view>
					<view class="uni-textarea" >
						<textarea tyle="margin-left: 20upx;"  v-model="model.ANALYZE" />
					</view>
				
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-db">
					<view style="margin-left: 20upx;"> 解决方案：</view>
					<view class="uni-textarea"  style="width: 100%;">
						<textarea tyle="margin-left: 20upx;"  v-model="model.SOLUTION" />
					</view>
				</view>
			</view>
			</view>
	
	
	
	
</template>

<script>		
	import {mapState,mapMutations} from 'vuex';
	import * as Enum from "@/static/js/Enum.js";
	
	
	export default {
		name:"supportInfo",
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
