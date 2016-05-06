function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}
function changeNow(obj,json,func) {
	clearInterval(obj.timer);
	var speed = 0;
	var attr = 0;
	
	obj.timer = setInterval(function(){
		var isReady = true;
		for(var i in json){
			attr = (i=='opacity')?Math.round(parseFloat(getStyle(obj,i)) * 100):attr = parseInt(getStyle(obj,i));
			speed = (json[i] - attr) > 0 ? Math.ceil((json[i] - attr)/8) : Math.floor((json[i] - attr)/8);
			attr += speed;
			
			if(attr !== json[i])
				isReady = false;
			
			if (i == 'opacity') {
				obj.style.filter = 'alpha(opacity:'+ attr +')';
				obj.style.opacity = attr/100;
			}
			else{
				obj.style[i] = attr +'px';
			}			
		}
		if(isReady){//循环完毕后就可以通过isResdy变量来判断是不是所有元素都到达了目标，换句话说是不是存在元素没有到达目标
			clearInterval(obj.timer);
			if (func) {func();}
		}
	},30);	
}