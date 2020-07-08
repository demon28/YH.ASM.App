<template>

	<view class="content">



		<view v-if="checked" class="uni-list" style="margin-top: 20upx;">
			<label class="uni-list-cell uni-list-cell-pd" style=" min-height: 60upx; height: 60upx;" v-for="item in checkItem"
			 :key="item.uuid">
				<view>
					<view> {{item.name}} ({{item.workid}})</view>
				</view>
				<view>
					<button class="mini-btn" type="default" size="mini" style="margin-top: 10upx;" @click="unCheck(item)">取消</button>
				</view>
			</label>
			<button type="primary" size="mini" class="mini-btn" @click="onConfim" style="margin-right: 15upx;margin-top: 10upx; margin-bottom: 10upx;" >确定并返回</button>
			
		</view>

		<view style="margin-top: 15upx;">
			<uni-search-bar :radius="100" @input="Search" v-model="words" clearButton="auto"></uni-search-bar>
		</view>

		<view class="uni-list" style="margin-top: 20upx;">
			<label class="uni-list-cell uni-list-cell-pd" style=" min-height: 60upx; height: 60upx;" v-for="item in list" :key="item.uuid">
				<view>
					<view> {{item.name}} ({{item.workid}})</view>
				</view>
				<view>
					<button v-if="!isSingle" class="mini-btn" type="default" size="mini" style="margin-top: 10upx;" @click="onCheckMany(item)">选中</button>
				<button v-if="isSingle" class="mini-btn" type="default" size="mini" style="margin-top: 10upx;" @click="onCheckSingle(item)">选中</button>
				
				</view>
			</label>
		</view>

	</view>



</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {

		components: {

		},
		data() {
			return {
				list: [],
				pageindex: 1,
				pagesize: 20,
				pagecount: 10,
				words: "",
				keywords: "",
				checked: false,
				checkItem: [],
				isSingle: false, // 页面取值是 选择单用户，还是多用户
				type:"", //参数调用类型，
			}
		},
		created() {
			this.pageindex = 1; //显示第一页
			this.Init(); //第一次加载

		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.pageindex = 1;
			this.checkItem=[];
			this.checked=false;
			
			this.Init();
			uni.stopPullDownRefresh();

		},
		onReachBottom() {
			console.log("上拉加载");
			this.pageindex = this.pageindex + 1;
			this.Init();
		},
		onLoad(option) {
		
			if(option.isSingle!=null && option.isSingle!="")
			{	console.log(option.isSingle);  //接收URL参数
				this.isSingle=option.isSingle==="true"?true:false;
				
			}
			if(option.type!=null && option.type!="")
			{	
				console.log(option.type);  //接收URL参数
				this.type=option.type;
				
			}
			
		
		},
		methods: {
				...mapMutations(['setSupportConductor','setSupportCopy','setDisporseAnalyzeuser']),
			Init() {
				var _self = this;

				if (_self.pageindex > _self.pagecount) {
					return;
				}

				uni.showLoading({
					title: "数据加载中..."
				})
				console.log("关键字搜索:" + this.keywords);

				uni.request({
					url: this.LoginHost + "/api/User/UserList",
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

						//console.log(JSON.stringify( res));

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

							_self.list.push({
								uuid: uuid,
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
			},
			Search() {
				this.keywords = this.words.value;
				
				this.pageindex = 1;
				this.list = [];
				this.Init();
			},
			onCheckMany(item) {
				this.checked = true;

				//如果存在则不添加

				console.log("被选中的用户="+JSON.stringify(item));
				console.log("被选中的用户集合=="+JSON.stringify(this.checkItem));

				for (let i = 0; i < this.checkItem.length; i++) {
					if (this.checkItem[i].uuid == item.uuid) {
						uni.showToast({
							title: "已存在..."
						});
						return;
					}
				}

				this.checkItem.push(item);
				
				

			},onCheckSingle(item){
				var _self=this;
				
				this.checkItem.push(item);
				if(_self.type=="conductor"){
					this.setSupportConductor(this.checkItem);
				}
				if(_self.type=="copy"){
					this.setSupportCopy(this.checkItem);
					
				}
				if(_self.type=="analyzeuser"){
					this.setDisporseAnalyzeuser(this.checkItem);
				}
				
				uni.navigateBack();
				
			},
			unCheck(item) {

				// console.log("被选中的用户="+JSON.stringify(item));
				// console.log("被选中的用户集合=="+JSON.stringify(this.checkItem));

				for (let i = 0; i < this.checkItem.length; i++) {
					if (this.checkItem[i].uuid == item.uuid) {
						this.checkItem.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
						i--; // 如果不减，将漏掉一个元素
					}
				}

				if (this.checkItem.length == 0) {

					this.checked = false;
				}

			},
			onConfim(){
				var _self=this;
			if(_self.type=="conductor"){
				this.setSupportConductor(this.checkItem);
			}
			if(_self.type=="copy"){
				this.setSupportCopy(this.checkItem);
			}
			if(_self.type=="analyzeuser"){
					this.setDisporseAnalyzeuser(this.checkItem);
			}
				
				uni.navigateBack();
			}
		}
	}
</script>

<style>
</style>
