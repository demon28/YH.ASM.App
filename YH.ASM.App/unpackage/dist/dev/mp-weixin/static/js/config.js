

const Parameters={
	
	
	//是否是开发环境,是则配置true   /正式环境为false
	Isdevpos:true,   
	ApiKey:"58b59b3ae5d0ec0629950ebdd4dabe39",
	LoginHost:function(){
				if(Parameters.Isdevpos)
				{
					return "http://www.asm.cn:50428";
				}
				return "https://asm.yhwins.com:52420";
		}

}


export default {
	Parameters
}