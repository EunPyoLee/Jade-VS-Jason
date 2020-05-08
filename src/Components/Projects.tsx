import React from 'react';

// import './App.css';


export type ProjectPropType = {};
export type Project = {
  title : string,
  content : string
};
class Projects extends React.Component<ProjectPropType, { projects: Array<Project>}>{
  constructor(props : ProjectPropType){
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount(){
    let _projects : Array<Project> = []
  }

  render(){
    return (
      <div id="projectId" className="">
          <h1>My Projects</h1>
      </div>
    );
  }
  
}

export default Projects;

