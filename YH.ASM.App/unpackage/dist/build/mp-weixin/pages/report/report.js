(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/report/report"],{"30de":function(e,t,n){"use strict";(function(e){n("5a3b");o(n("66fd"));var t=o(n("d8ad"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"6c39":function(e,t,n){"use strict";n.r(t);var o=n("f618"),i=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},"81f9":function(e,t,n){"use strict";var o={uniList:function(){return n.e("components/uni-list/uni-list").then(n.bind(null,"79c8"))},uniListItem:function(){return n.e("components/uni-list-item/uni-list-item").then(n.bind(null,"d475"))}},i=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}))},"856b":function(e,t,n){},"907c":function(e,t,n){"use strict";var o=n("856b"),i=n.n(o);i.a},d8ad:function(e,t,n){"use strict";n.r(t);var o=n("81f9"),i=n("6c39");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("907c");var c,u=n("f0c5"),a=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=a.exports},f618:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(){n.e("components/uni-list-item/uni-list-item").then(function(){return resolve(n("d475"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("components/uni-list/uni-list").then(function(){return resolve(n("79c8"))}.bind(null,n)).catch(n.oe)},s={computed:r({},(0,o.mapState)(["forcedLogin","hasLogin","userName","workid","department","dtname","userId"])),components:{unilist:u,unilist_item:a},data:function(){return{arrayType:["早报","晚报"],arrayProject:[{key:"0",value:"惠州长治项目"},{key:"1",value:"深圳龙华项目"}],arrayProjectKehu:[{key:"0",value:"张福军"},{key:"1",value:"刘之龙"}],arraySupport:[{key:"0",value:"拿铁001设备噪音较大"},{key:"1",value:"宏观002设备没声音"}],indexType:0,indexProject:0,indexProjectkehu:0,indexSupport:0,locatladdress:"",locatllongitude:"0",locatllatitude:"0",unionName:"",unionDtname:"",datetime:"",content:""}},mounted:function(){var e=new Date;this.datetime=e.toLocaleDateString(),this.unionName=this.userName+"("+this.workid+")",this.unionDtname=this.department+"-"+this.dtname,this.getAuthorizeInfo()},methods:{bindPickerChange:function(e){console.log(e.target.value),this.indexType=e.target.value},projectPickerChange:function(e){this.indexProject=e.target.value},projectkehuPickerChange:function(e){this.indexProjectkehu=e.target.value},supportPickerChange:function(e){console.log(e.target.value),this.indexSupport=e.target.value},getAuthorizeInfo:function(){var t=this;e.authorize({scope:"scope.userLocation",success:function(){t.getLocationInfo()},fail:function(){t.openConfirm(),console.log("你拒绝了授权，无法获得周边信息")}})},getLocationInfo:function(){var t=this;e.getLocation({type:"wgs84",success:function(n){console.log(n),console.log(n.latitude.toString()),t.locatllatitude=n.latitude.toString(),t.locatllongitude=n.longitude.toString(),e.request({header:{"Content-Type":"application/text"},url:"http://apis.map.qq.com/ws/geocoder/v1/?location="+n.latitude+","+n.longitude+"&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35",success:function(e){console.log(e.data.result.address),200===e.statusCode?(t.locatladdress=e.data.result.address,console.log("获取中文街道地理位置成功")):console.log("获取信息失败，请重试！")}})}})},openConfirm:function(){e.showModal({title:"请求授权当前位置",content:"需要获取您的地理位置，请确认授权",success:function(t){t.confirm?e.openSetting():t.cancel&&e.showToast({title:"你拒绝了授权，无法获得周边信息",icon:"none",duration:1e3})}})},onInfoSubmit:function(){var t=this;e.showLoading({title:"提交中"});var n=this.ApiKey;console.log(t.userId),console.log(t.indexProject),console.log(t.indexProjectkehu),console.log(this.indexType),console.log(t.indexType),console.log(t.indexSupport),e.request({url:this.LoginHost+"/api/Direction/Put",data:{userId:t.userId,projecId:t.indexProject,customerId:t.indexProjectkehu,type:t.indexType,supportId:t.indexSupport,longitude:t.locatllongitude,latitude:t.locatllatitude,content:t.content,address:t.locatladdress,date:t.datetime,SigningKey:n},method:"POST",header:{"content-type":"application/json"},success:function(t){console.log(JSON.stringify(t)),e.hideLoading(),t.data.Success?e.showModal({content:"提交成功，是否返回首页？",showCancel:!0,success:function(t){t.confirm&&e.navigateBack()}}):e.showToast({icon:"none",title:t.data.Message})}})}}};t.default=s}).call(this,n("543d")["default"])}},[["30de","common/runtime","common/vendor"]]]);