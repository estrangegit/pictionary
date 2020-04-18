(function($){
    $.fn.connection = function(socket){
        $gameOn = $('#game-on');
        $gameWaiting = $('#game-waiting');

        $participantList = $('#participantList');
    
        let pseudo = $participantList.data('pseudo');
    
        socket.emit('new-user', pseudo);
    
        socket.on('participant-list', function(participantList) {
            let htmlParticipantList = participantList.map(participantPseudo => {
                if(participantPseudo === pseudo){
                    return '<span class="pseudo-user">' + participantPseudo + '</span>';
                } else {
                    return '<span>' + participantPseudo + '</span>'
                }
            });
            $participantList.html('<span>Liste des participants</span></br>' + htmlParticipantList.join(', '));
        })

        socket.on('state-game', function(hasGameStarted) {
            if(hasGameStarted){
                $gameWaiting.hide();
                $gameOn.show();
            }
        })
    };
})(jQuery)