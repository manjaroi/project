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




// ========================================吸顶菜单=================================
    let top_fix = document.querySelector('.ui-fixed-top');
    let fixLeftImg = document.querySelector('.fixLeftImg');
    window.onscroll = function(){
        
        let scrollY = window.scrollY;
        if (scrollY >= 538) {
           animate(top_fix,{opacity:1});
           top_fix.style.display = 'block';
        }else{
            animate(top_fix,{opacity:0});
            // top_fix.style.display = 'none';
        }
        if (scrollY >= 260) {
            fixLeftImg.style.display = 'block';
            animate(fixLeftImg,{opacity:1});
        }else if(scrollY < 260){
            // fixLeftImg.style.display = 'none';
            animate(fixLeftImg,{opacity:0});
        }
    }

// =================================鼠标滑动字体变颜色=====================================
    let hot_query = document.querySelector('.hot-query');
    let search = document.querySelectorAll('.ui-search')[1];
    search.onclick = function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName === 'INPUT') {
            target.placeholder = ''
            target.onfocus = function(){
                target.placeholder = '';
            }
            target.onblur = function(){
                target.placeholder = '搜索 母婴之家 商品/品牌';
            }
        }
    }
    hot_query.onmouseover = function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className === '') {
            target.style.color = '#f40';
            target.onmouseout = function(){
                target.style.color = 'rgb(153, 153, 153)';
            }
        }
    }


    // ======================= 右边固定==============================
    let sildebar = document.querySelector('.sildebar');
    let level_dl = document.querySelectorAll('.level-dl');
    let level_dt = document.querySelectorAll('.level-dt');
    let user_img1 = document.querySelectorAll('.level-dd')[0];
    let user_img2 = document.querySelectorAll('.level-dd')[2];
    let user_img3 = document.querySelectorAll('.level-dd')[1];
    let user_img4 = document.querySelectorAll('.level-dd')[3];
    let user_img5 = document.querySelectorAll('.level-dd')[4];
    let car = document.querySelector('.cart-slidebar');
    for(var i = 0;i < level_dt.length;i ++){
        (function(i){
            level_dl[i].onmouseover = function(){
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
            level_dl[i].onmouseout = function(){
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

    // ==========================读取localstorage数据===========================
    function read(){
        let data = window.localStorage.getItem('key');
        data = JSON.parse(data);
        let list = document.querySelector('.slideBarCart-box');
        let maylike = document.querySelector('.mayLike');
        if (data !== null) {

            list.innerHTML = data.map(function(item,i){
                maylike.innerHTML = '';
                return `<li data-m=${item.id}><div class="cart-level-c brand_scroll" style=" overflow-y: auto;">
                        <div id="cart-level-plist">
                        <div class="cart-level-plist">
                        <div class="cart-level-img"><a href="javascript:;"><img src="${item.img}" width="46";height="46"></a></div>
                        <div class="cart-level-intro"><a href="javascript:;">${item.title}</a><div class="cart-level-act"><strong class="cart-level-price">￥${item.price}</strong><em class="cart-level-num">x1</em><a href="javascript:;" class="cart-level-del">删除</a></div></div>
                        </div>
                        </div>
                        </div>
                        <div class="cart-level-all">
                        <div class="cart-level-fl">共计￥<span class="mcart-p-price"><strong class="class="f20""></strong></span></div><a href="carlist.html" class="cart-level-fr">去购物车结算</a>
                        </div></li>`
            })

            list.onclick = function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.className == 'cart-level-del') {
                    let cartSlideNum = document.querySelector('#cartSlideNum');
                    cartSlideNum.innerText = data.length;
                    var id2 = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-m');
                    for(var i = 0;i < data.length;i ++){              
                        if (parseInt(id2) == parseInt(data[i].id)) {
                            data.splice(i,1);
                            window.localStorage.setItem('key',JSON.stringify(data));
                            list.innerHTML = data.map(function(item,i){
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
                }
            }
            let cartSlideNum = document.querySelector('#cartSlideNum');
            cartSlideNum.innerText = data.length;

        }
    }
    read();
   

        var sidebar = document.querySelector('#gototop');
        sidebar.onclick = function(){
            var timer = setInterval(function(){
                let scrollY = window.scrollY;
                let speed = Math.ceil((scrollY-0)/10)
                scrollBy(0,-speed);
                if (window.scrollY<=0 || speed<0) {
                    clearInterval(timer);
                    scrollBy(0,0);
                }
            },20)

        }


})    
