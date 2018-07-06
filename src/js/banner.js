// require.config({
// 	paths : {
// 		'jquery' : './jquery.js',
// 	}
// })

// define(['jquery'],function($){
	
// 	options = {
// 			span : $('.btnArea>span'),
// 			width : $('.imgArea>li'),
// 			ul : $('.imgArea'),
// 	};

// 	$(function(){
// 		$.fn.banner = function (options){

// 			var refresh = function(){
// 				//获取小按钮
// 		        var $oLi = options.span;
// 		        //获取图片的宽度
// 		        var imgW = options.width.width();
// 		         //默认第一个小按钮是活动
// 	        	$($oLi[0]).addClass("current");
// 	        	//点击小按钮，图片移动，并给小按钮设置背景颜色
// 		        $oLi.on("click", function () {
// 		            //将活动的小按钮添加一个类
// 		            $(this).addClass("current").siblings().removeClass("current");
// 		            //获取索引
// 		            var num = $(this).index();
// 		            $(options.ul).animate({
// 		                left: -num * imgW + "px"
// 		            }, 300);
// 		        });
// 		        //循环播放
// 		        var timeId = setInterval(function () {
// 		            //判断小按钮中哪个按钮是活动的
// 		            var num;
// 		            $oLi.each(function () {
// 		                //将ul向右移动
// 		                if($(this).hasClass("current")) {
// 		                    //得到活动的索引,然后加1
// 		                    num = $(this).index() + 1;
// 		                    //让图片移动
// 		                    // console.log(num);
// 		                    $(options.ul).animate({
// 		                        left: -num * imgW + "px"
// 		                    }, 300);
// 		                    //到达最后一张，让ul从头开始
// 		                    if(num== $oLi.length) {
// 		                        $("#imgs").animate({
// 		                            left: "0px"
// 		                        }, 0);
// 		                        num = 0;
// 		                    }
// 		                }
// 		            });
// 		            //小按钮的背景色相应的改变
// 		            $($oLi[num]).addClass("current").siblings().removeClass("current");
// 		        }, 2000);
// 			}

// 			refresh();




// 		}
// 	})
// })
