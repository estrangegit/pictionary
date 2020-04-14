const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const connectedUsers = require('./model/connectedUsers');

router.get('/', function(req, res){
    let error = req.cookies['error'];
    res.clearCookie('error', {httpOnly: true});
    if(typeof error !== 'undefined'){
        res.render('index.ejs', {error: error});
    } else {
        res.render('index.ejs', {error: null});
    }
});

router.get('/game', function(req, res){
    let pseudo = req.cookies['pseudo'];
    res.clearCookie('pseudo', {httpOnly: true});
    res.render('game.ejs', {pseudo: pseudo});
});

router.post('/pseudo', urlEncodedParser, function(req, res){
    if(req.body.pseudo.trim().length > 0){
        let pseudo = req.body.pseudo.trim();
        if(connectedUsers.doesPseudoExist(pseudo)){
            res.cookie('error', 'Ce pseudo a déjà été choisi', {httpOnly: true});
            res.redirect('/pictionary');
        } else {
            res.cookie('pseudo', pseudo, {httpOnly: true});
            res.redirect('/pictionary/game');
        }
    } else {
        res.redirect('/pictionary');
    }
});

module.exports = router;