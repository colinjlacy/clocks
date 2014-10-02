/**
 * Created by colinjlacy on 9/19/14.
 */
angular.module("clocks")
	.factory("userSrvc", function($http, $q) {
		return {
			// the login method
			login: function(loginUsername, loginPassword) {
				// set a deferred variable
				var returnData = $q.defer();

				// make the ajax call
				$http({
					url: "server/index.php/auth/login",
					method: "POST",
					data: {
						identity: loginUsername,
						password: loginPassword
					}
				}).success(function(data) {
					// if a connection was made, store it in the deferred var
					returnData.resolve(data);
				}).error(function (data) {
					// else, store the error in the deferred var
					data.error = "There was an error connecting to the database";
					returnData.resolve(data);
				});
			// returns the promise of the API call
			return returnData.promise;
			},

			register: function(firstName, lastName, userName, password, passConf, email, emailConf, ip) {
				// set a deferred variable
				var returnData = $q.defer();

				// create the data object to be passed
				var dataObj = {
					first_name: firstName,
					last_name: lastName,
					username: userName,
					password: password,
					password_confirm: passConf,
					email: email,
					email_conf: emailConf,
					ip_address: ip
				};

				// make the ajax call
				$http({
					url: "server/index.php/auth/create_user",
					method: "POST",
					data: dataObj
				}).success(function(data) {
					// if a connection was made, store it in the deferred var
					returnData.resolve(data);
				}).error(function (data) {
					// else, store the error in the deferred var
					data.error = "There was an error connecting to the database";
					returnData.resolve(data);
				});
				// returns the promise of the API call
				return returnData.promise;
			},

			//getIp: function() {
			//	$http({
			//		url: ""
			//	})
			//}

			checkUser: function() {
				// set a deferred variable
				var returnData = $q.defer();

				// make the ajax call
				$http({
					url: "server/index.php/auth/get_user",
					method: "GET"
				}).success(function(data) {
					console.log(data);
					// if a connection was made, store it in the deferred var
					returnData.resolve(data);
				}).error(function (data) {
					// else, store the error in the deferred var
					data.error = "There was an error connecting to the database";
					returnData.resolve(data);
				});
				// returns the promise of the API call
				return returnData.promise;
			},

			logOutUser: function() {
				// set a deferred variable
				var returnData = $q.defer();

				// make the ajax call
				$http({
					url: "server/index.php/auth/logout",
					method: "GET"
				}).success(function(data) {
					// if a connection was made, store it in the deferred var
					returnData.resolve(data);
				}).error(function (data) {
					// else, store the error in the deferred var
					data.error = "There was an error connecting to the database";
					returnData.resolve(data);
				});
				// returns the promise of the API call
				return returnData.promise;
			},

			requestPasswordReset: function(email) {
				// set a deferred variable
				var returnData = $q.defer();

				// make the ajax call
				$http({
					url: "server/index.php/auth/forgot_password",
					method: "POST",
					data: {
						email: email
					}
				}).success(function(data) {
					// if a connection was made, store it in the deferred var
					returnData.resolve(data);
				}).error(function (data) {
					// else, store the error in the deferred var
					data.error = "There was an error connecting to the database";
					returnData.resolve(data);
				});
				// returns the promise of the API call
				return returnData.promise;
			}
		}
	});
