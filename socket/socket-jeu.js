const connection = require('./socket-connection');
const chat = require('./socket-chat');
const gameData = require('../model/gameData');

game = (socket) => {

    socket.on('game-start', () => {
        gameData.startGame();
        socket.broadcast.emit('game-start');        
    })

    connection(socket);
    chat(socket);
};

module.exports = game;