var space, spaceimg;
var jet, jetimg;
var fuel, fuelimg;
var ast, astimg;
var iGround;
var laser, laserimg;
var Meteor, m1, m2, m3, m4, m5, m6;
var s = 0;
var meteorGroup;
var gameState = 0;

function preload(){
  spaceimg = loadImage("space.jpg");
  jetimg = loadImage("jet.png");
  fuelimg = loadImage("fuel.webp");
  laserimg = loadImage("laser.png");
  m1 = loadImage("m1.png")
  m2 = loadImage("m2.png")
  m3 = loadImage("m3.png")
  m4 = loadImage("m4.png")
  m5 = loadImage("m5.png")
  m6 = loadImage("m6.webp")

  
}




function setup() {
  createCanvas(1080, 800);
  space = createSprite(540,400);
  space.addImage("space",spaceimg)
  space.scale = 1.2

  space.velocityX = -5

  meteorGroup = new Group();

  jet = createSprite(110,266);
  jet.addImage("jet",jetimg);
  jet.scale = 0.2

  laser = createSprite(jet.x, jet.y);
  laser.addImage("laser",laserimg);
  laser.scale = 0.8
  laser.visible = false;
  

  iGround = createSprite(500,790,1080,5)
  iGround.visible = false;

  

  /*fuel = createSprite(200,200)
  fuel.addImage("fuel",fuelimg)
  fuel.scale = 0.2 */

  
  
  
 
}

function draw() {
  background(0);
  
  if(space.x < 350){
    space.x = width/2
    
  }

  jet.velocityY = jet.velocityY + 0.8
  

  

  if (keyDown("up") && jet.y >= 150){
    jet.velocityY = -10;

  }

 // jet.collide(iGround);

  
  //Game-ending code
  if(meteorGroup.isTouching(jet) || jet.isTouching(iGround)){
    jet.destroy();
    meteorGroup.destroyEach();
    gameState = 1;
    gameOver();
  }


  
  

  if(keyDown("space")){
    laser.visible = true;
    laser.velocityX = 50;

    collision();

    setTimeout(function(){
      laser.x = jet.x;
      laser.y = jet.y;
      laser.visible = false;
    },400)

  }

  


 if(gameState == 0){
  spawnMeteors()

 }

  
  drawSprites()
  textSize(40)
  textFont("georgia")
  fill("#e6e037")
  text("Space 100, crafted by Elvin 👽" , 25,50)
  textSize(32)
  fill("orange")
  text("Hits: " + s, 25, 100);
  
}




function spawnMeteors(){
  if (frameCount % 60 === 0){
    var Meteor = createSprite(1200,Math.round(random(20,750)),10,40);
    Meteor.velocityX = Math.round(random(-5,-10))
 
    
     // //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: Meteor.addImage(m1);
       Meteor.scale = 0.15;
               break;
       case 2: Meteor.addImage(m2);
       Meteor.scale = 0.1;
               break;
       case 3: Meteor.addImage(m3);
       Meteor.scale = 0.5;
               break;
       case 4: Meteor.addImage(m4);
       Meteor.scale = 0.3;
               break;
       case 5: Meteor.addImage(m5);
       Meteor.scale = 0.25;
               break;
       case 6: Meteor.addImage(m6);
       Meteor.scale = 0.2;
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     Meteor.lifetime = 300;



     meteorGroup.add(Meteor);
  }
}

  function collision(){
    laser.overlap(meteorGroup, function(obj1, obj2){
      obj2.remove();
      s = s + 1 ;
    })
  }

  
  function gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the Space 100 challenge....!!!",
      imageUrl:
        "https://media.tenor.com/TLRHhH04RdUAAAAM/game-over-axelay.gif",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
  
  function gameWin() {
    swal({
      title: `Awesome! You saved Earth from mass extinction`,
      text: "You were succesful in making 5 hits",
      imageUrl:
        "https://img.freepik.com/premium-vector/victory-game-screen_313905-135.jpg",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }
 

 

 

