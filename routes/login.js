var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next){
  res.render('login', {title: 'working'});
})

router.post('/auth', function(req, res, next){
  knex.raw('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password])
  .then(function(user){
    res.cookie('loggedIn', 'true');
    res.render('dashboard', {username: user.rows[0].username, password: user.rows[0].password});
  })
  .catch(function(err){
    res.redirect('/login/')
  })
})

router.post('/logout', function(req,res, next){
  res.cookie('loggedIn', 'false');
  res.redirect('/login');
})


module.exports = router;
