angular.module("clocks")
	.controller("addCtrl", function($scope, $location, clockSrvc) {

		// submitting a project to the database
		$scope.submitProject = function() {
			// using the insertProject method of clockSrvc
			clockSrvc.insertProject($scope.projectTitle, $scope.user).then(function(data) {
				$scope.message = data;
			});
		};

		$scope.convert = function() {
			var time = clockSrvc.convertToSeconds($scope.addHours, $scope.addMinutes, $scope.addSeconds);
			console.log(time);
		};
		$scope.revert = function() {
			var time = clockSrvc.revertFromSeconds($scope.spentSeconds);
			console.log(time);
		}
	});
