require.config({
	paths : {
		'jquery' : './jquery',
		'http' : './httpclient',
	}
})

define(['jquery','http'],function($,http){
	$(function(){
		$('.site-nav').load('header.html');
		$('.tfc_footer').load('footer.html');
		$('.ui-silder-nav').load('nav.html');

		http.get('src/api/goods.php').then(function(res){
			// console.log(res);
			
			// 后端数据生成商品列表=============================================

			var r = window.eval(' ('+  res +') ');

			var str = "";
			if (r.status == true) {
				res = $.map(r.data,function(n,i){
					return str =  '<div class="site-hot-item goods">' +
							'<div class="site-hot-item-fl"><a href="javascript:;"><img src=" '+ n.img +'"></a></div>'+
							'<div class="site-hot-item-fr">' +
							'<h2 class="site-hot-row-two"><a href="javascript:;">' + n.title + '</a></h2>' + 
							'<div class="site-hot-row-three"><span class="product-words">' + n.content + '</p></div>' + 
							'<div class="site-hot-row-four"><div class="fl"><div class="promo-price"><div class="price"></p style="font-size: 32px;"><b style="font-size: 18px;font-weight: bold;vertical-align: 2px;margin-right: 3px">￥</b>' + n.price + '<b style="font-size: 16px;font-weight: bold;vertical-align: 3px;margin-left: 3px">起</b></p></div></div></div>'+
							'<a href="javascript:;" class="viewbtn">点击进入</a>' +
							'</div>' +
							'</div>'
				}).join('</div>');
			}
			$('.hotfloor').append(res);


		})

		// 轮播图
		var mySwiper = new Swiper('.swiper-container',{
			loop : true,
			pagination : {
				el : '.swiper-pagination',
				clickable : true,
			},
			autoplay : {
				delay : 3000,
				disableOnInteraction : false,
			},		
		})
		$(".swiper-wrapper").on("mouseenter",function(){
			mySwiper.autoplay.stop();
		});
		$(".swiper-wrapper").on("mouseleave", function () {
			mySwiper.autoplay.start();
		})


		


	})

})