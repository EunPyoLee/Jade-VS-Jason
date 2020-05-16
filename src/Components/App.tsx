import React from 'react';
import Thumbnail, { Nickname } from './Thumbnail'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import Game from './Game.jsx'
import Health from './Health.jsx'
import {addNormal} from '../Actions/hpActions';
import '../Css/App.css';

type AppPropType = {
  store : any
};

class App extends React.Component<AppPropType, { nicknames: Array<Nickname>, userHp: Number, compHp: Number }>{
  constructor(props: AppPropType) {
    super(props);
    this.state = {
      nicknames: [],
      userHp: 100,
      compHp: 100
    };
  }

  componentDidMount() {
    this.setState({ nicknames: [{ id: 0, name: "Programmer" }, { id: 1, name: "Home Cook" }, { id: 2, name: "Just Dance Dancer" }] });
  }


  render() {
    return (
      <div className="App">
        <Thumbnail nicknames={this.state.nicknames} />

        <div className="gameContainer">
          <div className="hpContainer">
            <div className="gameprofile">Jason</div>
            <div className="hpLimiter">
              <Health store={this.props.store} side='user'/>
            </div>
            <div className="gapBox"></div>
            <div className="hpLimiter comp">
            <Health store={this.props.store} side='comp'/>
            </div>
            <div className="gameprofile">Jade</div>
          </div>
          <canvas id="gameCanvas"></canvas>
        </div>


        <Game updateHp={(_isUser : boolean) => this.props.store.dispatch(addNormal(_isUser))}/>
        <About />
        <Projects />
        <Contact />
      </div>
    );
  }

}

export default App;
