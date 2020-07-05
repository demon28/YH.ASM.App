

import md5 from './md5.min.js';

const Singin=function(path,jsonString,ApiKey,timestamp){
	
	let enString;
	enString+="path="+path;
	enString+="&timestamp="+timestamp;
	enString+="&body="+jsonString;
	enString+="&key="+ApiKey;
	
	console.log("enString===="+enString);
	
	return md5.hex(enString).toUpperCase();
	
}


export default {
	Singin
}


