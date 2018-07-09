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
		$('.ui-silder-nav').load('nav.html');	

		let result = window.localStorage.getItem('key');
		read();
		

		// ==========================localStorage生成数据函数======================
		function render(){
			var data1 = window.localStorage.getItem('key') || [];

			// localStorage生成数据
			if (data1 !== null && typeof data1 == 'string') {
				data1 = JSON.parse(data1)
				$('#top_shoppingcartInfo').html('');
				list = $.map(data1,function(n,i){
					return	'<ul id="ulSC">' + 
						'<li data-id="'+ n.id +'" class="m_li">' + 
						'<a><img src='+ n.img +' class="m_img"></a>'+
						'<a href="javascript:;" class="drop2">' + n.title +'</a>' +
						'<span class="m_span"><div><em>X'+ '<span class="m_qty">' + n.qty +'</span>'+ '</em><a href="javascript:;" class="delete">删除</a></div><strong class="m_price">' + n.price + '</strong></span>'
						'<a class="del">删除</a>' +
						'<p>共<i><span class="total"></span></i>件商品,共<strong class="total_price"></strong><br /><a href="javascript:;" class="m_a">立即结算</a></p>'
						'<ul>'
				}).join('</ul>')
				$('.m_ul').html(list);
			}

		}
		// =====================================跳转到购物车=======================
		



		// ==================================点击固定栏购物车读取localstorage数据===================	
		 function read(){
		    let data = window.localStorage.getItem('key') || [];
		    let list = document.querySelector('.slideBarCart-box');
		    let maylike = document.querySelector('.mayLike');
		    if (data !== null && typeof data == 'string') {
		    	var len = JSON.parse(localStorage.getItem('key')).length;
				$('#top_gwc_saleQty_out').html(len);
				$('.total').html(len)-1;
				$('#cartSlideNum').html(len)-1;
	    		data = JSON.parse(data);
		        list.innerHTML = data.map(function(item,i){
		            maylike.innerHTML = '';
		            return '<li data-m="'+ item.id +'"><div class="cart-level-c brand_scroll" style=" overflow-y: auto;">'+
		                    '<div id="cart-level-plist">'+
		                    '<div class="cart-level-plist">'+
		                    '<div class="cart-level-img"><a href="javascript:;"><img src="'+ item.img +'" width="46";height="46"></a></div>'+
		                    '<div class="cart-level-intro"><a href="javascript:;">'+ item.title +'</a><div class="cart-level-act"><strong class="cart-level-price">￥'+ item.price +'</strong><em class="cart-level-num">x <span class="car_qty">1</span></em><a href="javascript:;" class="cart-level-del">删除</a></div></div>'+
		                    '</div>'+
		                   	'</div>'+
		                    '</div>'+
		                    '<div class="cart-level-all">'+
		                    '<div class="cart-level-fl">共计￥<span class="mcart-p-price"><strong class="class="f20""></strong></span></div><a href="carlist.html" class="cart-level-fr">去购物车结算</a>'+
		                    '</div></li>'
		        }).join(' ');
		    }
		   	let car = $('.slideBarCart-box');
		   	car.click(function(e){
		   		let $this = e.target;
		   		console.log($this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
		   		var id2 = $($this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode).attr('data-m');
		   		var str = window.localStorage.getItem('key','indexid');
				str = JSON.parse(str);
				for(var i = 0;i < str.length;i ++){
					if (parseInt(id2) == parseInt(str[i].id)) {
						str.splice(i,1);
						window.localStorage.setItem('key',JSON.stringify(str));
						list.innerHTML = str.map(function(item,i){
				            maylike.innerHTML = '';
				            return '<li data-m="'+ item.id +'"><div class="cart-level-c brand_scroll" style=" overflow-y: auto;">'+
				                    '<div id="cart-level-plist">'+
				                    '<div class="cart-level-plist">'+
				                    '<div class="cart-level-img"><a href="javascript:;"><img src="'+ item.img +'" width="46";height="46"></a></div>'+
				                    '<div class="cart-level-intro"><a href="javascript:;">${item.title}</a><div class="cart-level-act"><strong class="cart-level-price">￥'+ item.price +'</strong><em class="cart-level-num">x1</em><a href="javascript:;" class="cart-level-del">删除</a></div></div>'+
				                    '</div>'+
				                   	'</div>'+
				                    '</div>'+
				                    '<div class="cart-level-all">'+
				                    '<div class="cart-level-fl">共计￥<span class="mcart-p-price"><strong class="class="f20""></strong></span></div><a href="carlist.html" class="cart-level-fr">去购物车结算</a>'+
				                    '</div></li>'
				        }).join(' ');
					}
				}
		   	})

	    	
		   	del();
	    }

		// ========================================分页函数==========================
		function current(){
			$('.current').click(function(){
				http.get('src/api/goodslist.php',{page:$(this).html(),qty:12}).then(function(res){
					var html = '';
					$('.goods_list').html(html);
					var arr = [];
					var r = window.eval(' ('+  res +') ');
					// console.log(r.data);
					arr = r.data;
					let page_num = Math.ceil(JSON.parse(JSON.parse(res).total).length/arr.length);
					var str = "";	
					res = $.map(arr,function(n,i){
						return str = '<li data-item = '+ n.indexid +' class="w_li" style="position=relative"><div style="width:197px;height:200px;position:absolute"></div>' +
									'<dl>' + 
									'<dt>' + 
									'<a href="javascript:;"><img src="'+ n.img +'" style="width:160px;height:160px"></a>' +	
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
					join();
					del();
				});
			})

		}


		// ================================点击删除localstorage函数================================


			function del(){
			var del = $('.delete');
				$('.wfc_gwc_blk').click(function(e){
					if(e.target.className == "delete"){
						var len = JSON.parse(localStorage.getItem('key')).length;
						$('#top_gwc_saleQty_out').html(len);
						$('.total').html(len)-1;
						$('#cartSlideNum').html(len)-1;
						let $this = e.target;
						console.log($($this.parentNode.parentNode.parentNode).attr('data-id'));
						let id1 = $($this.parentNode.parentNode.parentNode).attr('data-id');
						var str = window.localStorage.getItem('key','indexid');
						str = JSON.parse(str);
						for(var i = 0;i < str.length;i ++){
							// console.log(parseInt(id1) == parseInt(str[i].id));
							console.log(str[i].id);
							if (parseInt(id1) == parseInt(str[i].id)) {
								str.splice(i,1);
								window.localStorage.setItem('key',JSON.stringify(str));
								list = $.map(str,function(n,i){
								return	'<ul id="ulSC">' + 
										'<li data-id="'+ n.id +'" class="m_li">' + 
										'<a><img src='+ n.img +' class="m_img"></a>'+
										'<a href="javascript:;" class="drop2">' + n.title +'</a>' +
										'<span class="m_span"><div><em>X'+ '<span class="m_qty">' + n.qty +'</span>'+ '</em><a href="javascript:;" class="delete">删除</a></div><strong class="m_price">' + n.price + '</strong></span>'
										'<a class="del">删除</a>' +
										'<p>共<i><span class="total"></span></i>件商品,共<strong class="total_price"></strong><br /><a href="javascript:;" class="m_a">立即结算</a></p>'
										'<ul>'
								}).join('</ul>')
								$('.m_ul').html(list);
								var len = JSON.parse(localStorage.getItem('key')).length;
								$('#top_gwc_saleQty_out').html(len);
								$('.total').html(len)-1;
								$('#cartSlideNum').html(len)-1;
							}
						}
					}
					read();
				})
		}



		// ===================================点击加入购物车保存localstorage函数======================
		function join(){
			var data = window.localStorage.getItem('key') || [];
			if(typeof data == 'string'){
				data = JSON.parse(data);
			}
			$('.join').click(function(e){
				// read();
				// $('.total').html(len);
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
				if (has) {
					console.log(666);
					// var str = window.localStorage.getItem('key');
					// // console.log(JSON.parse(qty));
					// for(var i = 0;i < JSON.parse(str).length;i ++){
					// 	var qty = JSON.parse(str)[i].qty;
					// }
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
				}
				
				var storage = window.localStorage.setItem('key',JSON.stringify(data));

		
				render();

				read();


				del();
				// $('.delete').click(function(){
				// 	console.log(window.localStorage.getItem('key'));
				// })
				


				var len = JSON.parse(localStorage.getItem('key')).length;
				$('#top_gwc_saleQty_out').html(len);
				$('.total').html(len)-1;
				$('#cartSlideNum').html(len)-1;
			})

		}






		// =================================获取后端数据=========================================
		http.get('src/api/goodslist.php').then(function(res){
			var arr = [];
			var r = window.eval(' ('+  res +') ');
			console.log(r.page);
			arr = JSON.parse(res).data;
			let page_num = Math.ceil(JSON.parse(JSON.parse(res).total).length/arr.length);
			// console.log(page_num);
			var str = "";	
			let content = '';
			for(let i=1;i<=page_num;i++){
				if(i === r.page){
					content += '<span class="current">'+ i +'</span>';
					$('.m_page').html(res);
				}else{

					content += '<span class="current">'+ i +'</span>';
					$('.m_page').html(content);
				}
			}
			res = $.map(arr,function(n,i){
				return str = '<li data-item = '+ n.indexid +' class="w_li" style="position=relative"><div style="width:197px;height:200px;position:absolute"></div>' +
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
			current();

            // =========================价格由低到高======================
			$('.price').click(function(){
				$('.goods_list').html('');
				http.get('src/api/goodslist.php',{order:'a'},{page:1,qty:12}).then(function(res){
					var arr = [];
					var r = window.eval(' ('+  res +') ');
					arr = JSON.parse(res).data;
					console.log(arr);
					let page_num = Math.ceil(JSON.parse(JSON.parse(res).total).length/arr.length);
					// console.log(page_num);
					var str = "";	
					let content = '';
					for(let i=1;i<=page_num;i++){
						if(i === r.page){
							content += '<span class="current">'+ i +'</span>';
							$('.m_page').html(res);
						}else{

							content += '<span class="current">'+ i +'</span>';
							$('.m_page').html(content);
						}
					}
					var s = window.eval(' ('+  res +') ');
					arr = s;
					m = $.map(arr.data,function(n,i){
						return str = '<li data-item = '+ n.indexid +' class="w_li" style="position=relative"><div style="width:197px;height:200px;position:absolute"></div>' +
								'<dl>' + 
								'<dt>' + 
								'<a href="javascript:;"><img src="'+ n.img +'" style="width:160px;height:160px;"></a>' +	
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
					current();
					join();
					del();
				})

			})
			


			// ========================日期最新排起=================
			$('.date').click(function(){
				$('.goods_list').html('');
				http.get('src/api/goodslist.php',{order:'m'},{page:1,qty:12}).then(function(res){
					var arr = [];
					var r = window.eval(' ('+  res +') ');	
					arr = JSON.parse(res).data;
					let page_num = Math.ceil(JSON.parse(JSON.parse(res).total).length/arr.length);
					g = $.map(arr,function(n,i){
						return str = '<li data-item = '+ n.indexid +' class="w_li" style="position=relative"><div style="width:197px;height:200px;position:absolute"></div>' +
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
					current();
					join();
					del();
				})
			})



			$('.multiple').click(function(){
				$('.goods_list').html('');
				http.get('src/api/goodslist.php',{page:1,qty:12}).then(function(res){
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
				join();
				del();
			})

			join();



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


				$('.goods_list').click(function(e){
					if (e.target.parentNode.tagName == 'LI') {
						var li_id = $(e.target.parentNode).attr('data-item');
						// console.log(li_id);
						window.location.href = 'details.html?'+li_id + '&&page='+ r.page +'';	
					}
				})

				$('.m_a').click(function(){
					window.location.href = 'carlist.html'
				})

		})
			
		let ul1 = document.querySelector('#goods_order');
		ul1.onclick = function(e){
			e = e || window.event;
			var target = e.target || e.srcElement;
			if (target.className == 'price') {
				target.style.backgroundColor = '#f40';
				target.parentNode.parentNode.children[0].children[0].style.backgroundColor = '#ccc';
				target.parentNode.parentNode.children[2].children[0].style.backgroundColor = '#ccc';
			} 
			if (target.className == 'multiple') {
				target.style.backgroundColor = '#f40';
				target.parentNode.parentNode.children[1].children[0].style.backgroundColor = '#ccc';
				target.parentNode.parentNode.children[2].children[0].style.backgroundColor = '#ccc';
			} 
			if (target.className == 'date') {
				target.style.backgroundColor = '#f40';
				target.parentNode.parentNode.children[0].children[0].style.backgroundColor = '#ccc';
				target.parentNode.parentNode.children[1].children[0].style.backgroundColor = '#ccc';
			} 
		}


	})

})