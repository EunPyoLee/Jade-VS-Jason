import React from 'react';
import Matter from 'matter-js';
// import './App.css';


function percentX(percent) {
  return Math.round(percent / 100 * window.innerWidth);
}
function percentXtoRender(percent, renderWidth){
  return Math.round(percent / 100 * renderWidth);
}
function percentY(percent) {
  return Math.round(percent / 100 * window.innerHeight);
}
function percentYtoRender(percent, renderHeight){
  return Math.round(percent / 100 * renderHeight);
}

class Game extends React.Component {
  constructor(props) {
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
    let renderWidth = percentX(100);
    let renderHeight = percentY(100);
    var render = Render.create({
      canvas: document.querySelector('#gameCanvas'),
      engine: engine,
      options: {
        width: renderWidth,
        height: renderHeight,
        wireframes: false
      }
    });

    

    Render.run(render);
    var runner = Runner.create();
    Runner.run(runner, engine);


    var ground = Bodies.rectangle(150, 600, percentXtoRender(100, renderWidth), 50, { isStatic: true }),
      rockOptions = { density: 0.004, restitution: 0.8 },
      rock1 = Bodies.circle(percentXtoRender(0, renderWidth), percentYtoRender(50, renderHeight), 10, rockOptions),
      anchor1 = { x: percentXtoRender(0, renderWidth), y:percentYtoRender(50, renderHeight)},
      elastic1 = Constraint.create({
        pointA: anchor1,
        bodyB: rock1,
        stiffness: 0.05
      }),
      rock2 = Bodies.circle(percentXtoRender(51, renderWidth), percentYtoRender(50, renderHeight), 10, rockOptions),
      anchor2 = { x: percentXtoRender(51, renderWidth), y:percentYtoRender(50, renderHeight)},
      elastic2 = Constraint.create({
        pointA: anchor2,
        bodyB: rock2,
        stiffness: 0.05
      });

    var ground2 = Bodies.rectangle(percentXtoRender(25, renderWidth), percentYtoRender(40, renderHeight), 25, 400, { isStatic: true });
    World.add(engine.world, [ground, ground2, rock1, rock2, elastic1, elastic2]);

    Events.on(engine, 'afterUpdate', function () {
      if (mouseConstraint.mouse.button === -1 && (Math.abs(rock1.position.x - 10) > 20 || Math.abs(rock2.position.y - 480) > 10)) {
        rock1 = Bodies.circle(percentXtoRender(0, renderWidth), percentYtoRender(50, renderHeight), 10, rockOptions);
        // World.add(engine.world, rock);
        elastic1.bodyB = rock1;
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
      }
      );

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      position: {x : 500, y: 500},
      min: { x: 0, y: 0 },
      max: { x: 1000, y: 600 }
    }
    );



  }

  render() {
    return <div ref="scene" />;
  }

}

export default Game;

