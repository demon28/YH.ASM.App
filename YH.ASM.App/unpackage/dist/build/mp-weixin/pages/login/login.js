(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"0f7e":function(t,n,e){},"63f1":function(t,n,e){"use strict";var o,i=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return o}))},"7af0":function(t,n,e){"use strict";(function(t){e("5a3b");o(e("66fd"));var n=o(e("97c4"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"97c4":function(t,n,e){"use strict";e.r(n);var o=e("63f1"),i=e("b3da");for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);e("f80c");var c,a=e("f0c5"),s=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);n["default"]=s.exports},b3da:function(t,n,e){"use strict";e.r(n);var o=e("c26e"),i=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);n["default"]=i.a},c26e:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;i(e("e312")),i(e("0b98"));var o=e("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function r(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,o)}return e}function c(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?r(Object(e),!0).forEach((function(n){a(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function a(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var s=function(){e.e("components/m-input").then(function(){return resolve(e("1437"))}.bind(null,e)).catch(e.oe)},u={components:{mInput:s},data:function(){return{providerList:[],hasProvider:!1,account:"11003870",password:"1346888",positionTop:0,isDevtools:!1}},computed:(0,o.mapState)(["forcedLogin"]),methods:c({},(0,o.mapMutations)(["login"]),{initProvider:function(){},initPosition:function(){this.positionTop=t.getSystemInfoSync().windowHeight-100},bindLogin:function(){var n=this;if(this.account.length<4)t.showToast({icon:"none",title:"账号最短为 4 个字符"});else if(this.password.length<6)t.showToast({icon:"none",title:"密码最短为 6 个字符"});else{console.log("======"+this.LoginHost+"/api/Login/Login");var e=this.ApiKey;console.log("======key"+e),t.request({url:this.LoginHost+"/api/Login/Login",data:{Username:this.account,Password:this.password,SigningKey:e},method:"POST",header:{"content-type":"application/json"},success:function(e){n.text="request success",console.log(JSON.stringify(e)),e.data.Success?(console.log("======key"+e.data.Content.USER_ID),n.login(e.data.Content),n.toMain()):t.showToast({icon:"none",title:"用户账号或密码不正确"})}})}},toMain:function(){this.forcedLogin?t.reLaunch({url:"../main/main"}):t.navigateBack()}}),onReady:function(){this.initPosition()}};n.default=u}).call(this,e("543d")["default"])},f80c:function(t,n,e){"use strict";var o=e("0f7e"),i=e.n(o);i.a}},[["7af0","common/runtime","common/vendor"]]]);