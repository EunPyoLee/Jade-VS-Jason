import React from 'react';
import Matter, { IMouseConstraintDefinition } from 'matter-js';
// import './App.css';


export type GmaePropType = {};

class Game extends React.Component<GmaePropType>{
  constructor(props : GmaePropType){
    super(props);
    this.state = {};
    
  }

  componentDidMount() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Events = Matter.Events,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    var engine = Engine.create(),
        world = engine.world;
  

   // create renderer
   var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1400,
        height: 600,
        wireframes: false
    }
  });

  Render.run(render);
  var runner = Runner.create();
      Runner.run(runner, engine);

    
  var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
    rockOptions = { density: 0.004, restitution: 0.8 },
    rock = Bodies.circle(170, 450, 20, rockOptions),
    anchor = { x: 170, y: 450 },
    elastic = Constraint.create({ 
        pointA: anchor, 
        bodyB: rock, 
        stiffness: 0.05
    });

    var ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });
  World.add(engine.world, [ground, ground2, rock, elastic] as Matter.Body[]);
   
  Events.on(engine, 'afterUpdate', function() {
      if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
          rock = Bodies.circle(170, 450, 20, rockOptions);
          World.add(engine.world, rock);
          elastic.bodyB = rock;
      }
  });

  // add mouse control
  var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
          stiffness: 0.2,
          render: {
              visible: false
          }
      }
    } as IMouseConstraintDefinition
  );

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
// render.mouse = mouse as Matter.Mouse;

// fit the render viewport to the scene
// Render.lookAt(render, {
//   min: { x: 0, y: 0 },
//   max: { x: 800, y: 600 }
// });



}

  render() {
    return <div ref="scene" />;
  }
  
}

export default Game;

