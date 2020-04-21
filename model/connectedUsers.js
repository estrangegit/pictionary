let connectedUsers = {
    users: [],
    push: (user) => {
        if(typeof user === 'object' && user.id && user.pseudo) {
            connectedUsers.users.push(user);
        }
    },
    remove : (pseudo) => {
        connectedUsers.users = connectedUsers.users.filter(user => user.pseudo != pseudo);
    },
    getPseudoAndScoreList : () => {
        return connectedUsers.users.map(user => {return {pseudo: user.pseudo, score: user.score}});
    },
    getIdListWhoHasNotDrawn : () => {
        return connectedUsers.users.filter(user => user.hasDrawn == false).map(user => user.id);
    },
    getPseudoById: (id) => {
        let user = connectedUsers.users.find(user => user.id == id);
        return user? user.pseudo : null;
    },
    doesPseudoExist: (pseudo) => {
        return connectedUsers.users
                .findIndex(user => pseudo.toUpperCase() === user.pseudo.toUpperCase()) != -1 ? true : false;
    },
    addScoreById: (id, score) => {
        connectedUsers.users.forEach(user => {
            if(user.id == id){
                user.score += score;
            }
        })
    },
    setHasDrawnById: (id, hasDrawn) => {
        connectedUsers.users.forEach(user => {
            if(user.id == id){
                user.hasDrawn = hasDrawn;
            }
        })
    },
    getRandomUserWhoHasNotDrawn: () => {
        let filteredList = connectedUsers.users.filter(user => !user.hasDrawn);
        return filteredList[Math.floor(Math.random() * filteredList.length)];
    }
}

module.exports = connectedUsers;