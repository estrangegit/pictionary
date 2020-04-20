const connectedUsers = require('../model/connectedUsers')
const socketConstants = require('../model/socketConstants');

chat = (socket) => {
  socket.on(socketConstants.NEW_PROPOSAL, (proposal) => {
    let pseudo = connectedUsers.getPseudoById(socket.id);
    socket.broadcast.emit(socketConstants.NEW_PROPOSAL, {
      pseudo: pseudo,
      proposal: proposal
    });
  });
};

module.exports = chat;