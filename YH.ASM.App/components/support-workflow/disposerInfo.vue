<template>
	
		<view class="uni-list" style="margin-top: 30upx;">
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 流程节点:
				</view>
				<view class="uni-list-cell-db">
					<text> {{GetStatus(model.STATUS)}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 工单编号:
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.CODE}} </text>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 项目名称:
				</view>
				<view class="uni-list-cell-db">
					<text> {{model.PROJECTNAME}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 问题机型:
				</view>
				<view class="uni-list-cell-db" >
					<text> {{ model.MACHINENAME}}-{{model.MACHINESERIAL}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 问题类型:
				</view>
				<view class="uni-list-cell-db">
				<view class="uni-input">{{GetType(model.TYPE)}}</view>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 严重程度:
				</view>
				<view class="uni-list-cell-db">
				<view class="uni-input">{{GetSeverity(model.SEVERITY)}}</view>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 发现时间:
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-input">{{model.FINDDATE}}</view>

				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 处理人:
				</view>
				<view class="uni-list-cell">
					<text> {{model.CONDUCTORNAME}} </text>
				</view>
			</view>
<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					 创建时间:
				</view>
				<view class="uni-list-cell">
					<text> {{model.CONDUCTORNAME}} </text>
				</view>
			</view>
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					问题描述:
					<view class="uni-textarea" >
						<textarea  v-model="model.CONTENT" />
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
				Enum.EnumGetSingle(value,Enum.Support_Severitylist())
			},
			GetType(value){
				Enum.EnumGetSingle(value,Enum.Support_Typelist())
			},
			GetStatus(value){
				Enum.EnumGetSingle(value,Enum.Support_Statuslist())
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
