require.config({
	paths : {
		'jquery' : './jquery-3.2.1',
		'http' : './httpclient',
		'xzoom' : './jquery.xZoom'
	}
})

require(['jquery','http','xzoom'],function($,http,xzoom){
	$('.ui-silder-nav').load('nav.html');	
	$(function(){
		$('.site-nav').load('header.html');
		$('.tfc_footer').load('footer.html');
	 	var id = (window.location.search);
	 	id = id.slice(1,2);
	 	http.get('src/api/goodslist.php',{page:1,qty:12}).then(function(res){
	 		var r = window.eval(' ('+  res +') ');
	 		for(var i = 0;i < r.data.length;i++){
	 			if (id == r.data[i].indexid) {
	 				var str = r.data[i];
	 				var details = window.localStorage.getItem('key');
	 				console.log(details);

	 				$.each(str,function(n,i){
	 					var res = '<div class="conTopLeftBox">' + 
	 								'<div class="preview" id="preview" style="height:475px;">' +
	 								'<div class="jqzoom" style="height:350px;width:350px;"><img src=" '+ str.img +'" id="bigImg" style="float: left;"><img src=" '+ str.small2 +'" id="bigImg" style="display:none"><img src=" '+ str.small3 +'" id="bigImg" style="display:none"><img src=" '+ str.small4 +'" id="bigImg" style="display:none">' + '</div>'+
	 								'<div class="spec" id="spec"><ul class="listImg"><li><img src="'+ str.small1 +'" alt="" /></li><li><img src="'+ str.small2 +'" alt="" /></li><li><img src="'+ str.small3 +'" alt="" /></li><li><img src="'+ str.small4 +'" alt="" /></li></ul></div>' +
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
	 								'<div><a href="javascript:;" style="display:block;width:100px;height:50px;line-height:50px;text-align:center;background-color:#f40;float:right; " class="m_btn">立即购买</a></div>'
	 								'</div>' 
 					$('.m_div1').html(res);
	 				})

	 				$('.m_btn').click(function(){
	 					var my_str = window.localStorage.getItem('key');
	 					if (my_str == null) {
	 						window.localStorage.setItem('details',JSON.stringify(str));
	 					}
	 					window.location.href = 'carlist.html'
	 				})


	 			}
	 		}
		 	// console.log($('.jqzoom'),66666);
		 	$('.jqzoom').xZoom({width:350,height:350});
		 	$('.zoom').css('backgroundColor','rgba(0,0,0,0.5)');
		 	$('.zoom').css('position','absolute');
		 	// $('.zoom').css('width','100px');
		 	// $('.zoom').css('height','100px');
	 		
		 	// $('.m_btn').click(function(){
		 	// 	var result = window.localStorage.getItem('key');
		 	// 	if(typeof result == 'string'){
		 	// 		result = JSON.parse(result);
		 	// 		let idx;
		 	// 		let has = result.some(function(item,i){
		 	// 			idx = i;
		 	// 			return item.id == id
		 	// 		})	
		 	// 		console.log(has)
				// 		if(!has){
				// 			for(let i=0;i<r.data.length;i++){
				// 				if(r.data[i].indexid == id){
				// 					result.push(r.data[i]);
				// 					window.localStorage.setItem('key',JSON.stringify(result))
				// 				}
				// 			}
				// 		}		 			
		 	// 	}

		 	// 	// window.location.href = 'carlist.html'
		 	// })

			var listImg = document.querySelectorAll('.listImg>li');
			var img = document.querySelectorAll('.jqzoom>img');
			for(var i = 0;i < listImg.length;i ++){
				(function(i){
					listImg[i].onmouseover = function(){
						for(var j = 0;j < listImg.length;j ++){
							if (i == j) {
								listImg[j].style.border = '1px solid #f40';
								img[j].style.display = 'block';
							}else{
								img[j].style.display = 'none';
							}
						}
					}
					listImg[i].onmouseout = function(){
						for(var j = 0;j < listImg.length;j ++){
							if (i == j) {
								listImg[j].style.border = 'none';
							}
						}
					}
				})(i)
			}
	 	})
	
		
	
		// =================================留言板(以前项目)========================================


		let m_evaluate = document.querySelector('#m_evaluate');
        let arr_evaluate = ['垃圾','接近垃圾','一般','好','很好']
        let m_start_a = document.querySelector('.m_start');
        let m_start = m_start_a.querySelectorAll('img');
        for(let i = 0;i < m_start.length;i ++){
            // m_start[i].onmouseover = function(){
            //     for(let j = 0;j < m_start.length;j ++){
            //         if (j<=i) {
            //             m_start[j].src = '../images/709.png'                        
            //         }else{
            //             m_start[j].src = '../images/706.png'
            //         }
            //     }
            // }
            // m_start[i].onmouseout = function(){
            //     for(let k = 0;k < m_start.length;k ++){
            //         m_start[k].src = '../images/706.png';
            //     }
            // }
            
            m_start[i].onmouseup = function(){
                for(let l = 0;l < m_start.length;l ++){
                    if (l<=i) {
                        m_start[l].src = '../images/709.png';
                         m_evaluate.innerHTML = arr_evaluate[i];     
                    }else{
                        m_start[l].src = '../images/706.png';  
                    }
                }
            }
        }

		
		// ============================过滤留言板敏感字符(以前项目)===========================
        
        let m_textarea = document.querySelector('.m_textarea');
        let m_input = document.querySelector('#m_input');
        let m_randomCode = document.querySelector('.m_randomCode');
        let m_btn = document.querySelector('#m_btn');
        let m_comment = document.querySelector('#m_comment');
        let m_choose = document.querySelector('#m_choose');
        let m_again = document.querySelector('#m_again'); 
        let m_abc = document.querySelector('.m_abc'); 
        let left_comment = document.querySelector('.left_comment'); 

        // 评论区左边的图片
        // let m_comment_left = document.querySelector('.m_comment_left');

        let m_date = new Date();
        let m_year = m_date.getFullYear();
        let m_month = m_date.getMonth()+1;
        let m_day = m_date.getDate();

        // 随机设置验证码数字+英文
        let code = '';
        let selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        function Code(){
            for(var i = 0;i < 4;i ++){
                let codeIdx = parseInt(Math.random()* 36); 
                code += selectChar[codeIdx]; 
            }   
        }
        Code();


       // 设置随机验证码
        let randomCode = parseInt(Math.random()*9000+1000);
        m_randomCode.innerHTML = randomCode;


        // 选择文件显示在输入框
        // m_comment.innerHTML = m_choose.value;

        // 敏感字符 
        let mingan = 'TMD,垃圾,客服是傻逼,吃屎吧';
        mingan = mingan.split(',');


        let m_array = [];
        m_btn.onclick = function(){ 
            console.log(666);  
            _num = m_input.value;
            // 验证成功在可以发送
            if (_num == randomCode && m_textarea.value != '') {
                m_again.innerHTML = '';
                m_textarea.focus();
                textArea();
            }else if (_num != randomCode){
                m_again.innerHTML = '请输入正确的验证码';
                // alert('请输入内容');
            }else if (m_textarea.value == '') {
                alert('请输入内容');
            }
            // render();
        }
        m_input.onkeydown = function(e){
            e = e || window.event;
            _num = m_input.value;
            if (m_textarea.value == '' &&  e.keyCode === 13 ) {
                alert('请输入内容');
            }else if (e.keyCode === 13 && _num == randomCode) {
                m_again.innerHTML = '';
                textArea();
            }else if (e.keyCode === 13 && _num !== randomCode) {
                m_again.innerHTML = '请输入正确的验证码';
            }
        }
        function render(){
            m_comment.innerHTML = m_array.map(function(item){
                return `<li style="height:154px;border-bottom:1px solid #ccc;">${item}<li>`
            }).join('');
            let m_comment_left = document.createElement('div');
            m_comment_left.className = 'm_comment_left';
            let m_p_date = document.createElement('p');
            let clone_comment = left_comment.appendChild(m_comment_left);
            for(let i = 0;i < m_start.length;i ++){
                let clone_start = m_start[i].cloneNode(true);
                m_comment_left.appendChild(clone_start);
            }
            m_p_date.innerHTML = m_day + '/' + m_month + '/' + m_year;
            clone_comment.appendChild(m_p_date);
            let a_good = document.createElement('span');
            let a_bad = document.createElement('span');
            a_good.innerHTML = `<a href="###" id="a_good"><img src="../images/710.png"><span ><span>(</span><span id="a_good_span">0</span><span>)</span></span></a>`
            clone_comment.appendChild(a_good);
            a_bad.innerHTML = `<a href="###" id="a_bad"><img src="../images/711.png"><span ><span>(</span><span id="a_bad_span">0</span><span>)</span></span></a>`
            clone_comment.appendChild(a_bad);
            let a_good_add = document.querySelector('#a_good');
            let a_bad_del = document.querySelector('#a_bad');
            let a_good_span = document.querySelector('#a_good_span')
            let a_bad_span = document.querySelector('#a_bad_span')
            a_good_add.onclick = function(){
                console.log(566);
                a_good_span.innerText ++;
            }

            a_bad_del.onclick = function(){
                console.log(566);
                a_bad_span.innerText ++;
            }
        }   






        function textArea(){
            _m_textarea = m_textarea.value;
            mingan.forEach(function(item){
                let reg = new RegExp(item,'gi');
                _m_textarea = _m_textarea.replace(reg,'**');
            })
            m_array.push(_m_textarea); 
            render(); 
            m_textarea.value = '';
            m_input.value = '';
            randomCode = parseInt(Math.random()*9000+1000);
            m_randomCode.innerHTML = randomCode;
            // m_randomCode.innerHTML = '';
            // Code();
            // m_randomCode.innerHTML = code;
        }
			

	})


})