/**
 * Created by colinjlacy on 9/19/14.
 */
angular.module("clocks")
	.controller("loginCtrl", function($scope, $rootScope, $routeParams, dbSrvc, userSrvc) {

		$scope.loginState = $rootScope.user ? 2 : 0; // default login state

		// check for a logged-in user on load
		(function() {
			if(!$rootScope.user) {
				userSrvc.checkUser().then(function(result) {
					if (result.id) {
						// set the user's information to the root scope
						$rootScope.user = result;
						// set the user's information to the update property
						$scope.update = result;
						// give the update property a starting email confirmation value
						$scope.update.emailConf = $scope.update.email;
						// loads the projects for this user
						dbSrvc.loadProjects(result.id).then(function(data) {
							console.log(data);
							// set them on the rootScope
							$rootScope.projects = data;
						});
					}
				})
			}
		})();

		// set some placeholder data
		$scope.loginUsername = "admin@admin.com";
		$scope.loginPassword = "password";

		// the function that makes the login attempt using a username and password
		$scope.attemptLogin = function() {

			// make the ajax call to the user table via the userSrvc
			userSrvc.login($scope.loginUsername, $scope.loginPassword).then(function(login) {

				// if there were no backend errors whatsoever
				if (!login.error) {
					// set the user's information to the root scope
					$rootScope.user = login;
					// set the user's information to the update property
					$scope.update = login;
					// give the update property a starting email confirmation value
					$scope.update.emailConf = $scope.update.email;
					// set the new login state
					$scope.loginState = 2;
					// get the projects for this user from the database
					dbSrvc.loadProjects(login.id).then(function(data) {
						// set them on the rootScope
						$rootScope.projects = data;

					});

				}

			});

		};

		$scope.passwordUpdate = ""; // declares this so that it can be used in a minute...

		$scope.updateUser = function() {
			var obj = {
				first_name: $scope.update.first_name,
				last_name: $scope.update.last_name,
				username: $scope.update.username,
				email: $scope.update.email,
				email_confirm: $scope.update.emailConf
				},
				id = $routeParams.id;

			if ($scope.passwordUpdate.password && $scope.passwordUpdate.passConf) {
				obj.password = $scope.passwordUpdate.password;
				obj.password_confirm = $scope.passwordUpdate.passConf;
			}

			userSrvc.updateUser(obj, id).then(function(result) {
					if (!result.error) {
						console.log(result);
						// set the user's information to the root scope
						$rootScope.user.first_name = $scope.update.first_name;
						$rootScope.user.last_name = $scope.update.last_name;
						$rootScope.user.email = $scope.update.email;
						$rootScope.user.emailConf = $scope.update.email_confirm;
						// set some feedback data
						$rootScope.message = result;
					} else {
						$rootScope.message = "Uh oh, looks like there was an error trying to register your account."
					}
				});
		};

		$scope.register = {};

		$scope.register.firstName = 'Ashley';
		$scope.register.lastName = 'Lacy';
		$scope.register.userName = 'ashleyjlacy';
		$scope.register.password = 'a';
		$scope.register.passConf = 'a';
		$scope.register.email = 'ashley@webcake.co';
		$scope.register.emailConf = 'ashley@webcake.co';

		$scope.registerUser = function() {
			userSrvc.register(
				$scope.register.firstName,
				$scope.register.lastName,
				$scope.register.userName,
				$scope.register.password,
				$scope.register.passConf,
				$scope.register.email,
				$scope.register.emailConf,
				//$scope.register.ip
				'141.164.238.158'
			).then(function(data) {
				if (data.successful) {
					console.log(data);
					$rootScope.user = data.user;
					$scope.loginState = 2;
				} else {
					$rootScope.message = "Uh oh, looks like there was an error trying to register your account."
				}
			});
		};

		$scope.checkUser = function() {
			userSrvc.checkUser()
		};

		$scope.logOutUser = function() {
			userSrvc.logOutUser().then(function(data) {
				if (!data.error) {
					$rootScope.projects = null;
					$rootScope.user = null;
					$scope.loginState = 0;
				} else {
					$rootScope.message = "Uh oh, there was a problem logging you out!";
				}
			})
		};

		$scope.sendForgotPasswordEmail = function() {
			userSrvc.requestPasswordReset($scope.forgotPasswordEmailAddress).then(function(data) {
				if (!data.error) {
					console.log(data);
					$rootScope.message = data;
				} else {
					$rootScope.error = data.error;
					$rootScope.message = data.message;
				}
			})
		};

		$scope.showRegistrationForm = function() {
			$scope.loginState = 1;
		};

		$scope.showLoginForm = function() {
			$scope.loginState = 0;
		};

		$scope.showForgotPasswordForm = function() {
			$scope.loginState = 3;
		};


	});