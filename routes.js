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
    if(req.body.pseudo.trim().length > 0){
        res.redirect('/pictionary/game');
    } else {
        res.redirect('/pictionary');
    }
});

module.exports = router;