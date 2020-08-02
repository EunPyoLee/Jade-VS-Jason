interface AddDamageAction{
    type: String,
    isUser: Boolean
}

export interface HPState{
    userHP : number,
    compHP : number
}

export type PlayActionTypes = AddDamageAction