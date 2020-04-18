$(function(){
    $gameOn = $('#game-on');
    $gameWaiting = $('#game-waiting');
    $gameLauncher = $('#game-launcher');

    $gameOn.hide();

    const socket = io.connect('http://localhost:8080');

    $gameLauncher.click(() => {
        $gameWaiting.hide();
        $gameOn.show();
        socket.emit('game-start');
    })

    socket.on('game-start', function(){
        $gameWaiting.hide();
        $gameOn.show();
    })

    $.fn.connection(socket);
    $.fn.chat(socket);
})