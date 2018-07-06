require.config({
	paths : {
		'jquery' : './jquery',
		'http' : './httpclient',
	}
})

require(['jquery','http'],function($,http){
	$(function(){
		$('.site-nav').load('header.html');
		$('.tfc_footer').load('footer.html');

		
		function render(){
					var data1 = window.localStorage.getItem('key') || [];

					// localStorage生成数据
					if (data1 !== null && typeof data1 == 'string') {
						data1 = JSON.parse(data1)
						$('#top_shoppingcartInfo').html('');
						list = $.map(data1,function(n,i){
							return	'<ul id="ulSC">' + 
								'<li data-id="'+ i +'" class="m_li">' + 
								'<a><img src='+ n.img +' class="m_img"></a>'+
								'<a href="javascript:;" class="drop2">' + n.title +'</a>' +
								'<span class="m_span"><div><em>X'+ n.qty + '</em><a href="javascript:;" class="delete">删除</a></div><strong class="m_price">' + n.price + '</strong></span>'
								'<a class="del">删除</a>' +
								'<p>共<i><span class="total"></span></i>件商品,共<strong class="total_price"></strong><br /><a href="javascript:;" class="m_a">立即结算</a></p>'
								'<ul>'
						}).join('</ul>')
						$('.m_ul').html(list);
					}
				}

		
		http.get('src/api/goodslist.php').then(function(res){
			var arr = [];
			var r = window.eval(' ('+  res +') ');
			console.log(r.data);
			arr = r;
			var str = "";
			if (r.status == true) {
				res = $.map(arr.data,function(n,i){
					return str = '<li data-item = '+ i +' class="w_li" style="position=relative"><div style="width:197px;height:200px;position:absolute"></div>' +
								'<dl>' + 
								'<dt>' + 
								'<a href="javascript:;"><img src="'+ n.img +'" style="width:160px"></a>' +	
								'</dt>' +
								'<dd>' +
								'<p class="goods_name"><a>' + n.content + '</a>' + 
								'<p>' + n.date +'</p>' +
								'<p class="price_wrap"><span class="price_now">￥<span>'+ n.price +'<span style="display:none">1</span></span></span>'+
								'<p><span class="btn_m btn_m_o"><a href="javascript:;" class="join">加入购物车</a></span><span class="btn_m btn_m_g"><a href="javascript:;">收藏</a></span></p>' +
								'</dd>'+
								'</dt>' + 
								'</dl>' +
								'</li>'
				}).join('</li>')
			}
			$('.goods_list').append(res);
			
            // =========================价格由低到高======================
			$('.price').click(function(){
				$('.goods_list').html('');
				http.get('src/api/goodslist.php',{order:'a'}).then(function(res){
					var s = window.eval(' ('+  res +') ');
					arr = s;
					m = $.map(arr.data,function(n,i){
						return str = '<li data-item = '+ i +' class="w_li" style="position=relative"><div style="width:197px;height:200px;position:absolute"></div>' +
								'<dl>' + 
								'<dt>' + 
								'<a href="javascript:;"><img src="'+ n.img +'" style="width:160px"></a>' +	
								'</dt>' +
								'<dd>' +
								'<p class="goods_name"><a>' + n.content + '</a>' + 
								'<p>' + n.date +'</p>' +
								'<p class="price_wrap"><span class="price_now">￥<span>'+ n.price +'<span style="display:none">1</span></span></span>'+
								'<p><span class="btn_m btn_m_o"><a href="javascript:;" class="join">加入购物车</a></span><span class="btn_m btn_m_g"><a href="javascript:;">收藏</a></span></p>' +
								'</dd>'+
								'</dt>' + 
								'</dl>' +
								'</li>'
					}).join('</li>')
					$('.goods_list').append(m);
				})
			})
			
			// ========================价格由高到低=================
			// $('.price').click(function(){
			// 	$('.goods_list').html('');
			// 	http.get('src/api/goodslist.php',{order:'p'}).then(function(res){
			// 		var s = window.eval(' ('+  res +') ');
			// 		arr = s;
			// 		m = $.map(arr.data,function(n,i){
			// 			return str = '<li>' +
			// 					'<dl>' + 
			// 					'<dt>' + 
			// 					'<a href="javascript:;"><img src="'+ n.img +'"></a>' +	
			// 					'</dt>' +
			// 					'<dd>' +
			// 					'<p class="goods_name"><a>' + n.content + '</a>' + 
			// 					'<p>' + n.date +'</p>' +
			// 					'<p class="price_wrap"><span class="price_now">￥<span>'+ n.price +'</span></span>'+
			// 					'<p><span class="btn_m btn_m_o"><a href="javascript:;" class="join">加入购物车</a></span><span class="btn_m btn_m_g"><a href="javascript:;">收藏</a></span></p>' +
			// 					'</dd>'+
			// 					'</dt>' + 
			// 					'</dl>' +
			// 					'</li>'
			// 		}).join('</li>')
			// 		$('.goods_list').append(m);
			// 	})
			// })


			// ========================日期最新排起=================
			$('.date').click(function(){
				$('.goods_list').html('');
				http.get('src/api/goodslist.php',{order:'m'}).then(function(res){
					var g = window.eval(' ('+  res +') ');
					arr = g;
					g = $.map(arr.data,function(n,i){
						return str = '<li data-item = '+ i +' class="w_li" style="position=relative"><div style="width:197px;height:200px;position:absolute"></div>' +
								'<dl>' + 
								'<dt>' + 
								'<a href="javascript:;"><img src="'+ n.img +'" style="width:160px"></a>' +	
								'</dt>' +
								'<dd>' +
								'<p class="goods_name"><a>' + n.content + '</a>' + 
								'<p>' + n.date +'</p>' +
								'<p class="price_wrap"><span class="price_now">￥<span>'+ n.price +'<span style="display:none">1</span></span></span>'+
								'<p><span class="btn_m btn_m_o"><a href="javascript:;" class="join">加入购物车</a></span><span class="btn_m btn_m_g"><a href="javascript:;">收藏</a></span></p>' +
								'</dd>'+
								'</dt>' + 
								'</dl>' +
								'</li>'
					}).join('</li>')
					$('.goods_list').append(g);
				})
			})



			$('.multiple').click(function(){
				$('.goods_list').html('');
				http.get('src/api/goodslist.php').then(function(res){
					var r = window.eval(' ('+  res +') ');
					arr = r;
					res = $.map(arr.data,function(n,i){
						return str = '<li data-item = '+ i +' class="w_li" style="position=relative"><div style="width:197px;height:200px;position:absolute"></div>' +
								'<dl>' + 
								'<dt>' + 
								'<a href="javascript:;"><img src="'+ n.img +'" style="width:160px"></a>' +	
								'</dt>' +
								'<dd>' +
								'<p class="goods_name"><a>' + n.content + '</a>' + 
								'<p>' + n.date +'</p>' +
								'<p class="price_wrap"><span class="price_now">￥<span>'+ n.price +'<span style="display:none">1</span></span></span>'+
								'<p><span class="btn_m btn_m_o"><a href="javascript:;" class="join">加入购物车</a></span><span class="btn_m btn_m_g"><a href="javascript:;">收藏</a></span></p>' +
								'</dd>'+
								'</dt>' + 
								'</dl>' +
								'</li>'
					}).join('</li>')
					$('.goods_list').append(res);
				})
			})

			// var temp = localStorage.setItem('key', JSON.stringify(r.data));
			// console.log(temp);



			var data = window.localStorage.getItem('key') || [];
			console.log(typeof data);
			if(typeof data == 'string'){
			data = JSON.parse(data);
				console.log(data)
				
			}


			$('.join').click(function(e){
				var id = $(this.parentNode.parentNode.parentNode.parentNode.parentNode).attr('data-item');
				var li = this.parentNode.parentNode.parentNode.parentNode.parentNode;
				var img = this.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0];
				var title = this.parentNode.parentNode.parentNode.children[0].children[0];
				var date = this.parentNode.parentNode.parentNode.children[1];
				var price = this.parentNode.parentNode.parentNode.children[2].children[0].children[0];
				var qty = this.parentNode.parentNode.parentNode.children[2].children[0].children[0].children[0];
				var idx;
				var has = data.some(function(item,i){
					idx = i
					return item.id == id
				})
				// var has = data.some(function(item,i){
				// 	idx = i
				// 	return item.id == id
				// })
				console.log(has)
				if (has) {
					var num = window.localStorage.getItem('key');
					// num = JSON.parse(num);
					var result = $.map(num,function(n,i){
						return n.qty*1 + 1;

					})
					console.log(result[1]);
				}else{
					var goodslist = {

						id : $(li).attr('data-item'),
						img : $(img).attr('src'),
						title : title.innerText,
						date : date.innerText,
						price : price.innerText,
						qty : qty.innerText,
					}

					data.push(goodslist);
					// data = JSON.stringify(data);
					 // data = JSON.parse(data);
					console.log(data);
				}
				
				var storage = window.localStorage.setItem('key',JSON.stringify(data));

				console.log(storage);

				// $('.icon-shopping-amount').innerText++;




				

				render();

			})


			// $('.w_li').click(function(e){
			// 	var id = $('.w_li').attr('data-item');
			// 	console.log(id);
			// 	var index = window.localStorage.getItem('key','indexid');
			// 	index = JSON.parse(index);
			// 	console.log(index);	

			// })

			var data1 = window.localStorage.getItem('key') || [];
				// data1 = data1.push(JSON.stringify(data));
			
				// data1 = JSON.parse(data1);
				// console.log(data1);
				// $('.icon-shopping-amount').html(data1.length);

				// localStorage生成数据
				if (data1 !== null && typeof data1 == 'string') {
					data1 = JSON.parse(data1)
					
					$('#top_shoppingcartInfo').html('');
					list = $.map(data1,function(n,i){
						return	'<ul id="ulSC">' + 
							'<li data-id=" ' + n.id +'" class="m_li">' + 
							'<a><img src='+ n.img +' class="m_img"></a>'+
							'<a href="javascript:;" class="drop2">' + n.title +'</a>' +
							'<span class="m_span"><div><em>X'+ n.qty + '</em><a href="javascript:;" class="delete">删除</a></div><strong class="m_price"> ' + n.price + '</strong></span>'
							'<a class="del">删除</a>' +
							'<p>共<i><span class="total"></span></i>件商品,共<strong class="total_price"></strong><br /><a href="javascript:;" class="m_a">立即结算</a></p>'
							'<ul>'
					}).join('</ul>')
					$('.m_ul').html(list);
				}
				// $('.total').html(data1.length);

				// var price = $('.m_price');
				// console.log(price);
				// var sum = 0;
				// // $.each($('.m_price'),function(){
				// // 	console.log(this.value)
				// // })
				// for(var i = 0;i < price.length;i ++){
				// 	console.log(price.eq(i).html());
				// 	// sum += +price.eq(i).value;
				// }
				// console.log(sum);

				var del = $('.delete');

				del.click(function(e){
					console.log(999)
					var target = $(event.target);
					var li = this.parentNode.parentNode.parentNode;
					var id1 = $(this.parentNode.parentNode.parentNode).attr('data-id');
					var str = window.localStorage.getItem('key','indexid');
					str = JSON.parse(str);
					// console.log(str);
					var idx; 
					//
					for(var i = 0;i < str.length;i ++){
						// console.log(parseInt(id1) == parseInt(str[i].id));
						// console.log(str[i].id);
						if (parseInt(id1) == parseInt(str[i].id)) {
							console.log(12314);
							str.splice(i,1);
							console.log(str);
							window.localStorage.setItem('key',JSON.stringify(str));
						}
					}

					render();	
				})

				// console.log($('.goods_list'));

				$('.goods_list').click(function(e){
					console.log(1234);
					if (e.target.parentNode.tagName == 'LI') {
						var li_id = $(e.target.parentNode).attr('data-item');
						console.log(li_id);
						window.location.href = 'details.html?'+li_id;	
					}
				})



		})
			
		

	})
})