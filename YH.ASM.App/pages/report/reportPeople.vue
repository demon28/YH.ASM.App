<template>

	<view class="content">

		<view>
			<button class="uni-swipe_button" @click="onConfim">确定并返回</button>
		</view>
		
		<view style="margin-top: 10px;">
			<lv-select @handleSearch="handleSearch" @change="change" 
			placeholder="姓名 \ 工号 \ 部门" 
			:infoList="infoList" 
			:showValue="showValue"
			 v-model="keywords" 
			 :loading="loading" type="primary" :uniShadow="true" :isShowSelect="false"></lv-select>
		</view>
		
		<view class="uni-list" style="margin-top: 30upx;">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" style=" min-height: 60upx; height: 60upx;" v-for="item in items" :key="item.value">
					<view>
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view> {{item.name}} ({{item.workid}})</view>
				</label>
			</checkbox-group>
		</view>

	</view>



</template>

<script>
	import lvSelect from '../../components/lv-select/lv-select';

	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
	
		components: {
			lvSelect
		},
		data() {
			return {
				loading: false,
                showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
                searchValue: '',
				infoList: [], //搜索框快捷提示
				pageindex: 0,
				pagesize: 20,
				pagecount: 10,
				keywords:'', //关键字搜索
				items: [] ,//用户列表
			
			}
		},
		created() {
		this.pageindex = 1; //显示第一页
		this.LoadUserList(); //第一次加载
			
		},
		onPullDownRefresh(){
			console.log("下拉刷新");
			this.pageindex=1;
			this.items=[];
			this.keywords="";
			this.LoadUserList();
		    uni.stopPullDownRefresh();
			
		},
		onReachBottom(){
			console.log("上拉加载");
			this.pageindex=this.pageindex+1;
			this.LoadUserList();
		},
		methods: {
				...mapMutations(['setMaintainer']),
			onConfim(){
				
				let checkitems=[];
				for(let i=0 ;i<this.items.length;i++){
					
					if(this.items[i].checked==true){
						checkitems.push(this.items[i]);
					}
				}
				
				this.setMaintainer(checkitems);
				
				uni.navigateBack();
				
			},
			  handleSearch() {
			                    console.log("搜索执行:"+this.keywords);
			                   this.pageindex=1;
							   this.items=[];
							   this.LoadUserList();
			            },
						
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true);
				     } else {
						this.$set(item, 'checked', false)
					}
				}
			},
			LoadUserList() {
				var _self = this;
				
				if (_self.pageindex > _self.pagecount) {
					// uni.showToast({
					// 	title: "没有更多了..."
					// });
					return;
				}    

				uni.showLoading({
					title: "数据加载中..."
				})

				
				uni.request({
					url: this.LoginHost + "/api/Direction/UserList",
					data: {
						keywords: _self.keywords,
						pageindex: _self.pageindex,
						pagesize: _self.pagesize,
						SigningKey: _self.ApiKey,

					},
					method: "GET",
					header: {
						'content-type': 'application/text'
					},
					success: (res) => {
						uni.hideLoading();
						
						
						// console.log(JSON.stringify( res));
						
						//服务的返回信息不为true
						if (!res.data.Success) {
							uni.showToast({
								icon: 'none',
								title: res.data.Message,
							});
							return;
						}
						
						_self.pagecount=res.data.PageTotal;   //总共多少页
					
						for(var i=0;i<res.data.Content.length;i++){
							
							let name=res.data.Content[i].USER_NAME;
							let uuid=res.data.Content[i].USER_ID.toString();
							let dept=res.data.Content[i].DEPARTMENT;
							let workid=res.data.Content[i].WORK_ID
							
							
								_self.items.push({
								value: uuid,
								name: name,
								dept: dept,
								workid: workid,
							});
							
							
						}

						
						//console.log(JSON.stringify(_self.items));
					},
					fail(r) {
						console.log(r);
						uni.hideLoading();
						uni.showToast({
							title: "网络请求失败..."
						});
					}
				});




			}

		}
	}
</script>

<style>
</style>
