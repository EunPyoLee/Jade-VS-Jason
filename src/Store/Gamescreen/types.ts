export interface ResetAction {
    type: String
}

export interface DoneAction {
    type: String,
    isUser: Boolean
}

export interface CloseAction {
    type: String
}

export interface OpenAction {
    type: String
}

export interface ScreenState{
    isDone : Boolean,
    isClosed : Boolean,
    isUserWinner: Boolean
}

export type ScreenActionTypes = ResetAction | DoneAction | CloseAction | OpenAction;