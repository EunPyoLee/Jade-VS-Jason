import React from 'react';
import { Line, Circle } from 'rc-progress';
import { inherits } from 'util';
import {resetScreen, doneScreen} from '../Store/Gamescreen/screenActions';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  console.log(state);
  const {userHP , compHP } = state.hpSystem;
  return {userHP: userHP , compHP: compHP};
}

const mapDispatchToProps = dispatch  => { 
  return{
    gsDone: (_isUserWon) => dispatch(doneScreen(_isUserWon)),
    gsReset: () => dispatch(resetScreen())
  }
};

class Health extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    console.log("Health.jsx");
    let trailColor="#33313b";
    let strokeColor="#2b580c";
    const curHP = (this.props.side==='user' ? this.props.userHP : this.props.compHP);
    if(curHP === 100){
      trailColor="#2b580c";
    }
    else if(curHP === 0){
      strokeColor="#33313b";
      if(this.props.side === 'user'){
        this.props.gsDone(false);
      }
      else{
        this.props.gsDone(true);
      }
    }

    return <Line strokeLinecap="square" percent={curHP} strokeWidth="10" trailWidth="10"  trailColor={trailColor} strokeColor={strokeColor}/>;
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Health);

