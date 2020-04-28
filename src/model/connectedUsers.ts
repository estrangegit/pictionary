import User from './User';
import PseudoAndScore from './PseudoAndScore';

interface ConnectedUsers {
    users: User[];
    push(user: User): void;
    remove(pseudo: string): void;
    getPseudoAndScoreList(): PseudoAndScore[];
    getIdListWhoHasNotDrawn(): string[];
    getNbConnectedUsersWhoHasNotGuessed(): number;
    getPseudoById(id: string): string|null;
    doesPseudoExist(pseudo: string): boolean;
    addScoreById(id: string, score: number): void;
    setHasDrawnById(id: string, hasDrawn: boolean): void;
    setHasGuessedById(id: string, hasGuessed: boolean): void;
    initHasDrawn(hasDrawn: boolean): void;
    initHasGuessed(hasGuessed: boolean): void;
    initScores(score: number): void;
    getRandomUserWhoHasNotDrawn(): User|null;
}

const connectedUsers: ConnectedUsers = {
    users: [],
    push: (user: User): void => {
        if(typeof user === 'object' && user.id && user.pseudo) {
            connectedUsers.users.push(user);
        }
    },
    remove : (pseudo: string): void => {
        connectedUsers.users = connectedUsers.users.filter(user => user.pseudo != pseudo);
    },
    getPseudoAndScoreList : (): PseudoAndScore[] => {
        return connectedUsers.users.map(user => {return {pseudo: user.pseudo, score: user.score}});
    },
    getIdListWhoHasNotDrawn : (): string[] => {
        return connectedUsers.users.filter(user => user.hasDrawn == false).map(user => user.id);
    },
    getNbConnectedUsersWhoHasNotGuessed: (): number => {
        const userList = connectedUsers.users.filter(user => !user.hasGuessed);
        return userList.length - 1;
    },
    getPseudoById: (id: string): string|null => {
        const user = connectedUsers.users.find(user => user.id == id);
        return user? user.pseudo : null;
    },
    doesPseudoExist: (pseudo: string): boolean => {
        return connectedUsers.users
                .findIndex(user => pseudo.toUpperCase() === user.pseudo.toUpperCase()) != -1 ? true : false;
    },
    addScoreById: (id: string, score: number): void => {
        connectedUsers.users.forEach(user => {
            if(user.id == id){
                user.score += score;
            }
        })
    },
    setHasDrawnById: (id: string, hasDrawn: boolean): void => {
        connectedUsers.users.forEach(user => {
            if(user.id == id){
                user.hasDrawn = hasDrawn;
            }
        })
    },
    setHasGuessedById: (id: string, hasGuessed: boolean): void => {
        connectedUsers.users.forEach(user => {
            if(user.id == id){
                user.hasGuessed = hasGuessed;
            }
        })
    },
    initHasDrawn: (hasDrawn: boolean): void => {
        connectedUsers.users.forEach(user => {
            user.hasDrawn = hasDrawn;
        })
    },
    initHasGuessed: (hasGuessed: boolean): void => {
        connectedUsers.users.forEach(user => {
            user.hasGuessed = hasGuessed;
        })
    },
    initScores: (score: number): void => {
        connectedUsers.users.forEach(user => {
            user.score = score;
        })
    },
    getRandomUserWhoHasNotDrawn: (): User|null => {
        const filteredList = connectedUsers.users.filter(user => !user.hasDrawn);
        if(filteredList.length > 0)
            return filteredList[Math.floor(Math.random() * filteredList.length)];
        else
            return null;
    }
}

export default connectedUsers;
