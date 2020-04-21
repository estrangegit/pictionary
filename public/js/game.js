$(function(){
    $gameOn = $('#game-on');
    $gameOn.hide();

    $gameLauncher = $('#game-launcher');

    const socket = io.connect('http://localhost:8080');

    $gameLauncher.click(() => {
        gameInitialization();
        socket.emit('game-start');
    })

    socket.on('game-start', function(){
        gameInitialization();
    })

    gameConnection(socket);
    gameChat(socket);
    gameWhiteboard(socket);
})