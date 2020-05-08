import React from 'react';
import Intro from './Intro';
// import './App.css';


export type AboutPropType = {};

class About extends React.Component<AboutPropType>{
  constructor(props : AboutPropType){
    super(props);
    this.state = {};
  }

  componentDidMount(){

  }

  render(){
    return (
      <div id="aboutId" className="">
          <h1>About Me</h1>
          <div className="row">
            <div className="col"><img src="profile_pic.jpg" alt="Profile Image"/></div>
            <div className="col">
              <Intro />
            </div>
          </div>
      </div>
    );
  }
  
}

export default About;

