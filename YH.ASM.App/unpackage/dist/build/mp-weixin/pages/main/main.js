(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{"1a59":function(n,t,e){},"21ca":function(n,t,e){"use strict";e.r(t);var o=e("6ade"),r=e("f0bc");for(var i in r)"default"!==i&&function(n){e.d(t,n,(function(){return r[n]}))}(i);e("c2b1");var u,c=e("f0c5"),a=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=a.exports},"5c03":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;r(e("e312"));var o=e("2f62");function r(n){return n&&n.__esModule?n:{default:n}}function i(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,o)}return e}function u(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?i(Object(e),!0).forEach((function(t){c(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function c(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var a=function(){e.e("components/uni-grid/uni-grid").then(function(){return resolve(e("8478"))}.bind(null,e)).catch(e.oe)},l=function(){e.e("components/uni-grid-item/uni-grid-item").then(function(){return resolve(e("b408"))}.bind(null,e)).catch(e.oe)},s={components:{uniGrid:a,uniGridItem:l},computed:u({},(0,o.mapState)(["forcedLogin","hasLogin","userName","workid"])),onLoad:function(){var t=this;console.log(this.forcedLogin+"===="+this.hasLogin+"==="+this.userName+"==="+this.workid+"==="+this.department+"==="),console.log("是否登录过："+this.hasLogin),n.getStorage({key:"IsLogined",success:function(e){console.log("====有登录过"+JSON.stringify(e.data)),e.data&&n.getStorage({key:"loginfo",success:function(n){console.log("====登录数据："+JSON.stringify(n.data)),t.login(n.data)}})},fail:function(e){t.hasLogin||n.showModal({title:"未登录",content:"您未登录，需要登录后才能继续",showCancel:!t.forcedLogin,success:function(e){e.confirm&&(t.forcedLogin?n.reLaunch({url:"../login/login"}):n.navigateTo({url:"../login/login"}))}})}})},methods:u({},(0,o.mapMutations)(["login"]),{AddReport:function(){console.log("提交日报"),n.navigateTo({url:"../report/report"})},ViewReportHis:function(){console.log("日报记录"),n.navigateTo({url:"../report/history"})},ViewSupportList:function(){n.navigateTo({url:"../support/list"})},ViewSupporCreate:function(){n.navigateTo({url:"../support/create"})}})};t.default=s}).call(this,e("543d")["default"])},"6ade":function(n,t,e){"use strict";var o={uniGrid:function(){return e.e("components/uni-grid/uni-grid").then(e.bind(null,"8478"))},uniGridItem:function(){return e.e("components/uni-grid-item/uni-grid-item").then(e.bind(null,"b408"))}},r=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return o}))},c2b1:function(n,t,e){"use strict";var o=e("1a59"),r=e.n(o);r.a},ddd8:function(n,t,e){"use strict";(function(n){e("5a3b");o(e("66fd"));var t=o(e("21ca"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},f0bc:function(n,t,e){"use strict";e.r(t);var o=e("5c03"),r=e.n(o);for(var i in o)"default"!==i&&function(n){e.d(t,n,(function(){return o[n]}))}(i);t["default"]=r.a}},[["ddd8","common/runtime","common/vendor"]]]);