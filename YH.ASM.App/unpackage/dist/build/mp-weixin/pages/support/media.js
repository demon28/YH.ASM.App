(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/support/media"],{"4bf4":function(t,n,e){"use strict";e.r(n);var u=e("8c41"),r=e("dc35");for(var o in r)"default"!==o&&function(t){e.d(n,t,(function(){return r[t]}))}(o);var a,i=e("f0c5"),c=Object(i["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);n["default"]=c.exports},"8c41":function(t,n,e){"use strict";var u,r=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return u}))},"964d":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={data:function(){return{type:"img",url:""}},onLoad:function(t){if(null!=t.url&&""!=t.url){var n=decodeURIComponent(t.url);this.url=this.LoginHost+n;var e=this.url.lastIndexOf("."),u=this.url.substr(e+1);console.log(this.url),-1!==["png","jpg","jpeg"].indexOf(u.toLowerCase())&&(this.type="img"),-1!==["mp4","mov","AVI"].indexOf(u.toLowerCase())&&(this.type="videp")}}};n.default=u},dc35:function(t,n,e){"use strict";e.r(n);var u=e("964d"),r=e.n(u);for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);n["default"]=r.a},dfea:function(t,n,e){"use strict";(function(t){e("5a3b");u(e("66fd"));var n=u(e("4bf4"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["dfea","common/runtime","common/vendor"]]]);