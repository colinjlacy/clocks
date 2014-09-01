/**
 * Created by colinjlacy on 8/31/14.
 */
angular.module("clocks")
.controller("clockCtrl", function($scope, clockSrvc) {

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

		// submitting a project to the database
		$scope.submitProject = function() {
			// using the insertProject method of clockSrvc
			clockSrvc.insertProject($scope.projectTitle, $scope.user).then(function(data) {
				$scope.message = data;
			});
		};
	});