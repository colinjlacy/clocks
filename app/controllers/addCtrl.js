angular.module("clocks")
	.controller("addCtrl", function($scope, $location, $rootScope, clockSrvc) {

		// placeholder values
		$scope.projectTitle = "Should append to project list";
		$scope.user = 1;
		$scope.projectRate = 0;
		$scope.targetHours = 0;
		$scope.targetMinutes = 0;
		$scope.addHours = 0;
		$scope.addMinutes = 0;

		// submitting a project to the database
		$scope.submitProject = function() {
			// using the insertProject method of clockSrvc
			clockSrvc.insertProject($scope.projectTitle, $scope.user).then(function(data) {
				$scope.message = data;
			});
		};

		$scope.insertProject = function() {

			var project = clockSrvc.processInputs($scope.projectRate, $scope.targetHours, $scope.targetMinutes, $scope.addHours, $scope.addMinutes);
			project.title = $scope.projectTitle;
			project.owner = $scope.user;

			clockSrvc.insertProject(project).then(function(data) {
				$rootScope.projects.push(project);
				$rootScope.message(data);
				console.log($rootScope.displayMessage);
			});
		};
	});