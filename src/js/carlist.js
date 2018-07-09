var data2 = window.localStorage.getItem('key');
console.log(JSON.parse(data2));
var data3 = window.localStorage.getItem('details');
var arr = [];

document.addEventListener('DOMContentLoaded',function(){
    let m_container = document.querySelector('.m_container');	
 	data2 = JSON.parse(data2);
    function render1(){
        if (data2 !== null) {
        	m_container.innerHTML = data2.map(function(item,i){
        		return `<div class="car_details" data-id="${item.id}">
        		<ul style="float:left;width:250px" class="m_ul"><li data-id=${item.id}>
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
        		<span class="m_total_right"><span class="m_price">${item.price}</span></span>
        		<span class="m_remove_right">&times;</span>
        		</div>
        		</div>
        		</div>`

        	}).join('');
        }else{
            data3 = JSON.parse(data3);
            arr.push(data3);
            m_container.innerHTML = arr.map(function(item,i){
                return `<div class="car_details" data-id="${i+1}">
                <ul style="float:left;width:250px" class="m_ul"><li data-id=${item.id}>
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
                <span class="m_total_right"><span class="m_price">${item.price}</span></span>
                <span class="m_remove_right">&times;</span>
                </div>
                </div>
                </div>`

            }).join('');
        }
    }
    render1();

    let m_number_m = document.querySelectorAll('#m_number_m');
    let m_more = document.querySelector('#m_more');
    let m_less = document.querySelector('#m_less');
    let m_price_m = document.querySelector('.m_price_right');
    let m_total_m = document.querySelectorAll('.m_total_right');
    let m_remove_m = document.querySelectorAll('.m_remove_right');
    let m_cart = document.querySelector('.m_cart');
    let car_details = document.querySelectorAll('.car_details');
    let car_details_right = document.querySelectorAll('.car_details_right');
    let m_ul = document.querySelectorAll('.m_ul');
    let m_em = document.querySelector('.m_em');
    let price = document.querySelectorAll('.m_price');

    for(var i = 0;i < m_number_m.length;i ++){
    	m_number_m[i].value = 1;
    }

    var sum = 0;
    for(var i = 0;i < m_total_m.length;i ++){
    	sum += m_total_m[i].innerText * 1;
    }
    m_em.innerText = sum;

    for(var i = 0;i < m_remove_m.length;i ++){
	    car_details_right[i].onclick = function(e){
	    	e = e || window.event;
	    	var target = e.target || e.srcElement;
	    	if (target.id == 'm_less') {
	    		if (this.children[1].value>1) {
		    		this.children[1].value--;
		    		this.children[3].children[1].innerText = this.children[1].value * this.children[3].children[0].innerText;
		    		var price = this.children[3].children[1].innerText * 1;
			    	var total  = m_em.innerText;
			    	for(var i = 0;i < m_total_m.length;i ++){
			    		total -= (this.children[3].children[1].innerText/this.children[1].value)*1
			    	}
			    	m_em.innerText = total;
		    	}
	    	}
	    	if (target.id == 'm_more') {
	    		this.children[1].value ++;
		    	this.children[3].children[1].innerText = this.children[1].value * this.children[3].children[0].innerText;
		    	var price = this.children[3].children[1].innerText * 1;
		    	var total  = 0;
		    	for(var i = 0;i < m_total_m.length;i ++){
		    		total += m_total_m[i].innerText * 1;
		    	}
		    	total = total + sum;
		    	m_em.innerText = total;
	    	}
            // if (target.className == 'm_remove_right') {
            //     for(var i = 0;i < data2.length;i ++){
            //         var id2 = target.parentNode.parentNode.parentNode.children[0].children[0].getAttribute('data-id');
            //         if (parseInt(id2) == parseInt(data2[i].id)) {
            //             data2.splice(i,1);
            //             window.localStorage.setItem('key',JSON.stringify(data2));

            //             render1();  
            //         }
            //     }
            // }
	    }
    	
    }

    let shopping = document.querySelector('#shoppingCar');
    shopping.onclick = function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className == 'm_remove_right') {
            if (data2 !== null) {
                for(var i = 0;i < data2.length;i ++){
                    var id2 = this.children[0].children[0].getAttribute('data-id');
                    if (parseInt(id2) == parseInt(data2[i].id)) {
                        console.log(id2,data2[i].id);
                        data2.splice(i,1);
                        window.localStorage.setItem('key',JSON.stringify(data2));

                        render1();  
                    }
                }
            }
        }
    }


    var clear_all = document.querySelector('.clear_all');
    clear_all.onclick = function(){
        window.localStorage.clear('key');
        m_container.innerHTML = `<div class="car_details"><a href="goodslist.html">你没有东西要结算，点击返回列表页~</a></div>`;
    }

    
})