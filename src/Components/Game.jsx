import React from 'react';
import Matter from 'matter-js';
// import * as PIXI from 'pixi.js';
// import PixiApngAndGif from 'pixi-apngandgif';
import rockImg from './Gameimages/rock.png';
import jason_start  from './Gameimages/jason_start.gif';
import jade_start from './Gameimages/jade_start.gif';
import jason_miss from './Gameimages/jason_miss.gif';
import jade_miss from './Gameimages/jade_miss.gif';
import jason_hit from './Gameimages/jason_hit.gif';
import jade_hit from './Gameimages/jade_hit.gif';
import backgroundImg from './Gameimages/background2.jpeg';
import towerImg from './Gameimages/tower.png';

function percentXtoRender(percent, renderWidth) {
  return (percent / 100 * renderWidth);
}

function percentYtoRender(percent, renderHeight) {
  return (percent / 100 * renderHeight);
}

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const images = {
      "userStart" : jason_start,
      "userMiss" : jason_miss,
      "userHit" : jason_hit,
      "compStart" : jade_start,
      "compMiss" : jade_miss,
      "compHit" : jade_hit,
      "rock" : rockImg,
      "background" : backgroundImg,
      "tower" : towerImg
    }

    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Events = Matter.Events,
      Constraint = Matter.Constraint,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;
    var engine = Engine.create({
      enableSleeping: true
    }),
      world = engine.world;


    // create renderer
    let renderWidth = 900;
    let renderHeight = 600;
    let render = Render.create({
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
    let gridBackground = Bodies.rectangle(500, 300, 1, 1, {
      isStatic: true,
      isSensor: false,
      render: {
          sprite: {
              texture: images['background'],
              xScale: 1.8,
              yScale: 1.75,
          }
      }
  });
    const ground = Bodies.rectangle(renderWidth / 2.0, renderHeight + 110, renderWidth * 50, 200, { isStatic: true });
    ground.label = "ground";
    ground.collisionFilter.group = 0;
    ground.collisionFilter.category = 0b1;
    ground.collisionFilter.mask = 0b110;
    const user = Bodies.trapezoid(percentXtoRender(13, renderWidth), percentYtoRender(94, renderHeight), 40, 150, 0.3, { isStatic: true });
    const userHead = Bodies.circle(percentXtoRender(13, renderWidth), percentYtoRender(90, renderHeight), 30);
    const compHead = Bodies.circle(percentXtoRender(97, renderWidth), percentYtoRender(90, renderHeight), 30);
    const userSprite = { texture: images["userStart"], xScale: 0.25, xOffset: 0.5, yScale: 0.3, yOffset: 1 };
    Matter.Body.setStatic(userHead, true);
    Matter.Body.setStatic(compHead, true);
    // console.log(app.stage.children[0]);
   
    
    const comp = Bodies.trapezoid(percentXtoRender(97, renderWidth), percentYtoRender(94, renderHeight), 40, 150, 0.3, { isStatic: true });
    const compSprite = { texture: images["compStart"], xScale: 0.25, xOffset: 0.5, yScale: 0.3, yOffset: 1 }
    userHead.render.sprite = userSprite;
    userHead.collisionFilter.group = 0;
    userHead.collisionFilter.mask = 0b0;
    compHead.render.sprite = compSprite;
    compHead.collisionFilter.group = 0;
    compHead.collisionFilter.mask = 0b0;
    user.collisionFilter.group = 0;
    user.collisionFilter.category = 0b1000;
    user.collisionFilter.mask = 0b100;
    user.label = "user";
    comp.collisionFilter.group = 0;
    comp.collisionFilter.category = 0b10000;
    comp.collisionFilter.mask = 0b10;
    comp.label = "comp";
    let rockOptions = { density: 0.004, restitution: 0.4, render: { sprite: { texture: images["rock"], xScale: 0.2, yScale: 0.3 } } };
    let rock1 = Bodies.circle(percentXtoRender(10, renderWidth), percentYtoRender(85, renderHeight), 8, rockOptions);
    rock1.label = "userRock";
    rock1.collisionFilter.group = 0;
    rock1.collisionFilter.category = 0b10;
    rock1.collisionFilter.mask = 0b110001;
    let anchor1 = { x: percentXtoRender(10, renderWidth), y: percentYtoRender(85, renderHeight) };
    let elastic1 = Constraint.create({
      pointA: anchor1,
      bodyB: rock1,
      stiffness: 0.06
    });
    let rock2 = Bodies.circle(percentXtoRender(100, renderWidth), percentYtoRender(85, renderHeight), 8, rockOptions);
    rock2.label = "compRock";
    rock2.collisionFilter.group = 0;
    rock2.collisionFilter.category = 0b100;
    rock2.collisionFilter.mask = 0b101001;
    let anchor2 = { x: percentXtoRender(100, renderWidth), y: percentYtoRender(85, renderHeight) };
    let elastic2 = Constraint.create({
      pointA: anchor2,
      bodyB: rock2,
      stiffness: 0.06
    });
    Matter.Body.setStatic(rock2, true);

    let isUserTurn = true;
    const ground2 = Bodies.trapezoid(percentXtoRender(55, renderWidth), percentYtoRender(82, renderHeight), 40, 340, 0.8, { isStatic: true, isSensor: false });
    // ground2.render.sprite = { texture: images["tower"],xOffset:0.2, yOffset:1 ,xScale: 100, yOffset: 1 };
    ground2.label = "ground2";
    ground2.collisionFilter.group = 0;
    ground2.collisionFilter.category = 0b100000;
    ground2.collisionFilter.mask = 0b110;

    
    let userAngle = -0.1;
    let compAngle = 0.1;
    setInterval(function(){ 
      //For start head
      Matter.Body.rotate(userHead, userAngle);
      Matter.Body.rotate(compHead, compAngle);
      userAngle = -userAngle;
      compAngle = -compAngle;
      

    }, 250);

    World.add(engine.world, [gridBackground, elastic1, elastic2, rock1, rock2, ground, ground2, user, comp, userHead, compHead]);
    // app.ticker.add(()=>{
    //   // app.stage.children[0].position = user.position;
    // });


    Events.on(engine, 'afterUpdate', function (e) {
      if (mouseConstraint.mouse.button === -1 && isUserTurn && (Math.abs(rock1.position.x - percentXtoRender(10, renderWidth)) > 5 || Math.abs(rock1.position.y - percentYtoRender(85, renderHeight)) > 5)) {
        console.log(e);
        console.log("User");
        ground.collisionFilter.mask = 0b110;
        rock1 = Bodies.circle(percentXtoRender(10, renderWidth), percentYtoRender(85, renderHeight), 8, rockOptions);
        // World.add(engine.world, rock);
        elastic1.bodyB = rock1;
      }
      if (mouseConstraint.mouse.button === -1 && !isUserTurn && (Math.abs(rock2.position.x - percentXtoRender(100, renderWidth)) > 5 || Math.abs(rock2.position.y - percentYtoRender(85, renderHeight)) > 5)) {
        console.log(e);
        console.log("comp");
        ground.collisionFilter.mask = 0b110;
        rock2 = Bodies.circle(percentXtoRender(100, renderWidth), percentYtoRender(85, renderHeight), 8, rockOptions);
        // World.add(engine.world, rock);
        elastic2.bodyB = rock2;
      }
    });
    let lastUserTurnTime = Date.now() - 3000;
    let lastCompTurnTime = Date.now();
    let firstHit = true;
    Events.on(engine, 'collisionEnd', function (event) {
      let pairs = event.pairs;
      let thrownRock = pairs[0].bodyA.label === "ground" || pairs[0].bodyA.label === "ground2" || pairs[0].bodyA.label === "user" || pairs[0].bodyA.label === "comp" ? pairs[0].bodyB : pairs[0].bodyA;
      console.log(pairs[0]);
      if (pairs[0].bodyA.label === "comp" || pairs[0].bodyB.label === "comp" ||
        pairs[0].bodyA.label === "user" || pairs[0].bodyB.label === "user") {
        if (firstHit) {
          firstHit = false;
          thrownRock.collisionFilter.mask = 0b100001;
          if (thrownRock.label === "userRock") {
            console.log("Comp got hit by user's rock1\n");
            compHead.render.sprite = { texture: images["compHit"], xScale: 0.3, xOffset: 0.5, yScale: 0.25, yOffset: 1 };
            this.props.updateHp(true);
          } else {
            userHead.render.sprite = { texture: images["userHit"], xScale: 0.25, xOffset: 0.5, yScale: 0.2, yOffset: 1 };
            
            console.log("User got hit by comp's rock1\n");
            this.props.updateHp(false);
          }
          setTimeout(function () {
            World.remove(engine.world, thrownRock);
            if (thrownRock.label === "userRock" && Math.abs(lastUserTurnTime - Date.now()) > 3300) {
              isUserTurn = false;
              compHead.render.sprite = { texture: images["compStart"], xScale: 0.25, xOffset: 0.5, yScale: 0.3, yOffset: 1 };
              lastUserTurnTime = Date.now();
              rock1 = Bodies.circle(percentXtoRender(10, renderWidth), percentYtoRender(85, renderHeight), 8, rockOptions);
              Matter.Body.setStatic(rock1, true);
              Matter.Body.setStatic(rock2, false);
              rock1.label = "userRock";
              rock1.collisionFilter.group = 0;
              rock1.collisionFilter.category = 0b10;
              rock1.collisionFilter.mask = 0b110001;
              World.add(engine.world, rock1);
              // ground.collisionFilter.mask = 0b0;
              elastic1.bodyB = rock1;
            }
            else if (thrownRock.label === "compRock" && Math.abs(lastCompTurnTime - Date.now()) > 3300) {
              isUserTurn = true;
              userHead.render.sprite = { texture: images["userStart"], xScale: 0.3, xOffset: 0.5, yScale: 0.3, yOffset: 1 };
              lastCompTurnTime = Date.now();
              rock2 = Bodies.circle(percentXtoRender(100, renderWidth), percentYtoRender(85, renderHeight), 8, rockOptions);
              Matter.Body.setStatic(rock2, true);
              Matter.Body.setStatic(rock1, false);
              rock2.label = "compRock";
              rock2.collisionFilter.group = 0;
              rock2.collisionFilter.category = 0b100;
              rock2.collisionFilter.mask = 0b101001;
              World.add(engine.world, rock2);
              // ground.collisionFilter.mask = 0b0;
              elastic2.bodyB = rock2;
            }
            setTimeout(() => {
              firstHit = true;
            }, 50);

          }, 3200);
        }


      }
      else {//ground hit first case
        if (firstHit) {
          if(thrownRock.label === "compRock"){
            userHead.render.sprite = { texture: images["userMiss"], xScale: 0.25, xOffset: 0.5, yScale: 0.2, yOffset: 1 };
          }
          else if(thrownRock.label === "userRock"){
            compHead.render.sprite = { texture: images["compMiss"], xScale: 0.3, xOffset: 0.5, yScale: 0.25, yOffset: 1 };
          }
          firstHit = false;
          thrownRock.collisionFilter.mask = 0b100001;
          console.log("Ground hit");
          setTimeout(function () {
            World.remove(engine.world, thrownRock);
            if (thrownRock.label === "userRock" && Math.abs(lastUserTurnTime - Date.now()) > 3300) {
              compHead.render.sprite = { texture: images["compStart"], xScale: 0.25, xOffset: 0.5, yScale: 0.3, yOffset: 1 };
              isUserTurn = false;
              lastUserTurnTime = Date.now();
              rock1 = Bodies.circle(percentXtoRender(10, renderWidth), percentYtoRender(85, renderHeight), 8, rockOptions);
              Matter.Body.setStatic(rock1, true);
              Matter.Body.setStatic(rock2, false);
              rock1.label = "userRock";
              rock1.collisionFilter.group = 0;
              rock1.collisionFilter.category = 0b10;
              rock1.collisionFilter.mask = 0b110001;
              World.add(engine.world, rock1);
              // ground.collisionFilter.mask = 0b0;
              elastic1.bodyB = rock1;
            }
            else if (thrownRock.label === "compRock" && Math.abs(lastCompTurnTime - Date.now()) > 3300) {
              userHead.render.sprite = { texture: images["userStart"], xScale: 0.3, xOffset: 0.5, yScale: 0.3, yOffset: 1 };
              isUserTurn = true;
              lastCompTurnTime = Date.now();
              rock2 = Bodies.circle(percentXtoRender(100, renderWidth), percentYtoRender(85, renderHeight), 8, rockOptions);
              Matter.Body.setStatic(rock2, true);
              Matter.Body.setStatic(rock1, false);
              rock2.label = "compRock";
              rock2.collisionFilter.group = 0;
              rock2.collisionFilter.category = 0b100;
              rock2.collisionFilter.mask = 0b101001;
              World.add(engine.world, rock2);
              // ground.collisionFilter.mask = 0b0;
              elastic2.bodyB = rock2;
            }
            setTimeout(() => {
              firstHit = true;
            }, 50);
          }, 3200);
        }

      }
    }.bind(this));



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

    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      position: { x: 500, y: 500 },
      min: { x: 0, y: 0 },
      max: { x: 1000, y: 600 }
    }
    );


  }

  render() {
    return <div className ="scene" ref="scene" />;
  }

}

export default Game;