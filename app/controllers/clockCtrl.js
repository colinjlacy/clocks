/**
 * Created by colinjlacy on 8/31/14.
 */
angular.module("clocks")
.controller("clockCtrl", function($scope, $rootScope, $location, dbSrvc) {

		// set a default user
		$scope.user = 1;

		$scope.addNew = function() {
			$location.path('/add-new/');
		};

		$rootScope.message = function(message) {
			$rootScope.displayMessage = message;
		};

		$scope.deleteProject = function(id, index) {
			dbSrvc.deleteProject(id);
			$rootScope.projects.splice(index, 1);
		};

		$scope.editProjects = function() {
			$scope.removeProjects = true;
		};

		$scope.cancelEdit = function() {
			$scope.removeProjects = false;
			for (var i = 0; i < $scope.projects.length; i++) {
				$scope.projects[i].remove = false;
			}
		};

		$scope.cancelThisEdit = function(project) {
			project.remove = false;
		};

		$scope.remove = function(project) {
			project.remove = true;
		};


	});