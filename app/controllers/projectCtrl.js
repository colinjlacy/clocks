/**
 * Created by colinjlacy on 9/4/14.
 */
angular.module("clocks")
	.controller("projectCtrl", function($scope, $routeParams, $location, clockSrvc) {
		// load in the right project
		$scope.loadProject = function() {
			// get the ID from the URL
			var id = $routeParams.id;

			// pass the ID to the database, pull the project being viewed
			clockSrvc.getProject(id).then(function(data) {

				// revert the time_spent property to a readable time format
				data.time = clockSrvc.revertFromSeconds(data.time_spent);

				// assign the full set of returned values to the $scope
				$scope.viewProject = data;

			});
		};

		// run this function on load
		$scope.loadProject();


	});