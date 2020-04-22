const gameSession = function(socket){
    $transitionButton = $('#transition-button');

    $transitionButton.click(() => {
        if($transitionButton.text() == BUTTON_TEXT_LANCER_PARTIE) {
            socket.emit('game-start');
        } else if($transitionButton.text() == BUTTON_TEXT_DESSINER_MOT) {
            socket.emit('session-start');
        }
    })

    socket.on('game-start', function(data){
        sessionInitialization(socket, data);
    })

    socket.on('session-start', function(data){
        sessionStart(socket, data);
    })
}
