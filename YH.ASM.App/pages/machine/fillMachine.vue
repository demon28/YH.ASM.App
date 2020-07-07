<template>

	<view class="content">



		<view v-if="checked" class="uni-list" style="margin-top: 20upx;">
			<label class="uni-list-cell uni-list-cell-pd" style=" min-height: 60upx; height: 60upx;" v-for="item in checkItem"
			 :key="item.id">
				<view>
					<view> {{item.name}}-{{item.serial}} </view>
				</view>
				<view>
					<button class="mini-btn" type="default" size="mini" style="margin-top: 10upx;" @click="unCheck(item)">取消</button>
				</view>
			</label>
		<button type="primary" size="mini" class="mini-btn" @click="onConfim" style="margin-right: 15upx;margin-top: 10upx; margin-bottom: 10upx;" >确定并返回</button>
		
		</view>

		<view style="margin-top: 15upx;">
			<uni-search-bar :radius="100" @input="Search" v-model="words"></uni-search-bar>
		</view>

		<view class="uni-list" style="margin-top: 20upx;">
			<label class="uni-list-cell uni-list-cell-pd" style=" min-height: 60upx; height: 60upx;" v-for="item in list" :key="item.id">
				<view>
					<view> {{item.name}}-{{item.serial}}</view>
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
	import {mapState,mapMutations} from 'vuex'
	import ApiSingin from '../../static/js/ApiSingin.js';
	
	export default {

		computed: mapState(['supportMachine']),
		components: {},
		data() {
			return {
				list: [],
				pageindex: 1,
				pagesize: 20,
				pagecount: 10,
				words: "",
				keywords: "",
				checked: false,   //是否显示被选中的集合
				checkItem: [],    //被选中的人
				isSingle: false, // 单对象 还是 多对象
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
		
		},
		methods: {
			  ...mapMutations(['setSupportMachine']) , 
			Init() {
				var _self = this;

				if (_self.pageindex > _self.pagecount) {
					return;
				}

				uni.showLoading({
					title: "数据加载中..."
				})
				console.log("关键字搜索:" + this.keywords);

				let model={
					pageindex: _self.pageindex,
					pagesize: _self.pagesize,
				
				 };
				 let jsonString=JSON.stringify(model);
				 let timestamp=_self.$timestamp();
				 let path="/api/Machine/List";
				 let Singinkey=ApiSingin.Singin(path,jsonString,_self.ApiKey,timestamp);


				uni.request({
					url:_self.LoginHost+path,
					 data: model,
					method :"POST",
					 header: {
					    // 'content-type': 'application/json' ,//自定义请求头信息
						 'timestamp':timestamp,
						 'SigningKey':Singinkey
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

							let name = res.data.Content[i].NAME;
							let id = res.data.Content[i].MID;
							let serial= res.data.Content[i].SERIAL;
							_self.list.push({
								id: id,
								name: name,
								serial:serial,
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


				for (let i = 0; i < this.checkItem.length; i++) {
					if (this.checkItem[i].id == item.id) {
						uni.showToast({
							title: "已存在..."
						});
						return;
					}
				}

				this.checkItem.push(item);
				
				

			},
			onCheckSingle(item){
				
				this.checkItem.push(item);
				this.setSupportMachine(this.checkItem);
				console.log("选中了一个项目"+JSON.stringify(this.supportProject));
				uni.navigateBack();
			},
			unCheck(item) {

				for (let i = 0; i < this.checkItem.length; i++) {
					if (this.checkItem[i].id == item.id) {
						this.checkItem.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
						i--; // 如果不减，将漏掉一个元素
					}
				}

				if (this.checkItem.length == 0) {

					this.checked = false;
				}

			},
			onConfim(){
				//多对象返回
				this.setSupportMachine(this.checkItem);
				uni.navigateBack();
			}
		}
	}
</script>

<style>
</style>
