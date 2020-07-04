<template>




	<view class="content">



		<view class="uni-list" style="margin-top: 30upx;">



			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 项目名称:
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right" @click="onFillProject">
					<text> {{project.name}} </text>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 问题机型:
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入问题机型" v-model="machineName" />
				</view>
			</view>



			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 严重程度:
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="Severity" :range="SeverityList" :range-key="'text'">
						<view class="uni-input">{{SeverityList[Severity].text}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 发现时间:
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="finddate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{finddate}}</view>
					</picker>
				</view>
			</view>

			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					* 处理人:
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right" @click="onFillUser">
					<text> {{conductor.name}} </text>

				</view>
			</view>
			
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					抄送人员:
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right" @click="onFillCopy">
					<text>  <text  v-for="item in copy">{{item.name+","}}</text>  </text>
				</view>
			</view>
			
		</view>
		
		<view class="uni-list" style="margin-top: 30upx;">
			<view class="uni-list-cell" style="min-height:80upx ;">
				<view class="uni-list-cell-left">
					上传附件:
				</view>
				<view >
					<button @click="onUpload" size="mini" type="default" class="mini-btn" style="margin-right: 15upx;margin-top: 5upx; ">添加</button>
				</view>
			</view>
			
			
			<view class="uni-list-cell-right" style="min-height:80upx ;" v-for="file in uploadfile" >
				<text> {{file.name}}  </text>
			</view>
			
		</view>
		
		
		<view class="uni-textarea" style="margin-top: 30upx;">
			<textarea placeholder="请输入问题描述" v-model="content" />
			</view>
                

		<button class="btn-logout" style="margin-top: 30upx;" @click="onSubmit()">提交</button>
 
	

 </view>

</template>

<script>
	import unilist from '../../components/uni-list-item/uni-list-item.vue';
	import unilist_item from '../../components/uni-list/uni-list.vue';
	import {Support_Prioritylist,Support_Severitylist} from "../../common/Enum.js";

	
     import {mapState,mapMutations} from 'vuex'

	export default {
		computed: { ...mapState(['userId','supportProject','supportConductor','supportCopy'])
		,  
        endDate() {
            return this.getDate('end');
        }
		
		},
		components: {
			
		},
		data() {
			const currentDate = this.getDate({ format: true });
			
			return {
					list:[],
				project:{},
				machineName:"",
				content:"",
				Severity:0,
				SeverityList:this.Support_Severitylist(),
				conductor:{},
				finddate: currentDate,
				copy:[],
				uploadfile:{}
			}
		},
		onShow(option){
			var _self=this;
			  let checkproject=_self.supportProject;
			  
			  console.log("===========哎哟，wx不执行吗"+JSON.stringify(checkproject));
			  if(checkproject!=null && checkproject.length>0){
				  _self.project=checkproject[0];
			  }else{
				    console.log("=========== this.project.name");
				  _self.project.name="请选择";
			  }  
			  
			  	  let checkconductor=_self.supportConductor;
			  	  if(checkconductor!=null && checkconductor.length>0){
			  		  _self.conductor=checkconductor[0];
			  	  }else{
					     console.log("=========== this.conductor.name");
					  _self.conductor.name="请选择";
					  
				  }
				  
				let checkCopy=_self.supportCopy;
				if(checkCopy!=null && checkCopy.length>0){
					_self.copy=checkCopy;
				}
				  
			  
			
		},
		mounted() {
				console.log("我是可以获取到值的："+this.supportProject);
		},
		methods: {
		
		Support_Severitylist,
		onSubmit(){},
		bindPickerChange(e){
			this.Severity = e.target.value
		}, 
		getDate(type) {
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
        },
		bindDateChange(e){
			
			      this.finddate = e.target.value
		},
		onFillUser(){
			uni.navigateTo({
				url: 'fillUser?isSingle=true'
			});
		},
		onFillProject(){
			
			uni.navigateTo({
				url: 'fillProject?isSingle=true'
			});
			
		},
		onFillCopy(){
			uni.navigateTo({
				url: 'fillUser?isSingle=false'
			});
		},
		onUpload(){
			
			uni.chooseMedia({
			  count: 9,
			  mediaType: ['image','video'],
			  sourceType: ['album', 'camera'],
			  maxDuration: 30,
			  camera: 'back',
			  success(res) {
			    console.log(res.tempFilest)
			  }
			})
			
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
