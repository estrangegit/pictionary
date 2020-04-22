const sessionStart = function (socket, data) {
    $gameOn = $("#game-on");
    $gameWaiting = $("#game-waiting");
    $gameShowWord = $("#game-show-word");
    $color = $('.color');
    $cleanWhiteboard = $('.clean-whiteboard');
    $chatProposal = $('#chatProposal');

    $gameWaiting.hide();
    $gameShowWord.hide();
    $gameOn.show();

    if(socket.id == data.drawer.id){
        $chatProposal.hide();
        let colorWidth = $(".color").width();
        $(".color").css({ height: colorWidth + "px" });
        $(".clean-whiteboard").css({ height: colorWidth + "px" });
    } else {
        $color.hide();
        $cleanWhiteboard.hide();
    }

};

const sessionInitialization = function (socket, data) {
    $gameOn = $("#game-on");
    $gameWaiting = $("#game-waiting");
    $gameShowWord = $("#game-show-word");
    $messageRole = $('#message-role');
    $sessionLauncher = $('#session-launcher');

    let message = ''
    if(socket.id == data.drawer.id) {
        message = 'Vous devez faire deviner le mot ' + data.wordToGuess;
    } else {
        message = data.drawer.pseudo + ' est en train de lire le mot à dessiner';
        $sessionLauncher.hide();
    }
    $messageRole.text(message);

    $gameOn.hide();
    $gameWaiting.hide();
    $gameShowWord.show();
};
