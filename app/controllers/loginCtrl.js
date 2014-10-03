/**
 * Created by colinjlacy on 9/19/14.
 */
angular.module("clocks")
	.controller("loginCtrl", function($scope, $q, $rootScope, $http, dbSrvc, userSrvc) {

		$scope.loginState = $rootScope.user ? 2 : 0; // default login state

		// check for a logged-in user on load
		(function() {
			if(!$rootScope.user) {
				userSrvc.checkUser().then(function(result) {
					if (result.id) {
						$rootScope.user = result;
						$scope.loginState = 2;
						dbSrvc.loadProjects(result.id).then(function(data) {
							console.log(data);
							// set them on the rootScope
							$rootScope.projects = data;
						});
					}
				})
			}
		})();

		// set some basic data
		$scope.loginUsername = "admin@admin.com";
		$scope.loginPassword = "password";

		// the function that makes the login attempt using a username and password
		$scope.attemptLogin = function() {

			// make the ajax call to the user table via the userSrvc
			userSrvc.login($scope.loginUsername, $scope.loginPassword).then(function(login) {

				// if there were no backend errors whatsoever
				if (!login.error) {
					$rootScope.user = login;
					$scope.loginState = 2;
					// get the projects for this user from the database
					dbSrvc.loadProjects(login.id).then(function(data) {
						// set them on the rootScope
						$rootScope.projects = data;

					});

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
		}

	});