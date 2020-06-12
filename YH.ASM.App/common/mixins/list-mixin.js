/**
 * uni-app上拉加载和下拉刷新混合
 * @author maybe
 */
export default {
	data() {
		return {
			loading: false, // 是否加载数据
			finished: false, // 是否加载完成
			list: [], // 数据列表
			page: 0, // 由于分页一般页面要+1，所以为了方便分页查询，这里初始设置页码为0
			size: 15, // 每页显示的条数
			total: 10 // 数据总条数
		};
	},
	async onLoad() {
		await this._getListFactory();
	},
	// 下拉刷新
	async onPullDownRefresh() {
		console.log('下拉刷新');
		this.initPageData();
		await this._getListFactory();
		uni.stopPullDownRefresh();
	},
	// 上拉加载
	async onReachBottom() {
		console.log('上拉加载');
		this._getListFactory();
	},
	methods: {
		// 初始化页面的数据
		initPageData(size) {
			this.finished = false;
			this.page = 0;
			this.list = [];
			this.size = size || 10;
			this.total = 0;
		},
		async _getListFactory() {
			// 如果已经全部加载完成直接终止执行
			if (this.finished) return;
			this.loading = true;
			this.page++;
			await this._getList();
			this.loading = false;
			// 判断是否全部加载完成
			if (this.list.length == this.total) {
				this.finished = true;
			}
		},
		// 数据请求方法需要在页面内重写
		async _getList() {},
	}
}
