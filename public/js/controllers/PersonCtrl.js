(function () {
var app = angular.module('PersonController', [])

	// inject the Person service factory into our controller
	.controller('PersonController', ['Persons', function(Persons) {
		var ctrl = this;
		ctrl.formData = {};
		ctrl.loading = true;

		// GET =====================================================================
		// when landing on the page, get all persons and show them
		// use the service to get all the persons
		Persons.get()
			.success(function(data) {
				ctrl.persons = data;
				ctrl.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		ctrl.createPerson = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (ctrl.formData.name != undefined) {
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
	}]);
})();