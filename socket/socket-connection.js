const connectedUsers = require('../model/connectedUsers')

connection = (socket) => {
    socket.emit('message', 'Vous êtes bien connecté !');

    socket.on('new-user', (pseudo) => {
        connectedUsers.push({pseudo: pseudo, id:socket.id});
        socket.broadcast.emit('message', pseudo + ' vient de se connecter');
    });

    socket.on('message', (message) => {
        let pseudo = connectedUsers.getPseudoById(socket.id);
        console.log(pseudo + ' me parle ! Il me dit : ' + message);
    }); 

    socket.on('disconnect', () => {
        let pseudo = connectedUsers.getPseudoById(socket.id);
        connectedUsers.remove(pseudo);
        socket.broadcast.emit('message', pseudo + ' vient de se déconnecter');
    });
};

module.exports = connection;

