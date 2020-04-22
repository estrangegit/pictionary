const gameConnection = function (socket) {
    let $participantList = $('#participantList');
    let pseudo = $participantList.data('pseudo');
    socket.emit('new-user', pseudo);
};
