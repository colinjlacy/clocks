angular.module("clocks",["ngRoute"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"app/views/welcome.html"}),e.when("/add-new/",{templateUrl:"app/views/new-project.html"}),e.when("/project/:id",{templateUrl:"app/views/view-project.html"})}]);