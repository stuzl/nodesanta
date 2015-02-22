(function () {
var app = angular.module('PersonController', [])

	// inject the Person service factory into our controller
	.controller('PersonController', ['Persons','$scope', function(Persons,$scope) {
		var ctrl = this;
		ctrl.formData = {};
		ctrl.loading = true;

		// GET =====================================================================
		// when landing on the page, get all persons and show them
		// use the service to get all the persons
        ctrl.refresh = function(){
	  	    Persons.get()
			    .success(function(data) {
				    ctrl.persons = data;
				    ctrl.loading = false;
			    });
        };
        ctrl.refresh();

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		ctrl.createPerson = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (ctrl.formData.name != undefined) {
                console.log(ctrl.formData.name)
                console.log(ctrl.formData.emailAddress)
                console.log(ctrl.formData.familyNumber)
				ctrl.loading = true;

				// call the create function from our service (returns a promise object)
				Persons.create(ctrl.formData)

					// if successful creation, call our get function to get all the new persons
					.success(function(data) {
						ctrl.loading = false;
						ctrl.formData = {}; // clear the form so our user is ready to enter another
						ctrl.persons = data; // assign our new list of persons
					});
			}
		};

		// DELETE ==================================================================
		// delete a person after checking it
		ctrl.deletePerson = function(id) {
			ctrl.loading = true;

			Persons.delete(id)
				// if successful creation, call our get function to get all the new persons
				.success(function(data) {
					ctrl.loading = false;
					ctrl.persons = data; // assign our new list of todos
				});
		};

        $scope.$on('userLoggedIn', function(event, arg) { 
        if(arg){ 
              console.log("refreshing person data")
              ctrl.refresh();
              } else{
                  ctrl.persons = {};
              }    
        }); 
          

	}]);
})();