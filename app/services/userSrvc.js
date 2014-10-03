/**
 * Created by colinjlacy on 9/19/14.
 */
angular.module("clocks")
	.factory("userSrvc", function(Ajax) {
		return {
			// the login method
			login: function(loginUsername, loginPassword) {
				var url = "server/index.php/auth/login",
					obj = {
						identity: loginUsername,
						password: loginPassword
					};
				return Ajax.post(url, obj);
			},

			register: function(firstName, lastName, userName, password, passConf, email, emailConf, ip) {
				var url = "server/index.php/auth/create_user",
					obj = {
						first_name: firstName,
						last_name: lastName,
						username: userName,
						password: password,
						password_confirm: passConf,
						email: email,
						email_conf: emailConf,
						ip_address: ip
					};
				return Ajax.post(url, obj);
			},

			//getIp: function() {
			//	$http({
			//		url: ""
			//	})
			//}

			checkUser: function() {
				var url = "server/index.php/auth/get_user";
				return Ajax.get(url);
			},

			logOutUser: function() {
				var url = "server/index.php/auth/logout";
				return Ajax.get(url);
			},

			requestPasswordReset: function(email) {
				var url = "server/index.php/auth/forgot_password",
					obj = {
						email: email
					};
				return Ajax.post(url, obj);
			},

			updateUser: function(obj, id) {
				var url = "server/index.php/auth/edit_user/" + id;
				return Ajax.post(url, obj);
			}
		}
	});
