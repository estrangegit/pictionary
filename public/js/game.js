$(function(){
    $gameOn = $('#game-on');
    $transitionPanel = $('#transition-panel');
    $gameOn.hide();
    $transitionPanel.hide();

    const socket = io.connect('http://localhost:8080');

    gameConnection(socket);
    gamePlayerList(socket);
    gameTransitions(socket);
    gameChat(socket);
    gameWhiteboard(socket);
})
