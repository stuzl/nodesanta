// app/routes/api.js

var Person = require('../models/person');

 module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
       app.get('/api/persons', function(req, res) {
             console.log('getting persons');

        // use mongoose to get all persons in the database
        Person.find(function(err, persons) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(persons); // return all persons in JSON format
        });
    });

    // create person and send back all persons after creation
    app.post('/api/persons', function(req, res) {
        console.log('creating person');
        console.log(req.body.name);
        console.log(req.body);
        // create a person, information comes from AJAX request from Angular
            Person.create({
            name : req.body.name,
            familyNumber : req.body.familyNumber,
            emailAddress : req.body.emailAddress
        }, function(err, person) {
                console.log('got to here...');
            if (err){
                console.log(err);
                res.send(err);
            }
                console.log('got a bit further');
            // get and return all the persons after you create another
            Person.find(function(err, persons) {
                if (err)
                    res.send(err)
                res.json(persons);
            });
        });

    });

    // delete a person
    app.delete('/api/persons/:person_id', function(req, res) {
        console.log('deleting person');
        Person.remove({
            _id : req.params.person_id
        }, function(err, person) {
            if (err)
                res.send(err);

            // get and return all the persons after you create another
            Person.find(function(err, persons) {
                if (err)
                    res.send(err)
                res.json(persons);
            });
        });
    });





    


        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });
};