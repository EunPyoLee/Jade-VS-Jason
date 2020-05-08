import React from 'react';

// import './App.css';


export type IntroPropType = {};

class Intro extends React.Component<IntroPropType>{
  constructor(props : IntroPropType){
    super(props);
    this.state = {};
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className="">
         <h2>Jason Eun Pyo Lee</h2>
              <p>BS Computer Science (University of Michigan - Ann Arbor Class of 2020 / Expected Graduation Date : December 2020)</p>
              <p>Currently Software Engineer Intern at <a href="https://www.lingco.io/" target="_blank">Lingco Language Lab</a></p>
              <p>Full Stack Developer</p>
      </div>
    );
  }
  
}

export default Intro;

