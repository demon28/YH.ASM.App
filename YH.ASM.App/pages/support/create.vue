<template>




	<view class="content">

	

	 <view class="uni-list" style="margin-top: 30upx;">
			
			
	
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 项目名称:
				</view>
				<view class="uni-list-cell-db">
					 <input class="uni-input"  placeholder="请选择项目名称" v-model="project.NAME" />
				</view>
			</view>
		
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 问题机型:
				</view>
				<view class="uni-list-cell-db">
				 <input class="uni-input"  placeholder="请输入问题机型" v-model="machineName" />
				</view>
			</view>
	
		
	
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 严重程度:
				</view>
				<view class="uni-list-cell-db">
				<picker @change="bindPickerChange":value="Severity" :range="SeverityList"  :range-key="'text'">
					<view class="uni-input">{{SeverityList[Severity].text}}</view>
				</picker>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 发现时间:
				</view>
				<view class="uni-list-cell-db">
				  <picker mode="date" :value="finddate"  :end="endDate"  @change="bindDateChange">
				                        <view class="uni-input">{{finddate}}</view>
				                    </picker>
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 处理人:
				</view>
				<view class="uni-list-cell-db">
				 <input class="uni-input"  placeholder="请选择处理人" v-model="conductor" />
				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					上传附件:
				</view>
				<view class="uni-list-cell-db">
				 <input class="uni-input"  placeholder="请选择附近" v-model="conductor" />
				</view>
			</view>
			
			
			</view>
		<view class="uni-textarea" style="margin-top: 30upx;">
			<textarea placeholder="请输入问题描述" v-model="content" />
			</view>
                

		<button class="btn-logout" style="margin-top: 20upx;" @click="onSubmit()">提交</button>
 
	

 </view>

</template>

<script>
	import unilist from '../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../components/uni-list/uni-list.vue';
	import {Support_Prioritylist} from "../../common/Enum.js";

	
import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: { ...mapState(['forcedLogin', 'hasLogin', 'userName', 'workid', 'department', 'dtname','userId',"maintainer"])
		,  
        endDate() {
            return this.getDate('end');
        }
		
		},

		components: {
			unilist,
			unilist_item,
			
		
		},

		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			
			return {
					list:[],
				project:{},
				machineName:"",
				content:"",
				Severity:0,
				SeverityList:this.Support_Prioritylist(),
				conductor:"",
				finddate: currentDate,
			}
		},
		onShow(option) { 
			//子窗体往父窗体传参
		
			
			
		},
		mounted() {


		},

		methods: {
		Support_Prioritylist,
		onSubmit(){},
		bindPickerChange(e){
			this.Severity = e.target.value
			
			
		}, getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        }
		,bindDateChange(e){
			
			      this.finddate = e.target.value
		}
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