import React from 'react';
import Thumbnail, { Nickname } from './Thumbnail'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import Game from './Game.jsx'
import Health from './Health.jsx'
// import { myReduxState } from '../Reducers';
// import { reset, done, open, close } from '../Store/Game/Gameplay/Actions/gameActions';
// import { gameReducer } from '../Reducers/gameReducer';
import {addNormal} from '../Store/Gameplay/hpActions'
import {resetScreen, doneScreen, closeScreen, openScreen} from '../Store/Gamescreen/screenActions';
import '../Css/App.css';
import { finished } from 'stream';
import { connect } from 'react-redux';
// import { HPState, PlayActionTypes } from '../Store/Gameplay/types';
// import { ScreenState, ScreenActionTypes } from '../Store/Gamescreen/types';
// import { RootState } from '..';


// interface StateProps {
//   isDone: Boolean,
//   isClosed: Boolean
// }

// interface DispatchProps {
//   addNormal: (_isUser : Boolean) => void,
//   reset : () => void,
//   done : () => void,
//   close : () => void,
//   open : () => void
// }

// interface OwnProps{
// }
// type Props = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state) => {
  console.log(state);
  const {isDone , isClosed } = state.screenSystem;
  return {isDone: isDone , isCLose: isClosed};
}

const mapDispatchToProps = dispatch  => { 
  return{
    gpNormal: (_isUser) => dispatch(addNormal(_isUser)),
    gsClose: () => dispatch(closeScreen()),
    gsOpen: () => dispatch(openScreen()),
    gsDone: (_isUserWon) => dispatch(doneScreen(_isUserWon)),
    gsReset: () => dispatch(resetScreen())
  }
};

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      nicknames: []
    };
  }
  
  

  componentDidMount() {
    // const unsubscribe = this.props.store.subscribe(() => {
    //   this.setState({
    //     finished: this.props.store.getState().gameReducer.isDone,
    //     isClosed: this.props.store.getState().gameReducer.isClosed
    //   })
    // });
    this.setState({ nicknames: [{ id: 0, name: "Programmer" }, { id: 1, name: "Home Cook" }, { id: 2, name: "Just Dance Dancer" }] });
  }


  render() {
    return (
      <div className="App">
        <Thumbnail nicknames={this.state.nicknames} />

        <div className="gameContainer">
          {this.props.isClose ? "done" :
            <div className="hpContainer">
              <div className="gameprofile">Jason</div>
              <div className="hpLimiter">
                <Health store={this.props.store} side='user' />
              </div>

              <div className="gapBox"><button onClick={this.props.gsClose}>Close</button></div>
              <div className="hpLimiter comp">
                <Health store={this.props.store} side='comp' />
              </div>
              <div className="gameprofile">Jade</div>
            </div>
          }
          <canvas id="gameCanvas"></canvas>
        </div>


        {this.state.finished ? ""
          : <Game updateHp={(_isUser) => this.props.gpNormal()} />}
        <About />
        <Projects />
        <Contact />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
