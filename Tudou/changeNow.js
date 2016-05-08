function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj, false)[attr];
	}
}

function changeNow(obj, json, fn){
	if(obj.timer){
		clearInterval(obj.timer);
	}
	obj.timer=setInterval(function (){
		startMove(obj, json, fn);
	}, 30);
	
	var oDate=new Date();
	
	if(oDate.getTime()-obj.lastMove>30){
		startMove(obj, json, fn);
	}
}


function startMove(obj, json, fnEnd)
{
	var nowValue=0;
	var attr='';
	var isFinished=true;	//假设运动已经该停止了
	
	for(attr in json){
		if(attr=='opacity'){
			nowValue=parseInt(100*parseFloat(getStyle(obj, 'opacity')));
		}
		else{
			nowValue=parseInt(getStyle(obj, attr));
		}
		
		if(isNaN(nowValue)){
			nowValue=0;
		}
		
		var speed=(json[attr]-nowValue)/8;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		
		if(parseInt(json[attr])!=nowValue){
			isFinished=false;
		}
		
		if(attr=='opacity'){
			obj.style.filter="alpha(opacity:"+(nowValue+speed)+")";
			obj.style.opacity=(nowValue+speed)/100;
		}
		else{
			obj.style[attr]=nowValue+speed+'px';
		}
	}
	
	if(isFinished){
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnEnd)
		{
			fnEnd();
		}
	}
	
	obj.lastMove=(new Date()).getTime();
}