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

				// check for time_budgetted, and if is set revert to readable time format
				if (data.time_budgeted) {
					data.budgetDisplay = dbSrvc.revertFromSeconds(data.time_budgeted);
				}

				data.income = data.hourly_rate * data.time.hours;

				// assign the full set of returned values to the $scope
				$scope.viewProject = data;

			});
		};

		// run this function on load
		$scope.loadProject();

		$scope.startTimer = function() {
			// indicate that the timer is running
			$scope.running = true;
			// the timer loop
			$scope.runningTimer = setInterval(function() {
				// if you've reached 59 seconds locally
				if ($scope.viewProject.time.seconds == 59) {
					// restart at 0...
					$scope.viewProject.time.seconds = 0;
					// if you've reached 59 minutes as well...
					if ($scope.viewProject.time.minutes == 59) {
						// increment the local hours
						$scope.viewProject.time.hours++;
						// reset the local minutes
						$scope.viewProject.time.minutes = 0;
						// update the listeners
					// otherwise...
					} else {
						// increment the minutes
						$scope.viewProject.time.minutes++;
						// update the listeners
					}
					// once those updates are made, update the database AJAXilly
					$scope.updateProject();
				// or, if you havne't reached 59 seconds...
				} else {
					// increment the local seconds
					$scope.viewProject.time.seconds++;
					// update the listeners
				}
				if (($scope.viewProject.time_budgeted > 0)
					&& (dbSrvc.convertToSeconds($scope.viewProject.time.hours, $scope.viewProject.time.minutes, $scope.viewProject.time.seconds) > $scope.viewProject.time_budgeted))
				{
					$scope.viewProject.overdue = true;
				}
//				return $scope.viewProject;
				$scope.$apply();
			}, 1000); // happens every 1000 milliseconds, or every second
		};

		$scope.stopTimer = function() {
			// indicate that the timer is no longer running
			$scope.running = false;
			// clear the setInterval
			clearInterval($scope.runningTimer);
		};

		$scope.updateProject = function() {
			// convert local times to one giant second count
			var seconds = dbSrvc.convertToSeconds($scope.viewProject.time.hours, $scope.viewProject.time.minutes, $scope.viewProject.time.seconds);
			// update the project in the database
			dbSrvc.updateProject($scope.viewProject.id, seconds);
		};

	});