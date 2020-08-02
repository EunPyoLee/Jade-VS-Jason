import React from 'react';
import Thumbnail, { Nickname } from './Thumbnail'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import Game from './Game.jsx'
import Health from './Health.jsx'
import Win from './Win.jsx'
import { addNormal } from '../Store/Gameplay/hpActions'
import { resetScreen, doneScreen, closeScreen, openScreen } from '../Store/Gamescreen/screenActions';
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

const soundObj = {
  "background" : new Audio('backgroundmusic.wav'),
  "ending" : new Audio('endingbackground.wav')
}
let backgroundmusic = soundObj["background"];

const mapStateToProps = (state) => {
  console.log(state);
  const { isDone, isClosed, isUserWinner } = state.screenSystem;
  return { isDone: isDone, isClosed: isClosed, isUserWinner: isUserWinner };
}

const mapDispatchToProps = dispatch => {
  return {
    gsClose: () => dispatch(closeScreen()),
    gsOpen: () => {dispatch(openScreen()); dispatch(resetScreen())},
    gsDone: (_isUserWon) => dispatch(doneScreen(_isUserWon)),
    gsReset: () => {dispatch(resetScreen())}
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nicknames: [],
      soundOn : false
    };
    this.soundHandler = this.soundHandler.bind(this);
  }



  componentDidMount() {
    backgroundmusic.playbackRate = 0.8;
    backgroundmusic.volume = 0.02;
    soundObj["ending"].playbackRate = 1.2;
    soundObj["ending"].volume = 0.05;
    this.setState({ nicknames: [{ id: 0, name: "Programmer" }, { id: 1, name: "Home Cook" }, { id: 2, name: "Just Dance Dancer" }] });
  }

  
  soundHandler(){
    if(!this.state.soundOn){
      console.log("play");
      backgroundmusic.play();
      backgroundmusic.loop = true;
    }
    else{
      console.log("pause");
      backgroundmusic.pause();
      backgroundmusic.currentTime = 0;
    }
    this.setState(prevState=>({
      soundOn : prevState.soundOn ? false : true
    }));
  }
  

  render() {
    if(this.props.isDone){
      backgroundmusic.pause();
      backgroundmusic.currentTime = 0;
      backgroundmusic = soundObj["ending"];
      if(this.state.soundOn){
        backgroundmusic.play();
      }
    }else{
      backgroundmusic.pause();
      backgroundmusic.currentTime = 0;
      backgroundmusic = soundObj["background"];
      if(this.state.soundOn){
        backgroundmusic.play();
      }

    }
    console.log("App.jsx");
    return (
      <div className="App">
        <Thumbnail nicknames={this.state.nicknames} />
        {this.props.isClosed ? <button className="openBTN" onClick={this.props.gsOpen}>Play "Jason VS Jade" </button> :
          this.props.isDone ?
            <div className="gameContainer"><Win/></div>:
            <div className="gameContainer">
              <div className="hpContainer">
                <div className="gameprofile">Jason</div>
                <div className="hpLimiter">
                  <Health store={this.props.store} side='user' />
                </div>

                <div className="gapBox"><button className="closeBTN" onClick={this.props.gsClose}>Close "Jason VS Jade"</button> <button className="closeBTN" onClick={this.soundHandler}>{this.state.soundOn? "🙅 Sound OFF" : "🎵 Sound ON"}</button></div>
                <div className="hpLimiter comp">
                  <Health store={this.props.store} side='comp' />
                </div>
                <div className="gameprofile">Jade</div>
              </div>
              <canvas id="gameCanvas"></canvas>
              <Game />
            </div>
        }


        <About />
        <Projects />
        <Contact />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
