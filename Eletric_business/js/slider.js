window.onload = function(){
	var timer = null;
	var nowZIndex = 1;
	var nowPic = 0;
	var dPlayImages = document.getElementById('playimages');
	var ulBig = getElementsByClassName(dPlayImages,'big_pic')[0];
	var bLis = ulBig.getElementsByTagName('li');
	var sumOfLis = bLis.length;
	var mark_left = getElementsByClassName(ulBig,'mark_left')[0];
	var mark_right = getElementsByClassName(ulBig,'mark_right')[0];
	var prev = getElementsByClassName(ulBig,'prev')[0];
	var next = getElementsByClassName(ulBig,'next')[0];
	var length = getElementsByClassName(ulBig,'length')[0];
	var dSmall = getElementsByClassName(dPlayImages,'small_pic')[0];
	var ulSmall = dSmall.getElementsByTagName('ul')[0];
	ulSmall.style.width = parseInt(getStyle(ulSmall,'width')) * 2 + 'px';
	var sLis = dSmall.getElementsByTagName('li');
	var desciption = getElementsByClassName(dPlayImages,'desciption')[0];
	desciption.innerHTML = sLis[0].getElementsByTagName('img')[0].title;
	var page = getElementsByClassName(dPlayImages,'page')[0];
	page.innerHTML = '1/6' ;

	var dTipsWrap = getElementsByClassName(dPlayImages,'tipsWrap')[0];

	var tips = new Array();
	for (var i = 0; i < bLis.length; i++) {
		var newTip = document.createElement('span');
		newTip.className = 'active';
		tips.push(newTip);
		dTipsWrap.appendChild(newTip);
	}
	var colorOfTips = 'red';
	tips[0].style.backgroundColor = colorOfTips;
	tips = dTipsWrap.getElementsByTagName('span');
	dTipsWrap.style.width = 14 * tips.length + 'px';
	dTipsWrap.style.left = (dPlayImages.offsetWidth - dTipsWrap.offsetWidth)/2 + 'px';
	for (var i = 0; i < sumOfLis; i++) {
		sLis[i].index = i;
		sLis[i].onclick = function(){
			if (nowPic != this.index) {
				nowPic = this.index;
				pageChange();
			}	

			return false;
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
			if (nowPic != this.index) {
				nowPic = this.index;
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

	function pageChange() {
		var widthOfSLis = sLis[0].offsetWidth;
		if (nowPic<0) {
			nowPic = sumOfLis - 1;
		}
		if (nowPic == sumOfLis) {
			nowPic = 0;
		}
		for (var i = 0; i < sumOfLis; i++) {
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
	clearInterval(obj.timer);
	var nowValue = 0 ;
	var speed = 0 ;
	obj.timer = setInterval(function(){
		nowValue = (attr == 'opacity')?Math.round(parseFloat(getStyle(obj,'opacity'))*100):parseInt(getStyle(obj,attr));
		speed = (target>nowValue)?Math.ceil((target-nowValue)/10):Math.floor((target-nowValue)/10);
		nowValue+=speed;
		if (attr == 'opacity') {
			obj.style.filter = 'alpha(opacity:'+ nowValue +')';
			obj.style.opacity = nowValue/100;
		}else{
			obj.style[attr] = nowValue + 'px';
		}
		if (nowValue == target) {
			clearInterval(obj.timer);
		}		
	},30);
}