import {ScreenActionTypes} from './types';

export function resetScreen() : ScreenActionTypes{
    return {
        type: "reset"
    }
}

export function doneScreen(_isUser : boolean) : ScreenActionTypes {
    return{
        type: "done",
        isUser: _isUser
    }
}

export function closeScreen() : ScreenActionTypes{
    return{
        type: "close"
    }
}

export function openScreen() : ScreenActionTypes{
    return{
        type: "open"
    }
}