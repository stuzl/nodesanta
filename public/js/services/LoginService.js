(function () {
    var app = angular.module('LoginService', []);

    // super simple service
    // each function returns a promise object 
    app.factory('Login', ['$http', '$window','$rootScope', function ($http, $window, $rootScope) {
        return {
            login: function (user) {
                $http.post('/login', user)
                .success(function (data) {
                    console.log("success");
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.username = user.username;
                    user.loggedIn = true;
                })
                .error(function (data) {
                    console.log("error");
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    // Handle login errors here
                    user.loggedIn = false;
                });
                $rootScope.$broadcast('userLoggedIn',user.loggedIn);
            },
            register:  function(user){
            $http.post('/register', user)
                .success(function (data) {
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.username = user.username;
                    user.loggedIn = true;
                })
                .error(function (data) {
                    delete $window.sessionStorage.token;
                    console.log('registration error');
                    user.loggedIn = false;
                });
                $rootScope.$broadcast('userLoggedIn',user.loggedIn);
            },
            logout: function (user) {
                delete $window.sessionStorage.token;
                user.loggedIn = false;
                $rootScope.$broadcast('userLoggedIn',user.loggedIn);
            }
        }
    } ]);
})();