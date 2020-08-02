import {ScreenState, ResetAction, DoneAction, CloseAction, OpenAction} from './types';

type ScreenActionTypes = ResetAction | DoneAction | CloseAction | OpenAction;

const initGameState : ScreenState = {
    isDone: false,
    isClosed: false,
    isUserWinner: false
};

export function screenReducer(prevGameState = initGameState, action: ScreenActionTypes) : ScreenState{
    switch (action.type) {
        case 'reset':
            console.log("reset");
            return { isDone: false, isClosed: false, isUserWinner: false };
        case 'done':
            return { isDone: true , isClosed: false, isUserWinner: (<DoneAction>action).isUser ? true : false};
        case 'close':
            return { isDone: true, isClosed: true, isUserWinner: false};
        case 'open':
            return { isDone: false, isClosed: false, isUserWinner: false};
      default:
            //Always return prevState(here, hpState) for any unknown action
            return prevGameState;
    }
}