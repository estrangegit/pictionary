const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const connectedUsers = require('./model/connectedUsers');
const ent = require('ent');

router.get('/', function(req, res){
    let error = req.cookies['error'];
    if(typeof error !== 'undefined'){
        res.clearCookie('error', {httpOnly: true});
        res.render('index.ejs', {error: error});
    } else {
        res.render('index.ejs', {error: null});
    }
});

router.get('/game', function(req, res){
    let pseudo = req.cookies['pseudo'];
    res.clearCookie('pseudo', {httpOnly: true});
    if(typeof pseudo !== 'undefined') {
        res.render('game.ejs', {pseudo: pseudo});
    } else {
        res.redirect('/pictionary');
    }
});

router.post('/pseudo', urlEncodedParser, function(req, res){
    if(req.body.pseudo.trim().length > 0){
        let pseudo = ent.encode(req.body.pseudo.trim());
        if(connectedUsers.doesPseudoExist(pseudo)){
            res.cookie('error', 'Ce pseudo a déjà été choisi', {httpOnly: true});
            res.redirect('/pictionary');
        } else {
            res.cookie('pseudo', pseudo, {httpOnly: true});
            res.redirect('/pictionary/game');
        }
    } else {
        res.cookie('error', 'Entrez un pseudo valide', {httpOnly: true});
        res.redirect('/pictionary');
    }
});

module.exports = router;
