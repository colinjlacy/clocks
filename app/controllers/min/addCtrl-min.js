angular.module("clocks").controller("addCtrl",function(t,e,r,o){t.projectTitle="Should append to project list",t.user=1,t.projectRate=0,t.targetHours=0,t.targetMinutes=0,t.addHours=0,t.addMinutes=0,t.submitProject=function(){o.insertProject(t.projectTitle,t.user).then(function(e){t.message=e})},t.insertProject=function(){var e=o.processInputs(t.projectRate,t.targetHours,t.targetMinutes,t.addHours,t.addMinutes);e.title=t.projectTitle,e.owner=t.user,o.insertProject(e).then(function(t){r.projects.push(e),r.message(t),console.log(r.displayMessage)})}});