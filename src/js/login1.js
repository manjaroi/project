document.addEventListener('DOMContentLoaded',function(){
	let register_form = document.querySelector('.register-form');
	let g_ipt = document.querySelectorAll('.g-ipt');
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
	            target.onblur = function(){
	            	target.placeholder = placeholder;
	            }
			}
		}
		if (target.className == 'g-ipt-err') {
			if (target.tagName == 'INPUT') {
				var placeholder = target.placeholder;
				target.placeholder = ''
            	target.style.border = '1px solid #FF9900';
            	target.style['box-shadow'] = '0 1px 1px rgba(0,0,0,0.075) inset,0 0 8px rgba(255,120,0,0.6)';
				target.onfocus = function(){
                	target.placeholder = '';
                	target.parentNode.children[1].style.display = 'none';
	            }
	            target.onblur = function(){
	            	target.placeholder = placeholder;
	            }
			}
		}
	}
})