/**
 * Created by colinjlacy on 8/31/14.
 */
angular.module("clocks")
.factory("dbSrvc", function($http, $q) {
		return {

			// database operations
			loadProjects: function() {
				var returnData = $q.defer();

				$http({
					url: 'server/index.php/projects/load',
					method: 'GET'
				})
					.success(function(data) {
						returnData.resolve(data);
					})
					.error(function(error) {
						console.log(error);
						returnData.reject();
					});
				// returns the promise of the API call - whether successful or not
				return returnData.promise;
			},
			insertProject: function(obj) {
				// tell Angular to wait for iiiiiiiiiiiit....
				var returnData = $q.defer();

				$http({
					url: "server/index.php/projects/insert",
					method: "POST",
					data: obj
				})
					.success(function(data) {
						returnData.resolve(data);
					})
					.error(function(error) {
						console.log(error);
						returnData.reject(error);
					});
				// returns the promise of the API call - whether successful or not
				return returnData.promise;
			},
			getProject: function(id) {
				// tell Angular to wait for iiiiiiiiiiiit....
				var returnData = $q.defer();

				$http({
					url: "server/index.php/projects/retrieve/" + id,
					method: "GET",
//					params: {
//						id: id
//					}
				})
					.success(function(data) {
						console.log(data);
						returnData.resolve(data);
					})
					.error(function(error) {
						console.log(error);
						returnData.reject(error);
					});
				// returns the promise of the API call - whether successful or not
				return returnData.promise;
			},

			// helper functions that process data
			convertToSeconds: function(hours, minutes, seconds) {
				console.log(hours+", "+minutes+", "+seconds);
				return (hours * 3600) + (minutes * 60) + seconds;
			},
			revertFromSeconds: function(seconds) {
				var hours = Math.floor(seconds/3600),
					minutes = Math.floor((seconds-hours*3600)/60),
					newSeconds = seconds - (hours*3600) - (minutes*60);

				return {
					hours: hours,
					minutes: minutes,
					seconds: newSeconds
				}
			},
			processInputs: function(rate, targetHours, targetMinutes, addHours, addMinutes) {
				// convert any time inputs to seconds
				var revisedTarget = this.convertToSeconds(targetHours, targetMinutes, 0);
				var revisedAdd = this.convertToSeconds(addHours, addMinutes, 0);

				// analyze time and rate inputs - nullify if nothing has been entered
				revisedTarget = (revisedTarget == 0 || isNaN(revisedTarget)) ? null : revisedTarget;
				revisedAdd = isNaN(revisedAdd) ? 0 : revisedAdd;
				rate = (rate == 0) ? null : rate;

				return {
					hourly_rate: rate,
					time_budgeted: revisedTarget,
					time_spent: revisedAdd
				}
			}
		}
	});