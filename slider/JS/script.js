window.onload = function(){
	var timer = null;
	var nowZIndex = 1;
	var nowPic = 0;//当前图片索引
	var dPlayImages = document.getElementById('playimages');
	var ulBig = getElementsByClassName(dPlayImages,'big_pic')[0];
	var bLis = ulBig.getElementsByTagName('li');
	var sumOfLis = bLis.length;//图片数量
	var mark_left = getElementsByClassName(ulBig,'mark_left')[0];
	var mark_right = getElementsByClassName(ulBig,'mark_right')[0];
	var prev = getElementsByClassName(ulBig,'prev')[0];
	var next = getElementsByClassName(ulBig,'next')[0];
	var length = getElementsByClassName(ulBig,'length')[0];
	var dSmall = getElementsByClassName(dPlayImages,'small_pic')[0];
	var ulSmall = dSmall.getElementsByTagName('ul')[0];
	ulSmall.style.width = parseInt(getStyle(ulSmall,'width')) * 2 + 'px';//增长小图包裹框的宽度，让浮动起作用，让效果出来
	var sLis = dSmall.getElementsByTagName('li');
	var desciption = getElementsByClassName(dPlayImages,'desciption')[0];//图片描述性文字
	desciption.innerHTML = sLis[0].getElementsByTagName('img')[0].title;
	var page = getElementsByClassName(dPlayImages,'page')[0];//图片页码
	page.innerHTML = '1/6' ;

	var dTipsWrap = getElementsByClassName(dPlayImages,'tipsWrap')[0];
/*动态的根据图片数量来生成tips，就不用手动添加,有利于分离结构与表现*/
	var tips = new Array();
	for (var i = 0; i < bLis.length; i++) {
		var newTip = document.createElement('span');
		newTip.className = 'active';
		tips.push(newTip);
		dTipsWrap.appendChild(newTip);
	}
	var colorOfTips = 'red';//定义tips active时的颜色
	tips[0].style.backgroundColor = colorOfTips;//页面开始时将第一个tip点亮
	//var tips = dTipsWrap.getElementsByTagName('span');
	dTipsWrap.style.width = 14 * tips.length + 'px';//tips的包裹框的宽度，由他们的数量决定
	dTipsWrap.style.left = (dPlayImages.offsetWidth - dTipsWrap.offsetWidth)/2 + 'px';//tips的包裹框的位置，位于中间位置
	for (var i = 0; i < sumOfLis; i++) {//定义预览图事件
		sLis[i].index = i;
		sLis[i].onclick = function(){
			if (nowPic != this.index) {//只有当当前图片不是现在点击的图片时才运行一下代码，避免二次刷新
				nowPic = this.index;//点击时，当前图片换为这一张
				pageChange();
			}	

			return false;//禁止默认的点击事件，不然就跳转到链接里了，起不到切换图片的作用了
		};
		sLis[i].onmouseover = function(){
			changeTo(this,'opacity',100);
		};
		sLis[i].onmouseout = function(){
			if (this.index != nowPic) {
				changeTo(this,'opacity',60);
			}
		};
	}
	for (var i = 0; i < tips.length; i++) {
		tips[i].index = i;
		tips[i].onmouseover = function(){
			for (var i = 0; i < tips.length; i++) {
				tips[i].style.backgroundColor = '';
			}
			if (nowPic != this.index) {//只有当当前图片不是现在点击的图片时才运行一下代码，避免二次刷新
				nowPic = this.index;//点击时，当前图片换为这一张
				pageChange();
			}	
			this.style.backgroundColor = colorOfTips;
		};
		tips[i].onmouseout = function(){
			if (nowPic != this.index) {
				this.style.backgroundColor = '';
			}
		};
	}

	function pageChange() {//切换页面的主函数，根据索引nowPic来切换
		var widthOfSLis = sLis[0].offsetWidth;
		if (nowPic<0) {
			nowPic = sumOfLis - 1;
		}
		if (nowPic == sumOfLis) {
			nowPic = 0;
		}
		for (var i = 0; i < sumOfLis; i++) {//所有样式置为默认，下面将样式设置为active的样式
			changeTo(sLis[i],'opacity',60);
			tips[i].style.backgroundColor = '';
		}
		changeTo(sLis[nowPic],'opacity',100);
		//小图区变换位置
		if (nowPic > 1 && nowPic < sumOfLis-1) {
			changeTo(ulSmall,'left',-(widthOfSLis * (nowPic-1)));
		}
		else if(nowPic < 2)
		{
			changeTo(ulSmall,'left',0);
		}
		else if(nowPic > sumOfLis-3 )
		{
			changeTo(ulSmall,'left',-(widthOfSLis * (sumOfLis-3)));
		}
		//大图区换图片
		bLis[nowPic].style.height = 0;
		bLis[nowPic].style.zIndex = nowZIndex++;
		changeTo(bLis[nowPic],'height',ulBig.offsetHeight);
		//tips变换样式
		tips[nowPic].style.backgroundColor = colorOfTips;
		//中间的描述性文字
		desciption.innerHTML = sLis[nowPic].getElementsByTagName('img')[0].title;
		page.innerHTML = nowPic+1 +'/6' ;
	}
	next.onclick = function(){
		nowPic++;
		pageChange();
	};
	prev.onclick = function(){
		nowPic--;
		pageChange();
	};
	//mark-right和mark-left的层级太高，点击不到图片，所以要在这上面来换个思路处理图片的点击事件
	mark_right.onclick = mark_left.onclick = function () {
		window.open(sLis[nowPic].getElementsByTagName('a')[0].href);
	}

	mark_left.onmouseover = prev.onmouseover = function(){
		changeTo(prev,'opacity',90);
	};
	mark_right.onmouseover = next.onmouseover = function(){
		changeTo(next,'opacity',90);
	};
	prev.onmouseout = mark_left.onmouseout = function(){
		changeTo(prev,'opacity',0);
	};
	next.onmouseout = mark_right.onmouseout = function(){
		changeTo(next,'opacity',0);
	};
	dTipsWrap.onmouseover = dPlayImages.onmouseover = function(){
		clearInterval(timer);
	};
	dPlayImages.onmouseout = function(){
		timer = setInterval(next.onclick,3000);
	};
	timer = setInterval(next.onclick,3000);
};	
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

function changeTo(obj,attr,target) {
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
		}		
	},30);
}