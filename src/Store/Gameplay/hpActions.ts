import {PlayActionTypes} from './types'

export function addNormal(_isUser : boolean) : PlayActionTypes {
    return {
        type: "normal",
        isUser: _isUser
    }
}