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
		
		// 注册提交后端
		var btn = $('#reg_btn');
		btn.click(function(){
			console.log(555);
			var username = $('#email').val();
			var password1 = $('#password1').val();
			var password2 = $('#password2').val();
			

			if (!/\b1[3-9][\d]{9}\b/i.test(username)) {
				alert('电话格式有误');
				return false;
			}
			if (!/^[^\s]{6,20}$/i.test(password1)) {
				alert('密码格式有误');
				return false;
			}
			if (!(password2 == password1) || password2 == "") {
				alert('输入密码不一致');
				return false;
			}


			var params = {username:username,password1:password1};
			http.post('src/api/register.php',params).then(function(res){
				console.log(res);
				
				var r = window.eval(' ('+  res +') ');
				
				

				$.each(r,function(n,i){	
					if (r.message == '用户名已注册') {
						alert('用户名已注册');
						$(location).prop('href', 'register.html')	
					}else{
						$(location).prop('href', 'index.html')
					}
				})
			});


		})
	})
})