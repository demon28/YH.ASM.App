(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/project/fillProject"],{"0874":function(e,t,n){"use strict";var i={uniSearchBar:function(){return n.e("components/uni-search-bar/uni-search-bar").then(n.bind(null,"bbce"))}},o=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return i}))},"2f77":function(e,t,n){"use strict";(function(e){n("5a3b");i(n("66fd"));var t=i(n("e120"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},e120:function(e,t,n){"use strict";n.r(t);var i=n("0874"),o=n("fe14");for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);var r,s=n("f0c5"),a=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);t["default"]=a.exports},e962:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("2f62");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s={computed:(0,i.mapState)(["supportProject"]),components:{},data:function(){return{list:[],pageindex:1,pagesize:20,pagecount:10,words:"",keywords:"",checked:!1,checkItem:[],isSingle:!1}},created:function(){this.pageindex=1,this.Init()},onPullDownRefresh:function(){console.log("下拉刷新"),this.pageindex=1,this.checkItem=[],this.checked=!1,this.Init(),e.stopPullDownRefresh()},onReachBottom:function(){console.log("上拉加载"),this.pageindex=this.pageindex+1,this.Init()},onLoad:function(e){null!=e.isSingle&&""!=e.isSingle&&(console.log(e.isSingle),this.isSingle="true"===e.isSingle)},methods:c({},(0,i.mapMutations)(["setSupportProject"]),{Init:function(){var t=this;t.pageindex>t.pagecount||(e.showLoading({title:"数据加载中..."}),console.log("关键字搜索:"+this.keywords),e.request({url:this.LoginHost+"/api/Project/ProjectList",data:{keywords:t.keywords,pageindex:t.pageindex,pagesize:t.pagesize,SigningKey:t.ApiKey},method:"GET",header:{"content-type":"application/text"},success:function(n){if(e.hideLoading(),n.data.Success){t.pagecount=n.data.PageTotal;for(var i=0;i<n.data.Content.length;i++){var o=n.data.Content[i].NAME,c=n.data.Content[i].PID;t.list.push({id:c,name:o})}}else e.showToast({icon:"none",title:n.data.Message})},fail:function(t){console.log(t),e.hideLoading(),e.showToast({title:"网络请求失败..."})}}))},Search:function(){this.keywords=this.words.value,this.pageindex=1,this.list=[],this.Init()},onCheckMany:function(t){this.checked=!0;for(var n=0;n<this.checkItem.length;n++)if(this.checkItem[n].id==t.id)return void e.showToast({title:"已存在..."});this.checkItem.push(t)},onCheckSingle:function(t){this.checkItem.push(t),this.setSupportProject(this.checkItem),console.log("选中了一个项目"+JSON.stringify(this.supportProject)),e.navigateBack()},unCheck:function(e){for(var t=0;t<this.checkItem.length;t++)this.checkItem[t].id==e.id&&(this.checkItem.splice(t,1),t--);0==this.checkItem.length&&(this.checked=!1)},onConfim:function(){this.setSupportProject(this.checkItem),e.navigateBack()}})};t.default=s}).call(this,n("543d")["default"])},fe14:function(e,t,n){"use strict";n.r(t);var i=n("e962"),o=n.n(i);for(var c in i)"default"!==c&&function(e){n.d(t,e,(function(){return i[e]}))}(c);t["default"]=o.a}},[["2f77","common/runtime","common/vendor"]]]);