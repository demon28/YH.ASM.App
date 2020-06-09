<template>
	<view>

		<cmd-page-body type="top">
			<cmd-transition name="fade-up">
				<view>

					<cmd-cel-item title="姓名" addon="文天成 (11003870)"></cmd-cel-item>
					<cmd-cel-item title="部门" addon="信息中心-MES"></cmd-cel-item>
					<cmd-cel-item title="日期" addon="2020-06-29"></cmd-cel-item>
					<cmd-cel-item title="定位地址" addon="广西壮族自治区南宁市西乡塘区大学西路29号"></cmd-cel-item>


					<view class="uni-list" style="margin-top: 30upx;">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								* 日报类型（必填）:
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker>
							</view>
						</view>
					</view>

					<view class="uni-list" style="margin-top: 10upx;">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								* 当前项目（必填）:
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="uni-list" style="margin-top: 10upx;">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								* 项目客户（必填）:
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="uni-list" style="margin-top: 10upx;">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								* 问题工单（必填）:
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker>
							</view>
						</view>
					</view>


					<!-- 
					<cmd-cel-item title="*日报类型"  addon="必选"  arrow></cmd-cel-item>
					<cmd-cel-item title="*当前项目" addon="必选" arrow></cmd-cel-item>
					<cmd-cel-item title="*项目客户" addon="必选" arrow></cmd-cel-item>
					<cmd-cel-item title="*项目客户" addon="必选" arrow></cmd-cel-item>
					 -->



					<view class="uni-form-item uni-column" style="margin-top: 20upx;">

						<textarea class="uni-input" style="border:solid 1upx #D3D3D3 ; height: 150upx; width: 100%;" name="input"
						 placeholder="每日简报" />
						</view>


					<button class="btn-logout" style="margin-top: 20upx;">提交</button>
				</view>
			</cmd-transition>
		</cmd-page-body>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"

	export default {
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCelItem,
			cmdAvatar
		},

		data() {
			return {
			
				 array: ['早报', '晚报'],
				 
				  arrayProject: [{
					  key:"0",
					  value:"惠州长治项目"
				  },{
					  key:"1",
					  value:"深圳龙华项目"
				  }],
				  
				  arrayProjectKehu: [{
				  		  key:"0",
				  		 value:"张福军"
				  },{
				  		 key:"1",
				  		value:"刘之龙"
				  }],
				  
				  arraySupport: [{
				  		  key:"0",
				  		 value:"拿铁001设备噪音较大"
				  },{
				  		 key:"1",
				  		value:"宏观002设备没声音"
				  }],
				  
				 index: 0,
				
			}
		},

		mounted() {


		},

		methods: {
		
			
         bindPickerChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.target.value)
            this.index = e.target.value
        },
		}
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
