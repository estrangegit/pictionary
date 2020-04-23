const gameTransitions = function(socket){
    let $transitionButton = $('#transition-button');

    $transitionButton.click(() => {
        if($transitionButton.text() == BUTTON_TEXT_LANCER_PARTIE) {
            socket.emit('start-session');
        } else if($transitionButton.text() == BUTTON_TEXT_DESSINER_MOT) {
            socket.emit('start-draw');
        } else if($transitionButton.text() == BUTTON_TEXT_POURSUIVRE_JEU) {
            socket.emit('start-session');
        } else if($transitionButton.text() == BUTTON_TEXT_REJOUER) {
            socket.emit('init-game');
        }
    })

    socket.on('state-game', function (data) {
        if(!data.hasSessionStarted && !data.hasDrawStarted && !data.hasDrawEnded && !data.hasGameEnded){
            waitingRoom(socket, data);
        } else if (data.hasSessionStarted && !data.hasDrawStarted && !data.hasDrawEnded && !data.hasGameEnded) {
            sessionInitialization(socket, data);
        } else if (data.hasSessionStarted && data.hasDrawStarted && !data.hasDrawEnded && !data.hasGameEnded) {
            drawStart(socket, data);
        } else if (data.hasSessionStarted && data.hasDrawStarted && data.hasDrawEnded && !data.hasGameEnded) {
            drawEnd(socket, data);
        } else if(data.hasSessionStarted && data.hasDrawStarted && data.hasDrawEnded && data.hasGameEnded) {
            gameEnd(socket, data);
        }
    })
}
