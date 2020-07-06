/** 非空验证 */
const isNotNull = function(source) {
	if (source != null && source != undefined && source != 'undefined' && source != "")
		return true;
	return false;
}



/**去空格后非空验证*/
const isNotNullTrim = function(source) {
	if (source != null && source != undefined && source != 'undefined' && source.trim() != "")
		return true;
	return false;
}
/**
 * 验证字符串最大长度【注：一个汉字的长度为2】
 * @param source 字符串
 * @param num 指定的长度
 */
const textMaxVer = function(source, num) {
	if (source.replace(/[^\x00-\xff]/g, "**").length <= num)
		return true;
	return false;
}


/**
 * 验证字符串最小长度【注：一个汉字的长度为2】
 * @param source 字符串
 * @param num 指定的长度
 */
const textMinVer = function(source, num) {
	if (source.replace(/[^\x00-\xff]/g, "**").length >= num)
		return true;
	return false;
}

/*验证集合对象是否有值*/
const arrayVer = function(array) {
	if(!Array.isArray(array))
    	return false;
	
	if(array.length==0)
		return false;
		
	return false;

}
const itemVer = function(item) {
	return Object.keys(item).length != 0;

}
const itemHasKeyVer = function(item,key) {
	return item.hasOwnProperty(key);

}


export default {
	isNotNull,
	isNotNullTrim,
	textMaxVer,
	textMinVer,
	arrayVer,
	itemVer,
	itemHasKeyVer
}
