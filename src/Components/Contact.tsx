import React from 'react';

// import './App.css';


export type ContactPropType = {};

class Contact extends React.Component<ContactPropType>{
  constructor(props : ContactPropType){
    super(props);
    this.state = {};
  }

  componentDidMount(){

  }

  render(){
    return (
      <div id="contactId" className="">
          <h1>Contact Info</h1>
          <p><a href="mailto:eunpyolee0420@gmail.com">eunpyolee0420@gmail.com</a></p>
          <p>
            <a href="https://www.linkedin.com/in/eun-pyo-jason-lee-86466214b/" target="_blank">LinkedIn</a> | <a href="https://github.com/EunPyoLee?tab=repositories" target="_blank">Github</a> | <a href="Resume_word_no_addr.pdf" download="Resume_Jason Lee">Resume</a>
          </p>
      </div>
    );
  }
  
}

export default Contact;

