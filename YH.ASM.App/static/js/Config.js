

const Parameters={
	
	
	//是否是开发环境： 1： 开发环境， 2：预投产环境，3，正式环境
	Isdevpos:3,   
	Version:"1.1.27",
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
		
	}
 
}


export default {
	Parameters
}