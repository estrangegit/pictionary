const connectedUsers = require('../model/connectedUsers')

chat = (socket) => {
  socket.on('new-proposal', (proposal) => {
    let pseudo = connectedUsers.getPseudoById(socket.id);
    socket.broadcast.emit('new-proposal', {
      pseudo: pseudo,
      proposal: proposal
    });
  });
};

module.exports = chat;