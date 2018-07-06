document.addEventListener('DOMContentLoaded',function(){
		
	// ==============================封装动画================================    
	function animate(ele,opt,callback){
	    // 使用属性timerLen记录定时器数量
	    ele.timerLen = 0;

	    for(var attr in opt){
	        ele.timerLen++;

	        (function(attr){
	            var timerName = attr + 'Timer';//leftTimer,fontSizeTimer
	            var target = opt[attr];
	            // 添加前先清除之前的同名定时器
	            clearInterval(ele[timerName]);


	            ele[timerName] = setInterval(function(){
	                // 获取当前值
	                var current = getCss(ele,attr);

	                // 提取单位
	                var unit = current.match(/[a-z]*$/)[0];

	                // 提取当前值(number)
	                current = parseFloat(current);

	                // 计算缓冲速度
	                var speed = (target-current)/10;


	                // 针对opacity属性操作
	                if(attr === 'opacity'){
	                    speed = speed>0 ? 0.05 : -0.05;
	                }else{
	                    // 避免speed过小或为0
	                    speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
	                }

	                current = current + speed;

	                // 目标值判断
	                if(current === target){
	                    clearInterval(ele[timerName]);

	                    // 重置当前值
	                    current = target;

	                    ele.timerLen--;

	                    // 动画完成后执行回调函数
	                    if(typeof callback === 'function' && ele.timerLen === 0){
	                        callback();
	                    }
	                }


	                // 设置样式
	                ele.style[attr] = current + unit;
	            },30)

	        })(attr);
	    }
	}

	function getCss(ele,key){
	    // 判断是否支持getComputedStyle
	    if(window.getComputedStyle){
	        // 标准浏览器
	        return getComputedStyle(ele)[key]
	    }else if(ele.currentStyle){
	        // IE8-
	        return ele.currentStyle[key]
	    }else{
	        // 返回内联样式
	        return ele.style[key]
	    }
	}


	// ======================= 右边固定==============================
    let level_dt = document.querySelectorAll('.level-dt');
    let user_img1 = document.querySelectorAll('.level-dd')[0];
    let user_img2 = document.querySelectorAll('.level-dd')[2];
    let user_img3 = document.querySelectorAll('.level-dd')[1];
    let user_img4 = document.querySelectorAll('.level-dd')[3];
    let user_img5 = document.querySelectorAll('.level-dd')[4];
    for(var i = 0;i < level_dt.length;i ++){
        (function(i){
            level_dt[i].onmouseover = function(){
                level_dt[i].style.backgroundColor = '#ff5c00';
                if (i == 0) {
                   user_img1.style.display = 'block'; 
                   animate(user_img1,{right:30});
                }
                if (i == 3) {
                    user_img2.style.display = 'block'; 
                    animate(user_img2,{right:30});
                }
                if (i == 1) {
                    user_img3.style.display = 'block';
                    animate(user_img3,{right:30}); 
                }
                if (i == 4) {
                    user_img4.style.display = 'block';
                    animate(user_img4,{right:30});
                }
                if (i == 5) {
                    user_img5.style.display = 'block';
                    animate(user_img5,{right:30});
                }
            }
            level_dt[i].onmouseout = function(){
                level_dt[i].style.backgroundColor = '';
                user_img1.style.display = 'none';
                user_img1.style.right = '50px';
                user_img2.style.display = 'none';
                user_img2.style.right = '50px';
                user_img3.style.display = 'none';
                user_img3.style.right = '50px';
                user_img4.style.display = 'none';
                user_img4.style.right = '50px';
                user_img5.style.display = 'none';
                user_img5.style.right = '50px';
            }
        })(i)
    }



	let multiple = document.querySelector('.multiple');
	multiple.style.backgroundColor = '#ff5c00';
	let shoppingDiv = document.querySelector('#shoppingDiv');
	let mesClose = document.querySelector('#mesClose');
	let ul = document.querySelector('.goods_list');
	let num = document.querySelector('.icon-shopping-amount');
	shoppingDiv.onclick = function(e){	
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.id === 'mesClose') {
			shoppingDiv.style.display = 'none';
		}
		if (target.className == 'mesCloseA') {
			shoppingDiv.style.display = 'none';
		}
	}
	mesClose.onmouseover = function(){
		mesClose.style.backgroundColor = '#58bc58';
	}
	mesClose.onmouseout = function(){
		mesClose.style.backgroundColor = '#ccc';
	}
	ul.onclick = function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.className == 'join') {
			shoppingDiv.style.display = 'block';
			// num.innerText ++;
		
			// =====================cookie=======================
			// var cookie = 

		}
	}
	// let data1 = window.localStorage.getItem('key');
	// data1 = JSON.parse(data1);
	// console.log(data1);

	let wfc_gwc_eleG = document.querySelector('#wfc_gwc_eleG');
	let shoppingCar = document.querySelector('.header-shoppingCar');
	let shoppingCarDown = document.querySelector('.wfc_gwc_blk');
	wfc_gwc_eleG.onmouseover = function(){
		shoppingCarDown.style.display = 'block';
	}
	wfc_gwc_eleG.onmouseout = function(){
		// shoppingCarDown.style.height = 60;
		// animate(shoppingCarDown,{height:0});
		shoppingCarDown.style.display = 'none';
	}

	// if (data1 !== []) {
	// 	shoppingCarDown.innerText = '';
	// 	var res = data1.map(function(item,idx){
	// 		return `<img src="${item.img}">`
	// 	})
	// 	shoppingCarDown.innerHTML = res;
	// }

	// var price = document.querySelectorAll('.m_price');
	// console.log(price);




})