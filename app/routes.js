// app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');
var Person = require('./models/person');
var User = require('./models/user');

 module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
    app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                                 // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });
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

    app.post('/login', function (req, res) {
  //validate req.body.username and req.body.password
  //if is invalid, return 401
  

      res.json({
          token : "dummyToken"
      });
      return;
            
  User.find({'username':req.body.username},function(err,users){
            
     if(err){
         res.status(401).send('Wrong username');
         return;
     }
      
     if(users.length===0){
         res.status(401).send('User not found');
         return;
     }  
      
     var user = users[0];
      
     user.verifyPassword(req.body.password,function(err,ismatch){
        if (err){
            res.status(401).send('Could not verify password');
            return;
        }
        
        if(!ismatch){
            res.status(401).send('Wrong password');
            return;
        }
         
        var token = jsonwebtoken.sign(user, secret, {expiresInMinutes: 1});

        res.json({
          token : token,
          user: user.toJSON()
        });
     }); 
  });
}); 



    


        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };