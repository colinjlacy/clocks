/**
 * Created by colinjlacy on 8/31/14.
 */
angular.module("clocks")
.controller("clockCtrl", function($scope, $rootScope, $location, dbSrvc) {

		// set a default user
		$scope.user = 1;

		// pulling projects from the database
		$scope.loadProjects = function() {
			dbSrvc.loadProjects().then(function(data) {
				$rootScope.projects = data;
			});
		};
		// run the function
		$scope.loadProjects();

		$scope.addNew = function() {
			$location.path('/add-new/');
		};

		$rootScope.message = function(message) {
			$rootScope.displayMessage = message;
		};

		$scope.deleteProject = function(id, index) {
			dbSrvc.deleteProject(id).then(function() {
				$rootScope.projects.splice(index, 1);
			})
		};

	});