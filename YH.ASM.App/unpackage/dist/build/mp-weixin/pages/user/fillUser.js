(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/fillUser"],{"260c":function(e,t,n){"use strict";n.r(t);var i=n("dad5"),o=n.n(i);for(var c in i)"default"!==c&&function(e){n.d(t,e,(function(){return i[e]}))}(c);t["default"]=o.a},"9a28":function(e,t,n){"use strict";(function(e){n("5a3b");i(n("66fd"));var t=i(n("ca28"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"9f71":function(e,t,n){"use strict";var i={uniSearchBar:function(){return n.e("components/uni-search-bar/uni-search-bar").then(n.bind(null,"bbce"))}},o=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return i}))},ca28:function(e,t,n){"use strict";n.r(t);var i=n("9f71"),o=n("260c");for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);var s,r=n("f0c5"),a=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=a.exports},dad5:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("2f62"),o=c(n("aae1"));function c(e){return e&&e.__esModule?e:{default:e}}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={components:{},data:function(){return{list:[],pageindex:1,pagesize:20,pagecount:10,words:"",keywords:"",checked:!1,checkItem:[],isSingle:!1,type:""}},created:function(){this.pageindex=1,this.Init()},onPullDownRefresh:function(){console.log("下拉刷新"),this.pageindex=1,this.checkItem=[],this.checked=!1,this.list=[],this.Init(),e.stopPullDownRefresh()},onReachBottom:function(){console.log("上拉加载"),this.pageindex=this.pageindex+1,this.Init()},onLoad:function(e){null!=e.isSingle&&""!=e.isSingle&&(console.log(e.isSingle),this.isSingle="true"===e.isSingle),null!=e.type&&""!=e.type&&(console.log(e.type),this.type=e.type)},methods:r({},(0,i.mapMutations)(["setSupportConductor","setSupportCopy","setDisporseAnalyzeuser"]),{Init:function(){var t=this;0==t.pagecount&&(t.pagecount=10),t.pageindex>t.pagecount?console.log("被返回:"+t.pageindex+":"+t.pagecount):(e.showLoading({title:"数据加载中..."}),console.log("关键字搜索:"+this.keywords),e.request({url:o.default.Parameters.LoginHost()+"/api/User/UserList",data:{keywords:t.keywords,pageindex:t.pageindex,pagesize:t.pagesize,SigningKey:o.default.Parameters.ApiKey},method:"GET",header:{"content-type":"application/text"},success:function(n){if(e.hideLoading(),n.data.Success){t.pagecount=n.data.PageTotal;for(var i=0;i<n.data.Content.length;i++){var o=n.data.Content[i].USER_NAME,c=n.data.Content[i].USER_ID.toString(),s=n.data.Content[i].DEPARTMENT,r=n.data.Content[i].WORK_ID;t.list.push({uuid:c,name:o,dept:s,workid:r})}}else e.showToast({icon:"none",title:n.data.Message})},fail:function(t){console.log(t),e.hideLoading(),e.showToast({title:"网络请求失败..."})}}))},Search:function(){this.keywords=this.words.value,console.log("触动搜搜："+this.keywords),this.pageindex=1,this.list=[],this.Init()},onCheckMany:function(t){this.checked=!0,console.log("被选中的用户="+JSON.stringify(t)),console.log("被选中的用户集合=="+JSON.stringify(this.checkItem));for(var n=0;n<this.checkItem.length;n++)if(this.checkItem[n].uuid==t.uuid)return void e.showToast({title:"已存在..."});this.checkItem.push(t)},onCheckSingle:function(t){var n=this;this.checkItem.push(t),"conductor"==n.type&&this.setSupportConductor(this.checkItem),"copy"==n.type&&this.setSupportCopy(this.checkItem),"analyzeuser"==n.type&&this.setDisporseAnalyzeuser(this.checkItem),e.navigateBack()},unCheck:function(e){for(var t=0;t<this.checkItem.length;t++)this.checkItem[t].uuid==e.uuid&&(this.checkItem.splice(t,1),t--);0==this.checkItem.length&&(this.checked=!1)},onConfim:function(){var t=this;"conductor"==t.type&&this.setSupportConductor(this.checkItem),"copy"==t.type&&this.setSupportCopy(this.checkItem),"analyzeuser"==t.type&&this.setDisporseAnalyzeuser(this.checkItem),e.navigateBack()}})};t.default=u}).call(this,n("543d")["default"])}},[["9a28","common/runtime","common/vendor"]]]);