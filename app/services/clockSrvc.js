/**
 * Created by colinjlacy on 8/31/14.
 */
angular.module("clocks")
.factory("clockSrvc", function($http, $q) {
		return {
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

			insertProject: function(title, user) {
				var returnData = $q.defer();

				$http({
					url: "server/index.php/projects/insert",
					method: "POST",
					data: {
						title: title,
						user: user
					}
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
			}
		}
	});