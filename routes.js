const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res){
    res.render('index.ejs');
});

router.get('/game', function(req, res){
    res.render('game.ejs');
});

router.post('/pseudo', urlEncodedParser, function(req, res){
    console.log(req.body.pseudo);
    res.redirect('/pictionary/game');
});

module.exports = router;