(function(){
var app = angular.module('PersonService', []);

	// super simple service
	// each function returns a promise object 
	app.factory('Persons', ['$http',function($http) {
		return {
			get : function() {
                console.log('person service get /api/persons')
				return $http.get('/api/persons');
			},
			create : function(personData) {
				return $http.post('/api/persons', personData);
			},
			delete : function(id) {
				return $http.delete('/api/persons/' + id);
			}
		}
	}]);
})();