

import ApiSingin from "./ApiSingin.js";
import Config from './Config.js'


var Get= function (model,path,callback){
	
	
	let jsonString=JSON.stringify(model);
	let timestamp= Math.round(new Date().getTime()/1000);
	
	let Singinkey=ApiSingin.Singin(path,"",Config.Parameters.ApiKey,timestamp);
	
	//加载提示
	uni.showLoading({
	    title: '加载中...'
	});
	
	uni.request({
	    url:Config.Parameters.LoginHost()+path, 
	    data: model,
		method :"Get",
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
		console.log("请求结果"+JSON.stringify(res));	
		callback(res.data,res);
		
			 
	    }
		,fail(re){
			callback({},re);
			uni.hideLoading();
			uni.showToast({
				icon: 'none',
				title: '网络请求失败！'
			});
			
		}
	
	
	});
	
	
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
	    url:Config.Parameters.LoginHost()+path, 
	    data: model,
		method :"POST",
	    header: {
	       // 'content-type': 'application/json' ,//自定义请求头信息
			 'timestamp':timestamp,
			 'SigningKey':Singinkey
	    },
	    success: (res) => {
	  
	     uni.hideLoading();
		 
		
		callback(res.data,res);
		 		
		if(res.statusCode!=200){
			uni.showToast({
				icon: 'none',
				title: "服务器内部错误！"
			});
			return;
		}		
		
						 
						
				
		
			 
	    }
		,fail(re){
			callback({},re);
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