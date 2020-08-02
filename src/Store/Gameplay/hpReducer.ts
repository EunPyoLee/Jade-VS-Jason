import { HPState, PlayActionTypes } from './types';

const initialState: HPState = {
  userHP: 100,
  compHP: 100
}

export function hpReducer(prevHPState = initialState, action: PlayActionTypes): HPState {
  switch (action.type) {
    case 'normal':
      if (action.isUser) {
        return Object.assign({}, prevHPState, {
          userHP: prevHPState.userHP - 100
        });
      }
      else {
        return Object.assign({}, prevHPState, {
          compHP: prevHPState.compHP - 100
        });
      }
    case 'reset':
      return Object.assign({}, prevHPState, {
        userHP : 100,
        compHP : 100
      });
    default:
      //Always return prevState(here, hpState) for any unknown action
      return prevHPState
  }
}

