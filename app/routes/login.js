// app/routes/login.js

var User = require('../models/user');
var jsonwebtoken = require('jsonwebtoken');

var secret = "top secret";

 module.exports = function(app) {

        // server routes ===========================================================
       

    app.post('/login', function (req, res) {
  //validate req.body.username and req.body.password
  //if is invalid, return 401
            
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


app.post('/register', function (req, res) {
  //validate req.body.username and req.body.password
  //if is invalid, return 401   
  console.log("Resistration....") 
  User.find({'username':req.body.username},function(err,users){
            
     if(err){
         console.error('error reading user');
         res.status(401).send('error reading user');
         return;
     }
      
     if(users.length>0){
         console.error('User already exists');
         res.status(401).send('User already exists');
         return;
     }  
     
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    user.save(function(err, user) {
        if (err){
          console.error(err);
          res.send(err);
        }

        var token = jsonwebtoken.sign(user, secret, {expiresInMinutes: 1});
        res.json({
          token : token,
          user: user.toJSON()
        });  
      
  });  
      
    console.log('login: '+user);
      

      
  });
}); 


    };