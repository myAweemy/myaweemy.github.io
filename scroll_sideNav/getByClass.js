function getByClass(obj,cName) {
	var result = [];
	var all = obj.getElementsByTagName('*');
	for (var i = 0; i < all.length; i++) {
		if (all[i].className == cName) {
			result.push(all[i]);
		}	
	}
	return result;
}