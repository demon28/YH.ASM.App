<template>
	<view class='my-unit'>
		<view class="unit-head">
			<text>编号：{{info.CODE}}</text><text class="fr color-999">{{info.CREATETIME}}</text>
		</view>
		<view class="unit-body">



			<view class="uni-flex uni-column uni-padding-wrap">
				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">
					项目名称： {{info.PROJECTNAME}}

				</view>
				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">
					<text class="uni-text">问题机型： {{info.MACHINENAME}}-{{info.MACHINESERIAL}} </text>
				</view>

				<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">流程节点： {{SetStatus(info.STATUS)}}</view>


				<view class="flex-item flex-item-V " style="margin-top: 8upx;margin-bottom: 8upx;">
					<view class="uni-flex uni-row">

						<view class="flex-item flex-item-V">严重程度：{{SetSeverity(info.SEVERITY)}}  </view>
						<view class="flex-item flex-item-V" style="display:flex; align-items:center">
					<!-- 		<uni-rate size="15" disabled="true" :value="SetStar(info.SEVERITY)"></uni-rate>
					 -->
					
						 
						 </view>


					</view>
				</view>


				<view class="flex-item flex-item-V ">
					<view class="uni-flex uni-row">

						<view class="flex-item flex-item-V">工单状态： </view>
						<view class="flex-item flex-item-V">
							<uni-tag :text="SetState(info.PSTATUS)" type="primary" size="small" />
						</view>
					</view>
				</view>




				<view class="flex-item flex-item-V " style="margin-top: 8upx;margin-bottom: 8upx;">
					<view class="uni-flex uni-row">
						<view class="flex-item flex-item-V" style="width: 50%;">创 建 人： {{info.CREATORNAME}}</view>
						<view class="flex-item flex-item-V" style="width: 50%;">处 理 人： {{info.CONDUCTORNAME}}</view>
					</view>
				</view>
				<view class="flex-item flex-item-V ">
					<view class="uni-flex uni-row">
				
						<view class="flex-item flex-item-V">查看附件： </view>
						<view class="flex-item flex-item-V">
							<uni-tag text="附件信息" type="warning" size="small"  @click="ViewAttachment(info.SID)"/>
						</view>
					</view>
				</view>
				
				<view class="flex-item flex-item-V ">
					<view class="uni-flex uni-row">
				
						<view class="flex-item flex-item-V" style="min-width: 25%;">问题描述： </view>
						<view class="flex-item flex-item-V">
						 {{info.CONTENT}}
						</view>
				
				
					</view>
				</view>
			
			
			
				
				
			</view>

				

		</view>
		<view class="unit-foot">

			<view class="flex-item flex-item-V " style="margin-top: 5upx;margin-bottom: 5upx;">
				<view class="uni-flex uni-row">
					<view class="flex-item flex-item-V" style="width: 50%; ">
					<button class="btn" type="default" style="float: left;" @click="ViewWorkFlow(info.SID)">查看详情</button>
					
					</view>

					<view class="flex-item flex-item-V" style="width: 50%;">
						<button v-if="info.PSTATUS==0" class="btn" type="primary" style=" float: right;" @click="Dispose(info)">受理工单</button>
						<button v-if="info.PSTATUS==1" class="btn" type="primary" style=" float: right;" @click="TodoSupport(info)">处理工单</button>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import '@/static/iconfont/iconfont.css'
	import '@/static/js/constant.js'
	import '@/static/css/reset.scss'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import {
		Support_Prioritylist,
		Support_Severitylist,
		Support_Statuslist,
		Support_State,
		EnumGetSingle
	} from "@/static/js/Enum.js";


	export default {
		components: {
			uniRate,
			uniSection,
			uniTag
		},
		data() {
			return {
				childe:{}
			}
		},
		methods: {
			Support_State,
			Support_Statuslist,
			Support_Severitylist,
			EnumGetSingle,
			Dispose(item) {
				this.$emit('child-say',item);
			},
			TodoSupport(item){
				this.$emit('child-do',item)
			},
			SetSeverity(value) {
				return this.EnumGetSingle(value, this.Support_Severitylist());
			},
			SetStatus(value) {
				return this.EnumGetSingle(value, this.Support_Statuslist());
			},
			SetState(value) {
				return this.EnumGetSingle(value, this.Support_State());
			},
			SetStar(value) {
				return (5 - parseInt(value)).toString();
			},
			ViewAttachment(sid){
				uni.navigateTo({
					url: 'attachment?sid='+sid
				})
			},
			ViewWorkFlow(sid){
				uni.navigateTo({
					url: 'workfolw?sid='+sid
				})
				
			}
		},
		computed: {
			
		},
		props: {

			item: {},
			info: {}
		},
		created() {

		},
	}
</script>
<style lang='scss'>
	.my-unit {
		margin: 20upx 0;
		background-color: #ffffff;
		font-size: 28upx;
		transform: all 1s;

		.unit-head {
			padding: 20upx;
			height: 80upx;
			box-sizing: border-box;
			border-bottom: 2upx solid #f5f5f5;
		}

		.unit-body {
			padding: 20upx;
			display: flex;
			flex-wrap: wrap;


		}

		.unit-foot {
			height: 88upx;
			padding: 0 20upx;
			border-top: 2upx solid #f5f5f5;
			border-bottom: none;
			line-height: 88upx;

			.btn {
				height: 60upx;
				font-size: 28upx;
				line-height: 60upx;
				margin: 14upx 0;
			}
		}
	}

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 28rpx;
		line-height: inherit;
	}

	.example {
		padding: 0 30rpx 30rpx;
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 30rpx;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}

	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}


	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}
</style>
