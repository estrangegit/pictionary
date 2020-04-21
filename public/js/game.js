$(function(){
    $gameOn = $('#game-on');
    $gameShowWord = $('#game-show-word');
    $gameOn.hide();
    $gameShowWord.hide();

    const socket = io.connect('http://localhost:8080');

    gameConnection(socket);
    gameSession(socket);
    gameChat(socket);
    gameWhiteboard(socket);
})
