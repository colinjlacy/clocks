angular.module("clocks").controller("loginCtrl",function(e,r,s,i,o,a){e.loginUsername="admin@admin.com",e.loginPassword="password",e.attemptLogin=function(){a.login(e.loginUsername,e.loginPassword).then(function(e){e.error||(console.log(e.id),o.loadProjects(e.id).then(function(e){console.log(e),s.projects=e}))})},e.register={},e.register.firstName="Ashley",e.register.lastName="Lacy",e.register.userName="ashleyjlacy",e.register.password="a",e.register.passConf="a",e.register.email="ashley@webcake.co",e.register.emailConf="ashley@webcake.co",e.registerUser=function(){a.register(e.register.firstName,e.register.lastName,e.register.userName,e.register.password,e.register.passConf,e.register.email,e.register.emailConf,"141.164.238.158")}});