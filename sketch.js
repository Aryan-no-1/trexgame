var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count=0
var ObstaclesGroup,CloudsGroup
var gameover,restart,death,life
var        trex,walkingtrex,invi,ground,animation,cloud,floaters,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,count,terror





function preload(){
walkingtrex=loadAnimation("trex1.png","trex3.png","trex4.png")
  animation=loadImage("ground2.png")
  floaters=loadImage("cloud.png") 
  obstacle1=loadImage("obstacle1.png") 
  obstacle2=loadImage("obstacle2.png") 
  obstacle3=loadImage("obstacle3.png") 
  obstacle4=loadImage("obstacle4.png") 
  obstacle5=loadImage("obstacle5.png") 
  obstacle6=loadImage("obstacle6.png") 
  gameover=loadImage("gameOver.png")
  restart=loadImage("restart.png")
  terror=loadAnimation("trex_collided.png")
}
function setup() {
  createCanvas(800,200);
  trex=createSprite(50,185);
  trex.addAnimation("hi",walkingtrex)
  trex.addAnimation("sd",terror)
  trex.scale=0.5;
  ground=createSprite(200,190);
  ground.addImage("bye",animation)
  ground.velocityX=-8 ;
  invi=createSprite(200,195,400,1)
  invi.visible=false;
  count=0;
  ObstaclesGroup=new Group();
  CloudsGroup=new Group();
  death=createSprite(300,100);
  death.addImage(gameover)
  death.scale=0.5;
  death.visible=false;
  life=createSprite(300,150);
  life.addImage(restart)
  life.scale=0.5;
  life.visible=false;
}

function draw() {
  background(255);
  trex.collide(invi)
   if(gameState === PLAY){
    ground.velocityX = -(6 + 3*count/100);
    count = count + Math.round(getFrameRate()/60);
      if (ground.x < 0){
    ground.x = ground.width/2;
    }
  
    if(keyDown("space")){
    trex.velocityY = -15 ;
    }
  trex.velocityY = trex.velocityY + 0.8;
  
    count =count+ Math.round(getFrameRate()/60);
  text("Score: "+ count, 250, 100);
  spawnClouds();
  spawnObstacles();
     if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    }
   }
  else if(gameState === END) {
    death.visible = true;
    life.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("sd",terror);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  
  
  if(mousePressedOver(life)) {
    reset();
  }
  }
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(800,20,40,10);
    cloud.y = random(20,120);
    cloud.addImage(floaters);
    cloud.scale = 0.5;
    cloud.velocityX = -8;
    
     //assign lifetime to the variable
    cloud.lifetime = 100;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
     CloudsGroup.add(cloud);
  }
}
  function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,175,10,40);
    obstacle.velocityX = -(6+3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:
    obstacle.addImage(obstacle1);break;
      case 2:
    obstacle.addImage(obstacle2);break;
     case 3:
    obstacle.addImage(obstacle3);break;
     case 4:
    obstacle.addImage(obstacle4);break;
     case 5:
    obstacle.addImage(obstacle5);break;
     case 6:
    obstacle.addImage(obstacle6);break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  death.visible = false;
  life.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("hi",walkingtrex);
  
  count = 0;
  
}
  




