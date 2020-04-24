import React from 'react';

// import './App.css';

export type Nickname = {
    id : number,
    name: string
}
type ThumbnailPropType = { nicknames : Array<Nickname>};

class Thumbnail extends React.Component<ThumbnailPropType>{
  constructor(props : ThumbnailPropType){
    super(props);
    this.state = {};
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className="">
          <h1>Hi, I'm Jason</h1>
          <ul>
              {this.props.nicknames.map(nickname => (
                  <li key={nickname.id}>{nickname.name}</li>
              ))}
          </ul>
      </div>
    );
  }
  
}

export default Thumbnail;

