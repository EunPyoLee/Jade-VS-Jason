import React from 'react';
import Thumbnail, { Nickname }  from './Thumbnail'
import './App.css';

type AppPropType = {};

class App extends React.Component<AppPropType, { nicknames: Array<Nickname>}>{
  constructor(props : AppPropType){
    super(props);
    this.state = {
      nicknames: []
    };
  }

  componentDidMount(){
    this.setState({nicknames: [{id : 0, name : "Programmer"}, {id : 1, name : "Home Cook"}, {id : 2, name : "Just Dancer"}]});
  }

  render(){
    return (
      <div className="App">
        <Thumbnail nicknames={this.state.nicknames} />
      </div>
    );
  }
  
}

export default App;
