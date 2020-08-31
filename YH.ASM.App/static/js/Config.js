

const Parameters={
	
<<<<<<< HEAD
	 
	//是否是开发环境： 1： 开发环境， 2：预投产环境，3，正式环境，4，和合售后，5，雅康售后
	Isdevpos:5,   
	Version:"1.1.31",
=======
	
	//是否是开发环境： 1： 开发环境， 2：预投产环境，3，正式环境
	Isdevpos:2,   
	Version:"1.1.26",
>>>>>>> e67ee932eea46ee87731abc34970bc01b99bc650
	ApiKey:"58b59b3ae5d0ec0629950ebdd4dabe39",
	LoginHost:function(){
				if(Parameters.Isdevpos==1){
					return "http://www.asm.cn:50428";
				}
				if(Parameters.Isdevpos==2){
					return "https://asm.yhwins.com:52428";
				}
				if(Parameters.Isdevpos==3){
					return "https://asm.yhwins.com:52420";
				}
				if(Parameters.Isdevpos==4){
					return "https://hhasm.yhwins.com";
				}
				if(Parameters.Isdevpos==5){
					return "https://ykasm.yhwins.com";
				}
				
		},
	Mark:function(){
		if(Parameters.Isdevpos==1)
		{
			return "开发版";
		}
		if(Parameters.Isdevpos==2){
			return "预投版";
		}
		if(Parameters.Isdevpos==3){
			return "正式版";
		}
		if(Parameters.Isdevpos==4){
			return "和合版";
		}
		if(Parameters.Isdevpos==5){
			return "雅康版";
		}
		
	}
 
}


export default {
	Parameters
}