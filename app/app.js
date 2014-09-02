angular.module("clocks", [
		'ngRoute'
	])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when("/", {
			templateUrl: "app/views/welcome.html"
		});
		$routeProvider.when("/add-new/", {
			templateUrl: "app/views/new-project.html"
		});
	}]);
