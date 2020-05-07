import React from 'react';
import { Line, Circle } from 'rc-progress';
import { inherits } from 'util';

class Health extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    let trailColor="red";
    let strokeColor="green";
    if(this.props.hp === 100){
      trailColor="green";
    }
    else if(this.props.hp === 0){
      strokeColor="red";
    }

    return <Line strokeLinecap="square" percent={this.props.hp} strokeWidth="10" trailWidth="10"  trailColor={trailColor} strokeColor={strokeColor}/>;
  }

}
export default Health;

