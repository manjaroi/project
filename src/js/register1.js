document.addEventListener('DOMContentLoaded',function(){
	let register_form = document.querySelector('.register-form');
	let g_ipt = document.querySelectorAll('.g-ipt');
	let stickTips = document.querySelectorAll('.stickTips');
	let username = document.querySelector('#email');
	let password1 = document.querySelector('#password1');
	let password2 = document.querySelector('#password2');
	let emailTip = document.querySelector('#emailTip');
	let password1Tip = document.querySelector('#password1Tip');
	let password2Tip = document.querySelector('#password2Tip');
	let codetxt = document.querySelector('.codetxt');
	let texterr = document.querySelectorAll('.txt-err')[2];
	register_form.onclick = function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.className == 'g-ipt') {
			if (target.tagName == 'INPUT') {
				var placeholder = target.placeholder;
				target.placeholder = ''
            	target.style.border = '1px solid #FF9900';
            	target.style['box-shadow'] = '0 1px 1px rgba(0,0,0,0.075) inset,0 0 8px rgba(255,120,0,0.6)';
				target.onfocus = function(){
                	target.placeholder = '';
                	target.parentNode.children[1].style.display = 'none';
	            }
			}
		}
		if (target.className == 'checkbox') {
			if (target.checked == false) {
				target.parentNode.parentNode.children[1].style.display = 'block';
			}else{
				target.parentNode.parentNode.children[1].style.display = 'none';
			}	
		}
	}


	// 正则

	username.onblur = function(){
		var _username = username.value;
		if (!/^[1][3,4,5,7,8][0-9]{9}$/ig.test(_username)) {
			emailTip.style.display = 'block';
		}else{
			emailTip.style.display = 'none';
			username.style.border = '1px solid #58bc58';
			username.style['box-shadow'] = '0 1px 1px rgba(0,0,0,0.075) inset,0 0 8px rgba(255,120,0,0.6)';
		}
	}
	password1.onblur = function(){
		var _password1 = password1.value;
		if (!/^[^\s]{6,20}$/i.test(_password1)) {
			password1Tip.style.display = 'block';
		}else{
			password1Tip.style.display = 'none';
			password1.style.border = '1px solid #58bc58';
			password1.style['box-shadow'] = '0 1px 1px rgba(0,0,0,0.075) inset,0 0 8px rgba(255,120,0,0.6)';
		}
	}
	password2.onblur = function(){
		var _password2 = password2.value;
		var _password1 = password1.value;
		if (!(_password2 == _password1) || _password2 == "") {
			password2Tip.style.display = 'block';
			texterr.innerText = '2次密码不一致，请重新输入';
		}else{
			password2Tip.style.display = 'none';
			password2.style.border = '1px solid #58bc58';
			password2.style['box-shadow'] = '0 1px 1px rgba(0,0,0,0.075) inset,0 0 8px rgba(255,120,0,0.6)';
		}
	}
	codetxt.onfocus = function(){
		codetxt.style.border = '1px solid #FF9900';
		codetxt.style['box-shadow'] = '0 1px 1px rgba(0,0,0,0.075) inset,0 0 8px rgba(255,120,0,0.6)';
	}
	codetxt.onblur = function(){
		codetxt.style.border = '1px solid #ccc';
		codetxt.style['box-shadow'] = 'none';
	}

})