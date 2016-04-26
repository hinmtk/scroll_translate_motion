var MatrixTest = function(){
	var spMode=false;
}
var winW,
	winH,
	$document= Libs.ie8 ? $(window) : $(document),
	y=$document.scrollTop(),
	contents2Y=$('#content2').offset().top-300,
	addObjFlag=false,
	timer,
	mNum=0,
	sNum=0,
	time=0,
	firstObj=false,
	secondObj=false,
	randomPos1 = [
		{
			x:330,
			y:80
		},
		{
			x:500,
			y:100*6
		},
		{
			x:630,
			y:100*3
		},
		{
			x:235*3,
			y:100*6
		}
	],
	randomPos2 = [
		{
			x:800,
			y:100*7
		},
		{
			x:235*3,
			y:100*4
		},
		{
			x:900,
			y:100*6
		},
		{
			x:300*3,
			y:100*4
		}
	],
	sSmallObjNum,
	mSmallObjNum,
	posY=0,posX=0,
	posYArr=[],
	posXArr=[],
	bgLength=1,
	sSizeObjArr0=[],
	sSizeObjArr1=[],
	sSizeObjArr2=[],
	$sizeL,
	$sizeSArr=[],
	$floatingWrapper=$('#floating-wrapper'),
	$floatingInner=$('.floating-inner'),
	mSmallObjNumArr=[9,10,11],
	sSmallObjNumArr=[8,9],
	$sizeSArr=[],
	opacity=0.01,
	largeSize=false,
	speed=1000,
	backSpeed=3000,
	secondSpeed=2000,
	thirdSpeed=900,
	easing='easeOutExpo',
	backEasing='linear',
	delay=50,
	value=0.018,
	setForHover=true,
	theFirstMouseOver=true;

MatrixTest.prototype = {
	init:function(){

		var self=this;
        winW=$(window).width();
        winH=$(window).height();

		spMode=Libs.checkSP();
		if(!spMode){
			self.render();
		}

	},
	render:function(){

		var self=this;

		self.setPos();
		self.onResize();
		self.setPageTop();
		self.onScroll();
		self.onPagetop();
		self.checkPos();
		self.initScroll();
		self.smoothScroll();

	},
	setPos:function(){

		var self=this;
		var $home=$('#home');

		$home.css('height',winH);

	},
	onResize:function(){

		var self=this;
        $(window).on('resize',function(){

            winW=$(window).width();
            winH=$(window).height();
            self.setPos();

        });
	},
	setPageTop:function(){

		var self=this;
		var $pagetop=$('.pagetop');

		if(y>1200){
			if($pagetop.css('display')=='none'){
				$pagetop.show();
			}
		}else{
			if($pagetop.css('display')=='block'){
				$pagetop.hide();
			}
		}

	},
	onPagetop:function(){

		var $pagetop=$('.pagetop');

		$pagetop.on('click',function(){
			$('html,body').stop().animate({'scrollTop':0},500);
		});

	},
	onScroll:function(){

		var self=this;

		$document.on('scroll', function(){

			y=$document.scrollTop();

			setTimeout(function(){
				self.setPageTop(y);
			},300);
			self.checkPos();

		});

	},
	checkPos:function(){

		var self=this;

		clearTimeout(timer);

	    timer = setTimeout(function(){
			if(y>contents2Y){
				if(!addObjFlag){
					self.addFloatingObj();
				}
			}
	    },500);

	},
	addFloatingObj:function(){

		var self=this;

		addObjFlag=true;

		winW >= 1300 ? largeSize=true : largeSize=false;

		//
		var posRandomNum=~~(Math.random()*randomPos1.length);

		if(winW >= 1300){
			bgLength++;
			opacity=0;
			mSmallObjNumArr=[4,5,6];
		}

		for(var i=0; i<bgLength+1; i++){

			var spanSizeLArr=[];

			if(!largeSize){

				spanSizeLArr +='<span class="size-l floating_bg' + i + ' parent0" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' parent1" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' children" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' children" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' children" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' children" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' children" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' children" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' children" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' children" style="opacity:' +  opacity +'"></span>'+
							'<span class="size-l floating_bg' + i + ' children" style="opacity:' +  opacity +'"></span>';

			}else{
				spanSizeLArr +='<span class="size-l floating_bg' + i + ' parent0" style="opacity:' +  opacity +'"></span>'
			}


			$floatingInner.find('.fi0').append(spanSizeLArr).unbind();

			var className='.floating_bg' + i;
			var $lampClass=$('.fi0').find(className);

			$lampClass.each(function(index){

				 switch ($(this).attr('class').split(' ')[2]){

					 case 'parent0':

					 $(this).css({'z-index':25});
					 break;

					 case 'parent1':

					 $(this).css({'z-index':24});
					 break;

					 case 'children':

					 $(this).css({'z-index':23-$(this).index()});
					 break;

				 }

			});

			var mRandomNum=~~(Math.random()*mSmallObjNumArr.length);
			mSmallObjNum=parseInt(mSmallObjNumArr[mRandomNum]);
			var mSmallClassArr=['line-s','line-l','box-l','box-m','box-s','box-sss','line-ss','white-ss','line-white-ss','line-s'];

			var sRandomNum=~~(Math.random()*sSmallObjNumArr.length);
			sSmallObjNum=parseInt(sSmallObjNumArr[sRandomNum]);
			var sSmallObjNum=sSmallObjNum;
			var sSmallClassArr=['box-ss','box-sss','box-ssss'];
			var spanSizeMArr=[];

			for(var j=0; j<mSmallObjNum; j++){

				var mSmallClass=mSmallClassArr[~~(Math.random()*mSmallClassArr.length)];
				$floatingInner.find('.fi1').append('<span class="size-m'+ i + ' ' + mSmallClass + '"' + ' style="opacity:0"></span>').unbind();

				if(j%2 !=0){
					for(var k=0; k<sSmallObjNum; k++){
						var sSmallClass=sSmallClassArr[~~(Math.random()*sSmallClassArr.length)];
						spanSizeMArr +='<span class="size-s'+ i + j + ' ' + sSmallClass + '"' + ' style="opacity:0"></span>';

					}

				}

			};

			$floatingInner.find('.fi2').append(spanSizeMArr).unbind();

			var $span=$floatingWrapper.find('.size-l');
			switch (i) {
			  case 0:
			  	posX=randomPos1[posRandomNum].x;
				posY=randomPos1[posRandomNum].y;
				break;
			  case 1:
			  	posX=randomPos2[posRandomNum].x;
				posY=randomPos2[posRandomNum].y;
				break;
			}

			posXArr.push(posX);
			posYArr.push(posY);

			$span.css({'top':winH / 2,'left':winW / 2});

		}

		self.showFloatingObj();

	},
	setTargetPosY:function(thisY,maxDisY,minDisY){

		var self=this;

		disY=Math.floor(Math.random() * (maxDisY - minDisY + 1)) + minDisY ;
		angle=Math.floor(Math.random()*360);
		targetY = ~~(thisY+disY * (Math.sin(angle*Math.PI/180)));

		return targetY;

	},
	setTargetPosX:function(thisX,maxDisX,minDisX){

		var self=this;

		disX=Math.floor(Math.random() * (maxDisX - minDisX + 1)) + minDisX ;
		angle=Math.floor(Math.random()*360);
		targetX = ~~(thisX+disX * (Math.cos(angle*Math.PI/180)));

		return targetX;

	},
	showFloatingObj:function(){

		var self=this;
		var $floatingWrapper=$('#floating-wrapper');
		var $floatingInner=$('.floating-inner');

		$floatingWrapper.find('span').each(function(index, element){

			var className=$(this).attr('class');

			if(/size-s/.test(className)){
				var sClassName=className.split(' ')[0];
				var num=sClassName.substring(sClassName.length-2);
				var firstNum=parseInt(num.substr(0,1));
				var lastNum=parseInt(num.substr(1,1));

				$sizeSArr.push($(this));
				$(this).addClass('fi');

				if(firstNum==0){
					sSizeObjArr0.push($(this));
					sSizeObjArr0[sSizeObjArr0.length-1].firstNum=firstNum;
					sSizeObjArr0[sSizeObjArr0.length-1].lastNum=lastNum;
				}else if(firstNum==1){
					sSizeObjArr1.push($(this));
					sSizeObjArr1[sSizeObjArr1.length-1].firstNum=firstNum;
					sSizeObjArr1[sSizeObjArr1.length-1].lastNum=lastNum;
				}else if(firstNum==2){
					sSizeObjArr2.push($(this));

					sSizeObjArr2[sSizeObjArr2.length-1].firstNum=firstNum;
					sSizeObjArr2[sSizeObjArr2.length-1].lastNum=lastNum;
				}
			}

		});

		$('.fi0').find('span.size-l').each(function(index, element) {

			$sizeL=$(this);

			var $span=$floatingWrapper.find('span').eq(index);

				var classNum;
				var $elem=$(this);
				var id=$elem.attr('class').split(' ')[1];
				switch(id){

					case 'floating_bg0':
					classNum=0;
					break;

					case 'floating_bg1':
					classNum=1;
					break;

					case 'floating_bg2':
					classNum=2;
					break;
				}

				$elem.attr('class').split(' ')[2]=='parent0' ? firstObj=true : firstObj=false;
				$elem.attr('class').split(' ')[2]=='parent1' ? secondObj=true : secondObj=false;

				var easing='easeOutCirc';
				var delay=delay*index;
				if(firstObj){
					opacity=0.1
				}else if(secondObj){
					opacity=0.3;
				}else if(!firstObj || !secondObj){
					opacity=1;
				}

				if(classNum==0){

					var top=posYArr[classNum];
					var left=posXArr[classNum];
					var width=$elem.width()*2;
					var height=$elem.height()*2;

					if(firstObj){

						// $(this).delay(delay*index).animate({
						// 	   'top':top,
						// 		'left':left,
						// 		'width':width,
						// 		'height':height,
						// 		'opacity':opacity
						// 		},speed,easing,function(){

						// 		});

						$elem.velocity({
							'top':top,
							'left':left,
							'width':width,
							'height':height,
							'opacity':0.3
						},{
							duration:speed,
							easing:easing,
							delay:delay,
							complete:function(){
							}
						});

					}else{

						// $elem.delay(delay*index).animate(
						// 	{
						// 		'top':top,
						// 		'left':left,
						// 		'width':width,
						// 		'height':height,
						// 		'opacity':0
						// 	},speed,easing,true)
						// 	.animate({'opacity':0},100,function(){

						// 		$(this).remove();
						// 	});

						$elem.velocity({
							'top':top,
							'left':left,
							'width':width,
							'height':height,
							'opacity':0
						},{
							duration:speed,
							easing:easing,
							delay:delay,
							complete:function(){
							}
						}).velocity({'opacity':0},{
							duration:500,
							complete:function(){
								$elem.remove();
							}
						});

					}

				}else if(classNum==1){

					//$sizeL.css({'opacity':0.025});
					var top=posYArr[classNum];
					var left=posXArr[classNum];
					var width=$elem.width()*3;
					var height=$elem.height()*3;

					if(firstObj){

						$elem.velocity({
							'top':top,
							'left':left,
							'width':width,
							'height':height,
							'opacity':0.3
						},{
							duration:speed,
							easing:easing,
							delay:delay
						});

					}else{

						$elem.velocity({
							'top':top,
							'left':left,
							'width':width,
							'height':height,
							'opacity':0
						},{
							duration:speed,
							easing:easing,
							delay:delay
						}).velocity({
							'opacity':0
						},{
							duration:500,
							complete:function(){
								$elem.remove();
							}
						});

					};

				}else if(classNum==2){
					var x=Math.floor(Math.random() * (1400 - 1100)+1100);
					var y=Math.floor(Math.random() * (500 - 200)+200);
					var width=$(this).width()/2;
					var height=$(this).height()/2;

					$elem.velocity({
						'top':y,
						'left':x,
						'width':width,
						'height':height,
						'opacity':opacity
					},{
						duration:speed,
						easing:easing,
						delay:delay
					});

				}

				function showSObj($sizeM,mNum){

					var minDisX=100;
					var maxDisX=600;
					var minDisY=150;
					var maxDisY=600;

					var disY=Math.floor(Math.random() * (maxDisY - minDisY + 1)) + minDisY ;
					var disX=Math.floor(Math.random() * (minDisY - minDisX + 1)) + minDisX ;
					var angle=Math.floor(Math.random()*360);
					var thisX=parseInt($sizeSArr[mNum].css('left').replace('px',''));
					var thisY=parseInt($sizeSArr[mNum].css('top').replace('px',''));
					var targetX = thisX+disX * (Math.cos(angle*Math.PI/180));
					var targetY = thisY+disY * (Math.sin(angle*Math.PI/180));

					while(targetY<0 || winH<targetY){

						targetY=self.setTargetPosY(thisY,maxDisY,minDisY);

					}
					while(targetX<0 || winW<targetX){

						targetX=self.setTargetPosX(thisX,maxDisX,minDisX);
					}
					function animateExceptIE(){

						if($sizeSArr.length==sNum){
							theFirstMouseOver=true;
							setForHover=false;
							self.onMouseMove();
							//self.moveObj();
						}
					}

					$sizeSArr[mNum].velocity({
						'top':targetY,
						'left':targetX,
						'opacity':0.25,
						'width':$sizeSArr[mNum].width()*0.5,
						'height':$sizeSArr[mNum].height()*0.5
					},{
						speed:secondSpeed,
						easing:easing,
						complete:function(){
							sNum++;
							for(var i=$sizeSArr.length-1; i>0; i--){
								if($sizeSArr[i].css('opacity')==0){
									$sizeSArr[i].remove();
									$sizeSArr.splice(i,1);
								}
							}
							animateExceptIE();
						}
					});

					// $sizeSArr[mNum].animate({'top':targetY,
					// 				'left':targetX,
					// 				'opacity':0.25,
					// 				'width':$sizeSArr[mNum].width()*0.5,
					// 				'height':$sizeSArr[mNum].height()*0.5
					// 				},secondSpeed,easing,function(){
					// 					sNum++;

					// 					for(var i=$sizeSArr.length-1; i>0; i--){
					// 						if($sizeSArr[i].css('opacity')==0){
					// 							$sizeSArr[i].remove();
					// 							$sizeSArr.splice(i,1);
					// 						}
					// 					}

					// 					animateExceptIE();

					// 				}).unbind();

					//d.resolve();
				}

				function showMObj($sizeL,index){

					var ly=parseInt($sizeL.css('top').replace('px',''));
					var lx=parseInt($sizeL.css('left').replace('px',''));

					var minDisX=100;
					var maxDisX=600;
					var minDisY=100;
					var maxDisY=600;
					var largeSize=false;
					winW >= 1300 ? largeSize=true : largeSize=false;

					var className=String('.size-m'+index);
					var $spanM=$(className);
					var $allSpanM=[];

					$('.size-m0').each(function(){
						$allSpanM.push($(this));
					})
					$('.size-m1').each(function(){
						$allSpanM.push($(this));
					})
					if(largeSize){
						$('.size-m2').each(function(){
							$allSpanM.push($(this));
						})
					}
					$allSpanM.splice($spanM,1);

					$spanM.each(function(index, element) {
						$(this).addClass('fi');
						var lwidth=$sizeL.width();
						var lheight=$sizeL.height();
						var mx=lx+(lwidth/2)-60-($(this).width() / 2);
						var my=ly+(lheight/2)-60-($(this).height() / 2);

						$(this).css({'top':my,'left':mx});
						var thisX=parseInt($(this).css('left').replace('px',''));
						var thisY=parseInt($(this).css('top').replace('px',''));

						var disY=Math.floor(Math.random() * (maxDisY - minDisY + 1)) + minDisY ;
						var disX=Math.floor(Math.random() * (maxDisX - minDisX + 1)) + minDisX ;
						var angle=Math.floor(Math.random()*360);
						var targetX = thisX+disX * (Math.cos(angle*Math.PI/180));
						var targetY = thisY+disY * (Math.sin(angle*Math.PI/180));
						var addPos=20;

						while( targetX<0 || $(window).width()<targetX){

							targetX=self.setTargetPosX(thisX,maxDisX,minDisX);
						}
						while( targetY<0 || $(window).height()<targetY ){

							targetY=self.setTargetPosY(thisY,maxDisY,minDisY);

						}

						for(var j=0,len=$allSpanM.length; j<len; j++){

							var RectA=$allSpanM[j];
							var RectB=$spanM;

							function setValue(){
								RectA.x=RectA.offset().left-addPos;
								RectA.y=RectA.offset().top-addPos;
								RectA.h=RectA.height()+addPos;
								RectA.w=RectA.width()+addPos;

								RectB.x=targetX;
								RectB.y=targetY;
								RectB.h=RectB.height()+addPos;
								RectB.w=RectB.width()+addPos;
							}

							setValue();

							while(( RectA.x < RectB.x + RectB.w ) &&
								( RectB.x < RectA.x + RectA.w )){

								setValue();
								targetX=self.setTargetPosX(thisX,maxDisX,minDisX);
							}
							while(( RectA.y < RectB.y + RectB.h ) &&
								( RectB.y < RectA.y + RectA.h )){

								setValue();
								targetY=self.setTargetPosY(thisY,maxDisY,minDisY);
							}

						}

						var delay=index*10;

						$(this).velocity({
							'top':targetY,
							'left':targetX,
							'opacity':0.5,
							'width':$(this).width()*0.6,
							'height':$(this).height()*0.6
						},{
							duration:secondSpeed,
							easing:easing,
							delay:delay
						});

						if(index%2 !=0){

							var className=$(this).attr('class').split(' ')[0];
							var mLastNum=$(this).attr('class').split(' ')[0].substr(6,1);
							var mX=targetX;
							var mY=targetY;

							if(mLastNum==0){

								var mIndex=$(this).index('.'+className);

								if(sSizeObjArr0){
									for(var i=0; i<sSizeObjArr0.length; i++){
										if(sSizeObjArr0[i].lastNum==mIndex){
											sSizeObjArr0[i].css({'top':mY,'left':mX});
										}
									}
								}
							}else if(mLastNum==1){

								var mIndex=$(this).index('.'+className);

								if(sSizeObjArr1){
									for(var i=0; i<sSizeObjArr1.length; i++){
										if(sSizeObjArr1[i].lastNum==mIndex){

											sSizeObjArr1[i].css({'top':mY,'left':mX});

										}
									}
								}
							}

						setTimeout(function(){

							showSObj($(this),mNum);
							mNum++;

						},thirdSpeed);

						}

					});

				}

				setTimeout(function(){

						var floatingBg=$('.size-l').eq(index).attr('class').split(' ')[1];
						var parent0=$('.size-l').eq(index).attr('class').split(' ')[2]=='parent0';

						if(parent0 && floatingBg=='floating_bg0'){
							showMObj($('.size-l').eq(index),0);
						}else if(parent0 && floatingBg=='floating_bg1'){
							showMObj($('.size-l').eq(index),1);

						}else if(parent0 && floatingBg=='floating_bg2'){
							showMObj($('.size-l').eq(index),2);

						}

				},speed-500);

				if(index==1)return;

		});

	},
	onMouseMove:function(){

		var $fi=$('.fi0,.fi1,.fi2');
		var speed=300;
		var easing='easeOutQuad';
		var delay=0;
		var moveNow=false;
		var target=$('#navi').find('li');

		var mouseMoveAndMoveObj=$('html').on('mousemove',function(e){


			if(setForHover || e.pageX < 250) return;

			time++;

			if(time%5 !=0) {
			}else{

				var mousePosX=e.screenX;
				var mousePosY=e.screenY;

				$fi.each(function(index, element) {

					var centerX=~~($(window).width() / 2 );
					var centerY=~~($(window).height() / 2 );

					element=$(this);

					function setZIndex(){

						var dep;

						if(/fi0/.test(element.attr('class'))){
							dep=10;
						}else if(/fi0/.test(element.attr('class'))){
							dep=3;
						}else if(/fi0/.test(element.attr('class'))){
							dep=1;
						}else{
							dep=5;
						}

						return dep;
					};
					var zIndex=setZIndex();

					var startingPointX=(parseInt($(this).css('top').replace('px',''))) || 0;
					var startingPointY=(parseInt($(this).css('left').replace('px',''))) || 0;
					var x=~~(mousePosX-centerX);
					var y=~~(centerY-mousePosY);
					var $elem=$(this);

					// $(this).stop().animate({
					// 	'margin-top':- y * zIndex * value,
					// 	'margin-left':x * zIndex * value
					// 	},
					// 	speed,
					// 	easing
					// 	);

					$elem.velocity('stop').velocity({
						'margin-top':- y * zIndex * value,
						'margin-left':x * zIndex * value
					},{
						duration:speed,
						easing:easing
					});

				});

			}

		})

	},
	initScroll:function(){

		var self=this;

        $('html').velocity('scroll',{
        	offset:0
        },0);
	},
	smoothScroll:function(){

		var self=this;

		var overview=document.getElementById("scroll-overview");
		var pageH=$('#scroll-overview').height();
		$('#fake-page-scroll').css('height',pageH);

        var calc = 0;
		var scrollMotion;

		var ease = 0.1;

		var d;
		var r;
		var v;
		var t;
		var s;

		function run(){

			scrollMotion = requestAnimationFrame(run);

			// scrolltop & window.height
			y=$document.scrollTop();

			h = winH;

			// home overview & viewport height
			// overviewHeight = overview.getBoundingClientRect().height;
			// viewportHeight = viewport.getBoundingClientRect().height;

			calc += (y - calc) * ease;

			var t = 'translate3d(0, ' + - calc + 'px, 0)';
			var s = overview.style;
			s["transform"] = t;
			s["webkitTransform"] = t;
			s["mozTransform"] = t;
			s["msTransform"] = t;

		}

		run();

	}

}

$(function(){
	var matrixTest=new MatrixTest();
	matrixTest.init();
});
