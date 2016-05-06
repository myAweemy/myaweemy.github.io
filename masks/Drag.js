function Drag(id){
	var _this =this;
	this.box = document.getElementById(id);

	this.box.onmousedown = function(ev){
		_this.mouseDown(ev);		
	};
}

Drag.prototype.mouseDown = function(ev){
	var _this = this;//定义_this是为了给下面的事件用

	var event = ev || event;
	this.disX = event.clientX - this.box.offsetLeft;
	this.disY = event.clientY - this.box.offsetTop;
	document.onmousemove = function(ev){
		_this.mouseMove(ev);//用_this调用mouseMove函数的原因是_this是个对象，就是这个类，而this则是document，
	};
	document.onmouseup = function(){
		_this.mouseUp();
	};
}

Drag.prototype.mouseMove = function(ev) {
	//alert(this);obj
	var _this = this;
	var event = event||ev;
	console.log(event.clientX);
	var l = event.clientX - this.disX;
	var t = event.clientY - this.disY;
	this.box.style.left = l + 'px';
	this.box.style.top = t + 'px';
}

Drag.prototype.mouseUp = function(){
	document.onmousemove = null;
	document.onmouseup = null;
}