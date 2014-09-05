/**
 * Created by colinjlacy on 9/4/14.
 */
angular.module("clocks")
	.controller("projectCtrl", function($scope, $routeParams, $location, dbSrvc) {
		// load in the right project
		$scope.loadProject = function() {
			// get the ID from the URL
			var id = $routeParams.id;

			// pass the ID to the database, pull the project being viewed
			dbSrvc.getProject(id).then(function(data) {

				// revert the time_spent property to a readable time format
				data.time = dbSrvc.revertFromSeconds(data.time_spent);

				// assign the full set of returned values to the $scope
				$scope.viewProject = data;

			});
		};

		// run this function on load
		$scope.loadProject();

		$scope.startTimer = function() {
			$scope.running = true;
			$scope.runningTimer = setInterval(function() {
				if ($scope.viewProject.time.seconds == 59) {
					$scope.viewProject.time.seconds = 0;
					if ($scope.viewProject.time.minutes == 59) {
						$scope.viewProject.time.hours++;
						$scope.viewProject.time.minutes = 0;
						$scope.$digest();
					} else {
						$scope.viewProject.time.minutes++;
						$scope.$digest();
					}
				} else {
					$scope.viewProject.time.seconds++;
					$scope.$digest();
				}
			}, 1000);
		};

		$scope.stopTimer = function() {
			$scope.running = false;
			clearInterval($scope.runningTimer);
		}


	});