import React from 'react';
import Thumbnail, { Nickname } from './Thumbnail'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import Game from './Game.jsx'
import Health from './Health.jsx'
import '../Css/App.css';

type AppPropType = {};

class App extends React.Component<AppPropType, { nicknames: Array<Nickname>, userHp: Number, compHp: Number }>{
  constructor(props: AppPropType) {
    super(props);
    this.state = {
      nicknames: [],
      userHp: 100,
      compHp: 100
    };
    this.updateHp = this.updateHp.bind(this);
  }

  componentDidMount() {
    this.setState({ nicknames: [{ id: 0, name: "Programmer" }, { id: 1, name: "Home Cook" }, { id: 2, name: "Just Dance Dancer" }] });
  }

  updateHp(isUserTurn : boolean){
    console.log(isUserTurn);
    if(isUserTurn){
      this.setState((prevState : any) => ({compHp: prevState.compHp - 10}));
    }
    else{
      this.setState((prevState : any) => ({userHp: prevState.userHp - 10}));
    }
  }



  render() {
    return (
      <div className="App">
        <Thumbnail nicknames={this.state.nicknames} />

        <div className="gameContainer">
          <div className="hpContainer">
            <div className="hpLimiter"><Health side="user" hp={this.state.userHp}/></div>
            <div className="gapBox"></div>
            <div className="hpLimiter comp"><Health side="comp" hp={this.state.compHp}/></div>
          </div>
          <canvas id="gameCanvas"></canvas>
        </div>


        <Game updateHp={this.updateHp} />
        <About />
        <Projects />
        <Contact />
      </div>
    );
  }

}

export default App;
