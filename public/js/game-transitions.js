const sessionStart = function () {
    $gameOn = $("#game-on");
    $gameWaiting = $("#game-waiting");
    $gameShowWord = $("#game-show-word");

    $gameWaiting.hide();
    $gameShowWord.hide();
    $gameOn.show();

    let colorWidth = $(".color").width();
    $(".color").css({ height: colorWidth + "px" });
    $(".clean-whiteboard").css({ height: colorWidth + "px" });
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
