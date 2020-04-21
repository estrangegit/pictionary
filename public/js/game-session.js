const gameSession = function(socket){
    $gameLauncher = $('#game-launcher');
    $sessionLauncher = $('#session-launcher');

    $gameLauncher.click(() => {
        socket.emit('game-start');
    })

    $sessionLauncher.click(() => {
        socket.emit('session-start');
    })

    socket.on('game-start', function(data){
        sessionInitialization(socket, data);
    })

    socket.on('session-start', function(){
        sessionStart();
    })
}