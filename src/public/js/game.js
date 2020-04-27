$(function(){
    const $gameOn = $('#game-on');
    const $transitionPanel = $('#transition-panel');

    $transitionPanel.hide();
    $gameOn.hide();

    const socket = io.connect('http://' + env.SERVER_HOST_NAME + ':' + env.SERVER_PORT);

    gameConnection(socket);
    gamePlayerList(socket);
    gameTransitions(socket);
    gameChat(socket);
    gameWhiteboard(socket);
})
