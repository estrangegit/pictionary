$(function(){
    $gameOn = $('#game-on');
    $transitionPanel = $('#transition-panel');
    $gameOn.hide();
    $transitionPanel.hide();

    const socket = io.connect('http://localhost:8080');

    gameConnection(socket);
    gameSession(socket);
    gameChat(socket);
    gameWhiteboard(socket);
})
