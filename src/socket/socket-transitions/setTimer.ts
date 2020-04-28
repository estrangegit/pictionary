import gameData from '../../model/gameData';
import { Socket } from 'socket.io';

const setTimer = (delay: number, stepNumber: string | null, transition: Function, socket: Socket): void => {
    setTimeout(function(oldStepNumber){
        if(oldStepNumber == gameData.getStepNumber()){
            transition(socket);
        }
    }, delay, stepNumber);
}

export default setTimer;
