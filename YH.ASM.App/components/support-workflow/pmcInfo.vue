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
					 订 单 号：
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.BOOKNO}} </text>
				</view>
			</view>
			
			

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					发货时间：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{ model.SENDDATE}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					收 货 人：
				</view>
				<view class="uni-list-cell-db" >
					<text> {{ model.CONSIGNEE}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					交付时间：
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.DELIVERY}} </text>
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
					<view style="margin-left: 20upx;">备注：</view>
					<view class="uni-textarea" >
						<textarea tyle="margin-left: 20upx;"  v-model="model.REMARKS" />
					</view>
				
				</view>
			</view>
			
		
	</view>
	
	
	
	
</template>

<script>		
	import {mapState,mapMutations} from 'vuex';
	import * as Enum from "@/static/js/Enum.js";
	
	
	export default {
		name:"pmcInfo",
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
