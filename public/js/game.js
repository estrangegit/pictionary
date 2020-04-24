$(function(){
    const $gameOn = $('#game-on');
    const $transitionPanel = $('#transition-panel');

    $transitionPanel.hide();
    $gameOn.hide();

    const socket = io.connect('http://localhost:8080');

    gameConnection(socket);
    gamePlayerList(socket);
    gameTransitions(socket);
    gameChat(socket);
    gameWhiteboard(socket);
})
