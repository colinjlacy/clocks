/**
 * Created by colinjlacy on 8/31/14.
 */
angular.module("clocks")
.controller("clockCtrl", function($scope, $location, clockSrvc) {

		// set a default user
		$scope.user = 1;

		// pulling projects from the database
		$scope.loadProjects = function() {
			clockSrvc.loadProjects().then(function(data) {
				$scope.projects = data;
			});
		};
		// run the function
		$scope.loadProjects();

		$scope.addNew = function() {
			$location.path('/add-new/');
		};

	});