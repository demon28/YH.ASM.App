<template>

	<view class="content">

		<view  v-if="checks!=''" class="uni-textarea" style="min-height: 100upx;margin-top: 10upx; ">
			
			
			<textarea v-model="checks"  ></textarea>
		</view>

		<view v-if="checks!=''">
			<button class="uni-swipe_button" @click="onConfim" style="margin-top: 15upx;">确定并返回</button>
		</view>

		<view style="margin-top: 10px;">
			<lv-select @handleSearch="handleSearch" @change="change" placeholder="姓名 \ 工号 \ 部门" :infoList="infoList" :showValue="showValue"
			 v-model="keywords" :loading="loading" type="primary" :uniShadow="true" :isShowSelect="false"></lv-select>
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
	import lvselect from '../../components/lv-select/lv-select';

	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {

		components: {
			lvselect
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
				keywords: '', //关键字搜索
				items: [], //用户列表
				checks: "", //显示的选择用户string
				checkitems: [], //被选中的人员集合
			}
		},
		created() {
			this.pageindex = 1; //显示第一页
			this.LoadUserList(); //第一次加载

		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.pageindex = 1;
			this.items = [];
			this.keywords = "";
			this.checkitems=[];
			this.checks="";
			this.LoadUserList();
			uni.stopPullDownRefresh();

		},
		onReachBottom() {
			console.log("上拉加载");
			this.pageindex = this.pageindex + 1;
			this.LoadUserList();
		},
		methods: {
			...mapMutations(['setMaintainer']),
			onConfim() {

				//将选择好的用户回传父页面 并跳转
				this.setMaintainer(this.checkitems);

				uni.navigateBack();

			},
			handleSearch() {
				console.log("搜索执行:" + this.keywords);
				this.pageindex = 1;
				this.items = [];
				this.LoadUserList();
			},
			IsHasitem: function(items, item) {

				//集合对象 是否包含 该对象

				for (var j = 0; j < items.length; j++) {
					if (items[j].value == item.value) {
						return true;
					}
				}

				return false;

			},
			checkboxChange: function(e) {
				var items = this.items,
					checkitems = this.checkitems,
					values = e.detail.value;

				console.log(e);
				this.checks = "";
				for (var i = 0; i < items.length; i++) {
					let item = items[i]
					if (values.includes(item.value)) {
						//被勾选的选项 是否包含当前 Item 包含则 添加

						//判断是否被添加过这个对象，没有则添加对象，避免重复添加

						if (!this.IsHasitem(checkitems, item)) {
							this.checkitems.push(item);
							//console.log("被添加的对象：" + JSON.stringify(checkitems))
						}
					} else {
						// else中 是未被选中的 item，
						// 如果 checkitems 中有包含这些选项 ，则需要删除这些item

						if (this.IsHasitem(checkitems, item)) {
								//删除方法，用for
								
								for(var l=0;l<this.checkitems.length;l++){
									if(this.checkitems[l].value==item.value){
										this.checkitems.splice(l,1);
									}
								}
						}

					}
				}
				
				
				//最后根据checkitems 显示用户名
				for (var k = 0; k < checkitems.length; k++) {

					this.checks += checkitems[k].name + ","
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

						_self.pagecount = res.data.PageTotal; //总共多少页

						for (var i = 0; i < res.data.Content.length; i++) {

							let name = res.data.Content[i].USER_NAME;
							let uuid = res.data.Content[i].USER_ID.toString();
							let dept = res.data.Content[i].DEPARTMENT;
							let workid = res.data.Content[i].WORK_ID


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
