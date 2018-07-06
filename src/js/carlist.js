var data2 = window.localStorage.getItem('key');
var data3 = window.localStorage.getItem('details');
var arr = [];
data3 = JSON.parse(data3);
arr.push(data3);
console.log(arr);

document.addEventListener('DOMContentLoaded',function(){
	data2 = JSON.parse(data2);
	console.log(data2);
    let m_container = document.querySelector('.m_container');
    // let m_goodslist = JSON.parse(Cookie.get('goodslist'));
	// let res = data2.map(function(item,idx){
	// 	// return `<div class="p-img" style="margin-top:20px;">
	// 	// 		<a href="javascript:;"><img src="${item.img}"></a>
	// 	// 		<p>${item.title}</p>
	// 	// 		</div>` 
	// }
	function render(){
    	m_container.innerHTML = data2.map(function(item,i){
    		return `<div class="car_details" data-id="${i+1}">
    		<ul style="float:left;width:250px" class="m_ul"><li>
    		<img src="${item.img}" style="width:90px;height:80px;float:left;">
    		<p style="float:left;color:#0088CC;font-size:12px;">${item.title}</p>
    		<p style="font-size:12px;">ID:#23243</p>
    		<p style="font-size:12px;">Size:Default</p>
    		</li>
    		</ul>
    		<div class="car_details_right">
    		<img src="../images/602.png" alt="" id="m_less"><input type="number" min="1" id="m_number_m"><img src="../images/603.png" alt="" id="m_more">
    		<div class="m_right_m">
    		<span class="m_price_right">${item.price}</span>
    		<span class="m_total_right">${item.price}</span>
    		<span class="m_remove_right">&times;</span>
    		</div>
    		</div>
    		</div>`

    	}).join('');
    }
    render();



    function render1(){
    	m_container.innerHTML += arr.map(function(item,i){
    		return `<div class="car_details" data-id="${i+1}">
    		<ul style="float:left;width:250px" class="m_ul"><li>
    		<img src="${item.img}" style="width:90px;height:80px;float:left;">
    		<p style="float:left;color:#0088CC;font-size:12px;">${item.title}</p>
    		<p style="font-size:12px;">ID:#23243</p>
    		<p style="font-size:12px;">Size:Default</p>
    		</li>
    		</ul>
    		<div class="car_details_right">
    		<img src="../images/602.png" alt="" id="m_less"><input type="number" min="1" id="m_number_m"><img src="../images/603.png" alt="" id="m_more">
    		<div class="m_right_m">
    		<span class="m_price_right">${item.price}</span>
    		<span class="m_total_right">${item.price}</span>
    		<span class="m_remove_right">&times;</span>
    		</div>
    		</div>
    		</div>`

    	}).join('');
    }

    
    var index = data3.indexid;
    console.log(index);



    for(var i = 0;i < data2.length;i ++){
    	if (data2[i].id !== index) {
    		render1();
    	}
    }



    let m_number_m = document.querySelector('#m_number_m');
    let m_more = document.querySelector('#m_more');
    let m_less = document.querySelector('#m_less');
    let m_price_m = document.querySelector('.m_price_right');
    let m_total_m = document.querySelector('.m_total_right');
    let m_remove_m = document.querySelector('.m_remove_right');
    let m_cart = document.querySelector('.m_cart');
    let car_details = document.querySelectorAll('.car_details');
    let car_details_right = document.querySelector('.car_details_right');
    let m_ul = document.querySelectorAll('.m_ul');
    // for(var key in m_goodslist){
    // 	 m_number_m.value = m_goodslist[key].qty;
    // }


    for(var i = 0;i < car_details.length;i ++){

	   	car_details[i].onclick = function(e){
	    	e = e || window.event;
	    	var target = e.target || e.srcElement;
	    	for(var i = 0;i < data2.length;i ++){
	    		if (target.getAttribute('data-id') == data2[i].id) {
	    			console.log(data2[i].id);
	    			console.log(target);
			    	if (target.children[1].children[0].id == 'm_less') {
			    		console.log(target);	
			    		// console.log(target.parentNode.children[1]);
			    		if (m_number_m.value>1) {
				    		m_number_m.value--;
				    		target.parentNode.children[1].innerText = m_number_m.value * m_price_m.innerText;
				    		// m_cart.innerText = m_number_m.value * m_price_m.innerText;
				    	}
			    	}
	    		}
	    	}
	    	// if (target.id == 'm_more') {
	    	// 	console.log(target);
	    	// 	m_number_m.value++;
		    // 	target.parentNode.children[1].innerText = m_number_m.value * m_price_m.innerText;
		    // 	// m_cart.innerText = m_number_m.value * m_price_m.innerText;
	    	// }
	    }
    }




    
    m_remove_m.onmouseover = function(){
    	m_remove_m.className += ' ' + 'active6';
    }
    m_remove_m.onmouseout = function(){
    	m_remove_m.className = 'm_remove_right';
    }
})