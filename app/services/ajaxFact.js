/**
 * Created by colinjlacy on 10/3/14.
 */
angular.module("clocks")
.factory("Ajax", function($http, $q) {
		return {
			get: function(url) {
				var returnData = $q.defer();

				$http({
					url: url,
					method: "GET"
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

			post: function(url, obj) {
				var returnData = $q.defer();

				$http({
					url: url,
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
			}
		}
	});