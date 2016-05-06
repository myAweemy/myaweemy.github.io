function addEvent(obj,ev,fn) {
	if (obj.attachEvent) {
		obj.attachEvent('on'+ ev,fn);
	}else{
		obj.addEventListener(ev,fn,false);
	}
}