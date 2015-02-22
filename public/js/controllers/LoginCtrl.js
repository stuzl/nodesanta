(function () {
    var app = angular.module('LoginController', [])

    // inject the ogin service factory into our controller
	.controller('LoginController', ['Login', function (Login) {
	    this.user = {};
	    this.login = function () {
	        Login.login(this.user);
	    };
        this.logout = function(){
            Login.logout(this.user)
        }
        this.register = function(){
            Login.register(this.user)
        }
	} ]);
})();