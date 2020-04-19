$(function(){
    $gameOn = $('#game-on');
    $gameOn.hide();

    $gameLauncher = $('#game-launcher');

    const socket = io.connect('http://localhost:8080');

    $gameLauncher.click(() => {
        $.fn.initialization();        
        socket.emit('game-start');
    })

    socket.on('game-start', function(){
        $.fn.initialization();
    })

    $.fn.connection(socket);
    $.fn.chat(socket);
    $.fn.whiteboard(socket);
})