import React from 'react';
import { createStore, combineReducers, Reducer} from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './Css/index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import {hpReducer} from './Store/Gameplay/hpReducer';
import {screenReducer} from './Store/Gamescreen/screenReducer';

//React.StrictMode link https://reactjs.org/docs/strict-mode.html
// export interface ApplicationState{
//   HPState : HPState,
//   ScreenState : ScreenState
// }

export const rootReducers = combineReducers({
  hpSystem: hpReducer,
  screenSystem: screenReducer
});

// export interface RootState{
//   hpSystem : HPState,
// }

// export type RootState = ReturnType<typeof rootReducers> 
//{hySystem : hpReducer, screenSystem : screenReducer}

let store = createStore(rootReducers);

//subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => {console.log("HP state changed"); console.log(store.getState())});

//just call unsunbscribe() to stop listening
ReactDOM.render(
    <Provider store={store}>
    <App store={store}/>
    </Provider>,
  document.getElementById('reactEntry')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


// serviceWorker.unregister();
