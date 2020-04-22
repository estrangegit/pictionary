const gamePlayerList = function (socket) {
    let $participantList = $('#participantList');
    let $scoreList = $('#scoreList');
    let pseudo = $participantList.data('pseudo');

    socket.on('participant-list', function (participantList) {
        let htmlParticipantList = participantList.map(participant => {
            if (participant.pseudo === pseudo) {
                return '<span class="pseudo-user">' + participant.pseudo + '</span>';
            } else {
                return '<span>' + participant.pseudo + '</span>'
            }
        });

        let htmlScoreList = participantList.map(participant => {
            if (participant.pseudo === pseudo) {
                return '<span class="pseudo-user">' + participant.pseudo + '</span><span>: ' + participant.score + '</span>';
            } else {
                return '<span>' + participant.pseudo + ': </span><span>' + participant.score + '</span>';
            }
        });

        $participantList.html('<span>Liste des participants</span></br>' + htmlParticipantList.join(', '));
        $scoreList.html('<span>Score des joueurs</span></br>' + htmlScoreList.join(', '));
    })
};
