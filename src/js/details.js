require.config({
	paths : {
		'jquery' : './jquery-3.2.1',
		'http' : './httpclient',
		'xzoom' : './jquery.xZoom'
	}
})

require(['jquery','http','xzoom'],function($,http,xzoom){
	$(function(){
		$('.site-nav').load('header.html');
		$('.tfc_footer').load('footer.html');
	 	var id = (window.location.search);
	 	id = id.slice(1,3);
	 	http.get('src/api/goodslist.php').then(function(res){
	 		// console.log(res);
	 		var r = window.eval(' ('+  res +') ');
	 		console.log(r);
	 		for(var i = 0;i < r.data.length;i++){
	 			// console.log(id);
	 			// console.log(r.data[i].indexid);
	 			if (id == r.data[i].indexid) {
	 				var str = r.data[i];
	 				console.log(str);
	 				var details = window.localStorage.getItem('key');
	 				console.log(details);

	 				$.each(str,function(n,i){
	 					var res = '<div class="conTopLeftBox">' + 
	 								'<div class="preview" id="preview">' +
	 								'<div class="jqzoom"><img src=" '+ str.img +'" id="bigImg">' + '<div>'+
	 								'<div class="spec" id="spec"></div>' +
	 								'<div>'+
	 								'</div>'+
	 								'</div>'
	 					$('.m_div').html(res);
	 				})
	 				
	 				$.each(str,function(n,i){
	 					var res = '<div class="conTopConBox">' +
	 								'<div class="name">' + 
	 								'<h1>'+ str.content +'</h1>' +
	 								'<a href="javascript:;"><strong class="productinfo" id="PromShortDescription">加1元起可换购</strong></a>'+
	 								'</div>' +
	 								'<div class="fahuo-cang" style="height: 18px;"><i></i>母婴之家发货</div>' +
									'<div class="clearfix"><ul id="summary" class="fl clearfix"><li id="summary-price" class="clearfix"><div class="sx_dt pdt5 fl"> 促 销 价 </div><div class="sx_dd fl"><strong class="p-price">￥' + str.price +'</strong></div></li><li id="divpromotionInfo" class="bdbtm clearfix"><div class="sx_dt">促销信息</div><div class="sx_dd" id="QueryPromInfosByProductId"><div class="sale_prom" id="shangeGiftBox"><dl class="salePromotionType"><dt class="dt_icon4"></dt><dd><a href="javascript:;" class="promDetail colorf90">加1元起可换购</a><div class="sp_act" id="sp_act_change"><a href="javascript:;" class="in colorf90">收起<i></i></a></div></dd></dl><div class="promBox" id="shangeGiftBoxIn"><ul class="change_gift" id="shangeGift"></ul></div></div></div></li><li id="choose-version" class="clearfix"><div style="float: left;margin-top: 10px">规格</div><div class="sx_dd" style="margin-left: 20px;"><ul class="size_num"><li><a href="javascript:;">L</a></li><li><a href="javascript:;">M</a></li><li><a href="javascript:;">XL</a></li><li><a href="javascript:;">XXL</a></li></div></div></li><li id="choose-color" class="clearfix"><div class="sx_dt" style="float: left;">颜色</div><div class="sx_dd" style="float: left;"><ul class="size_num" id="color_choose" style="margin-left: 20px"><li><a href="javascript:;">黄</a></li><li><a href="javascript:;">绿</a></li><li><a href="javascript:;">蓝</a></li><li><a href="javascript:;">黑</a></li></ul></div></li></ul>'+
	 								'<div><a href="javascript:;" style="display:block;width:100px;height:50px;line-height:50px;text-align:center;background-color:#f40;" class="m_btn">立即购买</a></div>'
	 								'</div>' 
 					$('.m_div1').html(res);
	 				})
	 			}
	 		}
		 	// console.log($('.jqzoom'),66666);
		 	$('.jqzoom').xZoom({width:350,height:350});
		 	$('.zoom').css('backgroundColor','rgba(0,0,0,0.5)');
		 	$('.zoom').css('position','absolute');
		 	// $('.zoom').css('width','100px');
		 	// $('.zoom').css('height','100px');
	 		
		 	$('.m_btn').click(function(){
		 		var result = window.localStorage.getItem('key');
		 		if(typeof result == 'string'){
		 			result = JSON.parse(result);
		 			let idx;
		 			let has = result.some(function(item,i){
		 				idx = i;
		 				return item.id == id
		 			})	
		 			console.log(has)
						if(!has){
							for(let i=0;i<r.data.length;i++){
								if(r.data[i].indexid == id){
									result.push(r.data[i]);
									window.localStorage.setItem('key',JSON.stringify(result))
								}
							}
						}		 			
		 		}

		 		// window.location.href = 'carlist.html'
		 	})

	 	})


	})
})