angular.module("clocks").factory("userSrvc",function(e,r){return{login:function(o,n){var s=r.defer();return e({url:"server/index.php/auth/login",method:"POST",data:{identity:o,password:n}}).success(function(e){console.log(e),s.resolve(e)}).error(function(e){e.error="There was an error connecting to the database",s.resolve(e)}),s.promise},register:function(o,n,s,a,t,c,i,u){var l=r.defer(),d={first_name:o,last_name:n,username:s,password:a,password_confirm:t,email:c,email_conf:i,ip_address:u};return e({url:"server/index.php/auth/create_user",method:"POST",data:d}).success(function(e){console.log(e),l.resolve(e)}).error(function(e){e.error="There was an error connecting to the database",l.resolve(e)}),l.promise}}});