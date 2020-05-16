import React from 'react';
import { createStore, combineReducers} from 'redux';
import ReactDOM from 'react-dom';
import './Css/index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import {hpReducer} from './Reducers/hpReducer';

//React.StrictMode link https://reactjs.org/docs/strict-mode.html
const hpHandler = combineReducers({
  hpReducer
});
let store = createStore(hpHandler);

//subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => {console.log("HP state changed"); console.log(store.getState())});

//just call unsunbscribe() to stop listening
ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('reactEntry')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
