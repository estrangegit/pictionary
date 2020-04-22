const gameTransitions = function(socket){
    let $transitionButton = $('#transition-button');

    $transitionButton.click(() => {
        if($transitionButton.text() == BUTTON_TEXT_LANCER_PARTIE) {
            socket.emit('game-start');
        } else if($transitionButton.text() == BUTTON_TEXT_DESSINER_MOT) {
            socket.emit('session-start');
        } else if($transitionButton.text() == BUTTON_TEXT_POURSUIVRE_JEU) {
            socket.emit('game-start');
        } else if($transitionButton.text() == BUTTON_TEXT_REJOUER) {
            socket.emit('game-init');
        }
    })

    socket.on('state-game', function (data) {
        if(!data.hasGameStarted && !data.hasSessionStarted && !data.hasSessionEnded && !data.hasGameEnded){
            waitingRoom();
        } else if (data.hasGameStarted && !data.hasSessionStarted && !data.hasSessionEnded && !data.hasGameEnded) {
            sessionInitialization(socket, data);
        } else if (data.hasGameStarted && data.hasSessionStarted && !data.hasSessionEnded && !data.hasGameEnded) {
            sessionStart(socket, data);
        } else if (data.hasGameStarted && data.hasSessionStarted && data.hasSessionEnded && !data.hasGameEnded) {
            sessionEnd(socket, data);
        } else if(data.hasGameStarted && data.hasSessionStarted && data.hasSessionEnded && data.hasGameEnded) {
            gameEnd(socket, data);
        }
    })
}
