var speed = 0;
var left = 0;
var ul = document.getElementsByTagName('ul')[0];
var aLi = document.getElementsByTagName('li');
var runner = document.getElementById('runner');
var focus = document.getElementById('focus');
window.onload = function(){

	runner.style.position = 'absolute';

	//转为绝对定位，便于下面的操作
	for (var i = aLi.length - 2; i >= 0; i--) {
		aLi[i].style.left = aLi[i].offsetLeft + 'px';
		aLi[i].style.top = aLi[i].offsetTop + 'px';
	}
	for (var i = aLi.length - 2; i >= 0; i--) {
		aLi[i].style.position = 'absolute';
		aLi[i].style.margin = 0;
	}
	left = parseInt(focus.style.left) - 5;
	//初始化焦点的位置
	runner.style.top = focus.style.top;
	runner.style.left = parseInt(focus.style.left) - 5 + 'px';
	runner.style.width = focus.offsetWidth + 10 + 'px';
	runner.style.height = focus.offsetHeight + 'px';

	//鼠标划过和离开事件的处理
	myHover();
};

function myHover() {//鼠标划过li的处理函数
	for (var i = aLi.length - 2; i >= 0; i--) {
		aLi[i].index = i;
		aLi[i].onmouseover = function(){
				runnerMoveTo(this);
		};
		aLi[i].onmouseout = function(){
				runnerMoveTo(focus);
		};
	}	
}

function runnerMoveTo(obj) {//控制提示条效果位置的移动，参数为相对于移动的参数
	move(runner,parseInt(obj.style.left) - 5);
	runner.style.width = obj.offsetWidth + 10 + 'px';
}

function move(obj,target) {//具体控制弹性运动的函数
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		speed += (target-obj.offsetLeft)/5;//使速度变化，变速运动
		speed*=0.7;
		left+=speed;//speed会有误差，使误差积累到变量left上
		
		if(Math.abs(speed)<1 &&  Math.abs(target - obj.offsetLeft) < 1) //当速度足够小而且距离足够近时，关闭定时器
		{
			obj.offsetLeft = target ;//如果这时候离目标点还有些距离，那么距离必然不会很大，手动移动到目标点即可
			clearInterval(obj.timer);
		}
		else{
			obj.style.left = left + 'px';
		}			
	},30);
}	

//获取非行间样式
function getStyle(elem,attr) {
	if (elem.currentStyle) {
		return elem.currentStyle[attr];
	}else{
		return getComputedStyle(elem,false)[attr];
	}
}

function getElementsByClassName(from,cName) {
	var result = new Array();
	var all = from.getElementsByTagName('*');
	for (var i = 0; i < all.length; i++) {
		if(all[i].className == cName){
			result.push(all[i]);
		}
	}
	return result;
}

//属性渐变控制函数
function changeTo(obj,attr,target,fn) {
	clearInterval(obj.timer);//先将以前的定时器关闭，否则每调用一次这个函数就会增加一个定时器，元素的动画效果变化越来越快
	var nowValue = 0 ;
	var speed = 0 ;
	obj.timer = setInterval(function(){
		//处理不透明度的方法中要四舍五入，便于后面使用
		nowValue = (attr == 'opacity')?Math.round(parseFloat(getStyle(obj,'opacity'))*100):parseInt(getStyle(obj,attr));
		speed = (target>nowValue)?Math.ceil((target-nowValue)/10):Math.floor((target-nowValue)/10);//speed值为负时注意向下取整
		nowValue+=speed;
		if (attr == 'opacity') {//
			obj.style.filter = 'alpha(opacity:'+ nowValue +')';
			obj.style.opacity = nowValue/100;//非ie设置透明度方法
		}else{
			obj.style[attr] = nowValue + 'px';//变量做参数用方括号括起来，点号“.”调用不生效
		}
		if (nowValue == target) {//判断是否到目标值，若到了关闭定时器
			clearInterval(obj.timer);
			if(fn) fn();
		}		
	},30);
}