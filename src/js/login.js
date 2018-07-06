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

		var btn = $('#login-btn')

		btn.click(function(){
			var username = $('#login-email').val();
			var password = $('#password').val();
			var params = {username:username,password:password};
			http.post('src/api/login.php',params).then(function(res){
				console.log(res);
				var r = window.eval(' ('+  res +') ');
				console.log(r);
				$.each(r,function(n,i){	
					if (r.message == 'username or password error') {
						alert('用户名或密码错误');	
					}else{
						$(location).prop('href', 'index.html');
					}
				})
			});
		})


	})
})