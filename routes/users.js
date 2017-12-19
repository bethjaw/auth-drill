var express = require('express')
var router = express.Router()
var db = require('../db/api')
var bcrypt = require('bcrypt')

router.post('/signin', function(req, res, next){
    db.signIn(req.body)
    .then(function(agent){
      //Use bcrypt to log in
      bcrypt.compare(req.body.password, agent[0].password, function(err, isMatch) {
        // result needs to be isMatch in our bcrypt.compare bc that's the boolean we are looking for
        if (isMatch) {
          //Route to /Assignment
          console.log("IS MATCHED!");
        }
        else {
          res.render('index', { title: 'gClassified', message: 'Incorrect login. Contents will self destruct' })
        }
    })
  })
})

router.post('/signup', function(req,res,next){
  //Use bcrypt to Sign Up
  bcrypt.hash(req.body.password, 10, function(err, hash){
    // another way is to just put req.body.password = hash - wouldn't need to change in query then
    db.signUp(req.body, hash)
    .then(function(agent){
      if (agent[0].password === req.body.password) {
        res.render('index', { title: 'gClassified', message: 'Password Must Be Hashed. Government Secrets are at Stake!' })
      }
      else {
        res.render('index', { title: 'gClassified', message: 'Sign Up Successful' })
      }
    })
  })
})

module.exports = router
