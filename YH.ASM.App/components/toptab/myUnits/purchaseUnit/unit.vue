<template>
    <view class='my-unit'>
		<view class="unit-head">
			<text>工单编号：15</text><text class="fr color-999">2020-07-05：17:23</text>
		</view>
		<view class="unit-body">
			 
		
		
					 <view class="uni-flex uni-column uni-padding-wrap">
					                <view class="flex-item flex-item-V uni-bg-red">A</view>
					                <view class="flex-item flex-item-V uni-bg-green">B</view>
					                <view class="flex-item flex-item-V uni-bg-blue">    <view class="uni-flex uni-row">
					                   <view class="flex-item flex-item-V uni-bg-red" style="width: 50%;">A</view>
					                   <view class="flex-item flex-item-V uni-bg-bule"  style="width: 50%;">B</view>
									</view>
							  </view>
					   </view>
					   
					   
			 
			  
		</view>
		<view class="unit-foot">
			<view>
			
			<button class="fr btn" type="primary" @click="Dispose"  >处理工单</button>
			</view>
		</view>
    </view>
</template>
	
<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	
    export default{
		components: {
			uniRate,
			uniSection
		},
        data() {
            return {
				unitModel1:[
					{prop:"",label:"项目名称"},
					{prop:"",label:"问题设备"},
					{prop:"",label:"创建人",class:"color-green"},
					{prop:"",label:"处理人",class:"color-red"},
					{prop:"",label:"问题类型",class:"color-999"},
					{prop:"",label:"流程节点",class:"color-999"},
					{prop:"",label:"问题描述",class:"color-999"},
					{prop:"",label:"严重程度",class:"color-999"},
				]
            }
        },
        methods:{
			Dispose(){
				this.$store.commit("switch_loading")
			}
        },
		computed:{
			
		},
		created() {
			
		},
    }
</script>
<style lang='scss'>
    .my-unit{
		margin: 20upx 0;
		background-color: #ffffff;
		font-size: 28upx;
		transform: all 1s;
		
		.unit-head{
			padding: 20upx;
			height: 80upx;
			box-sizing: border-box;
			border-bottom: 2upx solid #f5f5f5;
		}
		.unit-body{
			padding: 20upx;
			display: flex;
			flex-wrap: wrap;
			
			text{
			
				font-size: 28upx;
				line-height: 55upx;
			}
		}
		.unit-foot{
			height: 88upx;
			padding: 0 20upx;
			border-top: 2upx solid #f5f5f5;
			border-bottom: none;
			line-height: 88upx;
			
			.btn{
				height: 60upx;
				font-size: 28upx;
				line-height: 60upx;
				margin: 14upx 0;
			}
		}
	}/* 头条小程序组件内不能引入字体 */
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