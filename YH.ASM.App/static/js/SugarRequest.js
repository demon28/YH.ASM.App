

import ApiSingin from "./ApiSingin.js";
import Config from './Config.js'


var Get= function (model,path,callback){
	
	callback("data");
}
	

var Post= function (model,path,callback){
	
	
	let jsonString=JSON.stringify(model);
	let timestamp= Math.round(new Date().getTime()/1000);
	
	let Singinkey=ApiSingin.Singin(path,jsonString,Config.Parameters.ApiKey,timestamp);
	
	//加载提示
	uni.showLoading({
	    title: '加载中...'
	});
	
	uni.request({
	    url:Config.Parameters.LoginHost+path, 
	    data: model,
		method :"POST",
	    header: {
	       // 'content-type': 'application/json' ,//自定义请求头信息
			 'timestamp':timestamp,
			 'SigningKey':Singinkey
	    },
	    success: (res) => {
	  
	     uni.hideLoading();
		 
		
		 		
		if(res.statusCode!=200){
			uni.showToast({
				icon: 'none',
				title: "服务器内部错误！"
			});
			return;
		}		
		 if (!res.data.Success) {
		 	uni.showToast({
		 		icon: 'none',
		 		title: res.data.Message
		 	});
			return;
		 }
						 
						
						
		callback(res.data,res);
		
			 
	    }
		,fail(re){
			
			console.log(re);
			
			uni.hideLoading();
			uni.showToast({
				icon: 'none',
				title: '网络请求失败！'
			});
			
		}
	
	
	});
	
	
	
}



export default {
	Post,Get
	
}