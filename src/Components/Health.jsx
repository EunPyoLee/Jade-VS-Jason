import React from 'react';
import { Line, Circle } from 'rc-progress';
import { inherits } from 'util';


class Health extends React.Component {
  constructor(props) {
    super(props);
    const {store, side} = this.props;
    const curState = store.getState();
    this.state = {
      curHP : (side==='user' ? curState.hpReducer.userHP : curState.hpReducer.compHP),
      side : side
    };
  }

  componentDidMount() {
    const unsubscribe = this.props.store.subscribe(
      () => {
        const curState = this.props.store.getState();
        const newHP = (this.state.side==='user' ? curState.hpReducer.userHP : curState.hpReducer.compHP);
        this.setState({curHP: newHP});
      }
    )
  }

  render() {
    let trailColor="#33313b";
    let strokeColor="#2b580c";
    if(this.state.curHP === 100){
      trailColor="#2b580c";
    }
    else if(this.state.curHP=== 0){
      strokeColor="#33313b";
    }

    return <Line strokeLinecap="square" percent={this.state.curHP} strokeWidth="10" trailWidth="10"  trailColor={trailColor} strokeColor={strokeColor}/>;
  }

}
export default Health;

