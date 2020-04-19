const gameData = require('../model/gameData');

whiteboard = (socket) => {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
    
    socket.on('clean-whiteboard', () => {
        socket.broadcast.emit('clean-whiteboard');
    })
};

module.exports = whiteboard;