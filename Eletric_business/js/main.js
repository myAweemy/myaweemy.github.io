$(function (){
	
	(function (){// 切换搜索框
		var aLi = $('#menu li');
		var keyWord = $('#searchBox').find('.form .key-word');
		var textArray = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		var nowIndex = 0;		
		keyWord.val(textArray[nowIndex]);		
		aLi.each(function ( index ){
			$(this).click(function (){
				aLi.attr('class', 'gradient');
				$(this).attr('class', 'active');				
				nowIndex = index;				
				keyWord.val(textArray[nowIndex]);
			});
		});
		
		keyWord.focus(function (){
			if( $(this).val() == textArray[nowIndex] ) {
				$(this).val('');
			}
		});
		keyWord.blur(function (){
			if( $(this).val() == '' ) {
				keyWord.val(textArray[nowIndex]);
			}
		});
	})();
		
	(function (){// update文字弹性滚动
		var oDiv = $('.update');
		var oUl = oDiv.find('ul');
		var height = 0;
		var arrData = [
			{ 'name':'萱萱', 'time':1, 'title':'那些灿烂华美的瞬间', 'url':'#' },
			{ 'name':'猴猴', 'time':2, 'title':'广东3天抓获涉黄疑犯', 'url':'#' },
			{ 'name':'猴猴', 'time':3, 'title':'那些灿烂华美的瞬间', 'url':'#' },
			{ 'name':'畅畅', 'time':4, 'title':'广东3天抓获涉黄疑犯', 'url':'#' },
		];
		var str = '';
		var oBtnUp = $('#next-btn');
		var oBtnDown = $('#prev-btn');
		var nowIndex = 0;
		var timer = null;
		
		for ( var i=0; i<arrData.length; i++ ) {
			str += '<li><a href="'+ arrData[i].url +'"><strong>'+ arrData[i].name +'</strong> <span>'+ arrData[i].time +'分钟前</span> 写了一篇新文章：'+ arrData[i].title +'…</a></li>';
		}
		oUl.html(str);
		
		height = oUl.find('li').height();

		oBtnUp.click(function (){
			doMove(-1);
		});
		oBtnDown.click(function (){
			doMove(1);
		});
		
		oDiv.hover(function (){
			clearInterval( timer );
		}, autoPlay);
		
		function autoPlay() {
			timer = setInterval(function () {
				doMove(-1);
			}, 3500);
		}
		autoPlay();
		
		function doMove(num) {
			nowIndex += num;
			if ( Math.abs(nowIndex) > arrData.length-1 ) {
				nowIndex = 0;
			}
			if ( nowIndex > 0 ) {
				nowIndex = -(arrData.length-1);
			}
			oUl.stop().animate({ 'top': height*nowIndex }, 1000);
		}
	})();
	
	(function (){//选项卡切换
		
		fnTab( $('.tabNav1'), $('.tabCon1'), 'click' );
		fnTab( $('.tabNav2'), $('.tabCon2'), 'click' );
		fnTab( $('.tabNav3'), $('.tabCon3'), 'mouseover' );
		fnTab( $('.tabNav4'), $('.tabCon4'), 'mouseover' );
		
		function fnTab( oNav, aCon, sEvent ) {
			var aElem = oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function (index){				
				$(this).on(sEvent, function (){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class', 'triangle-down-gray');
					$(this).find('a').attr('class', 'triangle-down-red');					
					aCon.hide().eq( index ).show();
				});				
			});
		}
	})();
	
	(function (){// vertical slider
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		var nowIndex = 0;
		var timer = null;
		
		fnFade();		
		aOlLi.click(function (){
			nowIndex = $(this).index();
			fnFade();
		});
		oDiv.hover(function (){ clearInterval(timer); }, autoPlay);
		
		function autoPlay() {
			timer = setInterval(function () {
				nowIndex++;
				nowIndex%=arr.length;
				fnFade();
			}, 2000);
		}
		autoPlay();		
		function fnFade() {
			aUlLi.each(function (i){
				if ( i != nowIndex ) {
					aUlLi.eq(i).fadeOut().css('zIndex', 1);
					aOlLi.eq(i).removeClass('active');
				} else {
					aUlLi.eq(i).fadeIn().css('zIndex', 2);
					aOlLi.eq(i).addClass('active');
				}
			});
			oP.text(arr[nowIndex]);
		}
	})();
	
	(function (){//日历
		var aSpan = $('.calendar h3 span');
		var aImg = $('.calendar .img');
		var oPrompt = $('.subject-today');
		var oImg = oPrompt.find('img');
		var oStrong = oPrompt.find('strong');
		var oP = oPrompt.find('p');
		
		aImg.hover(function (){
			var iTop = $(this).parent().position().top - 30;
			var iLeft = $(this).parent().position().left + 55;
			var index = $(this).parent().index()%aSpan.size();

			oPrompt.show().css({ 'left': iLeft, 'top': iTop });
			oP.text($(this).attr('info'));
			oImg.attr('src', $(this).attr('src'));
			oStrong.text( aSpan.eq(index).text() );
		}, function (){
			oPrompt.hide();
		});
	})();
	
	(function (){// BBS高亮显示
		$('.bbs ol li').mouseover(function (){
			$('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active');
		});
	})();
	
	(function (){// HOT鼠标提示效果
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		$('.hot-area li').mouseover(function (){		
			if ( $(this).index() == 0 ) return;
			$('.hot-area li p').remove();		
			$(this).append('<p style="width:'+ ($(this).width()-12) +'px; height:'+ ($(this).height()-12) +'px;">'+ arr[$(this).index()] +'</p>');
		});
	})();
});