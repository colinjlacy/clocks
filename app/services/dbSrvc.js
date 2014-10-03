/**
 * Created by colinjlacy on 8/31/14.
 */
angular.module("clocks")
.factory("dbSrvc", function(Ajax) {
		return {

			// database operations
			loadProjects: function(id) {
				var url = 'server/index.php/projects/load/' + id;
				return Ajax.get(url);
			},
			insertProject: function(obj) {
				var url = "server/index.php/projects/insert";
				return Ajax.post(url, obj);
			},
			getProject: function(id) {
				var url = 'server/index.php/projects/retrieve/' + id;
				return Ajax.get(url);
			},
			updateProject: function(id, seconds) {
				var url = "server/index.php/projects/update",
					obj = {
						id: id,
						seconds: seconds
					};
				return Ajax.post(url, obj);
			},
			deleteProject: function(id) {
				var url = "server/index.php/projects/delete",
					obj = {
						id: id
					};
				return Ajax.post(url, obj);
			},


			// helper functions that process data
			convertToSeconds: function(hours, minutes, seconds) {
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