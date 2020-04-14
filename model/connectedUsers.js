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
    getPseudoList : () => {
        return connectedUsers.users.map(user => user.pseudo);
    },
    getPseudoById: (id) => {
        let user = connectedUsers.users.find(user => user.id == id);        
        return user? user.pseudo : null;
    },
    doesPseudoExist: (pseudo) => {
        return connectedUsers.users
                .findIndex(user => pseudo.toUpperCase() === user.pseudo.toUpperCase()) != -1 ? true : false;
    }
}

module.exports = connectedUsers;