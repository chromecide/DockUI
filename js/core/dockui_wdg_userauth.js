$.dockui.widgets.user_auth = {
	toolbar_click: function(){
		var contentHTML='<p></p>';
		var content = $(contentHTML);
		var form = '<label for="txtUserName">User Name:</label><input type="text" id="dockui_userauth_username" name="dockui_userauth_username"/><label for="txtUserName">Password:</label><input type="password" id="dockui_userauth_password" name="dockui_userauth_password"/>';
		var callback = function(){
			$.dockui.core.globaldialog.close();
		}

		$.dockui.core.globaldialog.show('DockUI.net - Login', form, {buttons:{'Login': $.dockui.widgets.user_auth.post_auth,'Cancel': callback}});
		
		
		
	},
	post_auth:function(){
		var userField = $('#dockui_userauth_username');
		var passField = $('#dockui_userauth_password');

		var postvalues = {
			'txtUserName':userField.attr('value'),
			'pwdPassword':passField.attr('value')
		}
		
		$.post('server/core/user_auth/', postvalues, 
			function(data){
				var ret = data;
				var callback = function(){
					$.dockui.core.globaldialog.close();
				}
				if (ret.errors.length==0)
				{
					$('.user_auth img').attr('src','images/widgets/user_auth/logout.png').unbind('click', $.dockui.widgets.user_auth.toolbar_click).click($.dockui.widgets.user_auth.logout);

					$.dockui.core.globaldialog.show('DockUI.net - Login', "<h1>Login Successful</h1>", {buttons:{'OK': callback}});
				}else{
					$.dockui.widgets.user_auth.toolbar_click();
				}
			}, "json");
	},
	logout: function(){
		$.post('server/core/user_auth', {"logout":1}, 
			function(data){
				var ret = data;
				var callback = function(){
					$.dockui.core.globaldialog.close();
				}
				if (ret.errors.length==0)
				{
					$('.user_auth img').attr('src','images/widgets/user_auth/toolbar_icon.png').unbind('click', $.dockui.widgets.user_auth.toolbar_click).click($.dockui.widgets.user_auth.toolbar_click);
					
				}
				$.dockui.core.globaldialog.show('DockUI.net - Login', "<h1>Successful Logged out</h1>", {buttons:{'OK': callback}});
			}, "json");
	}
}
