
var monkey , monkey_running;
var fruit ,bananaImage, obstacle, obstacleImage;
var FoodGrp, obstacleGrp;
var score;
var play = 1;
var end = 0;
var win = 3
var gameState = play;
var gameoverImage,gameover,restart,restartImage;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bgg = loadImage("back.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameoverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png");

  UwinImage = loadImage("u_win.jpg");
}



function setup() {
  createCanvas(800,600);
  
  score = 0;
  
  obstacleGrp = new Group();
  FoodGrp = new Group();
  
  ground = createSprite(200,440,8000,20);
  ground.debug = false;
  
  bg = createSprite(200,200);
  bg.addImage(bgg);
  bg.scale = 1.5;
  
  
  monkey = createSprite(60,400);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.13 ; 
  monkey.debug = false;
  monkey.setCollider("rectangle",0,0,220,440);
  
  gameover = createSprite(400,230);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.8;
  gameover.visible = false;
  
  
  U_win = createSprite(300,300);
  U_win.addImage(UwinImage);
  U_win.scale = 1.5;
  U_win.visible = false;

  restart = createSprite(230,450);
  restart.addImage(restartImage);
  restart.scale = 0.12;
  restart.visible = false;


}


function draw() {
  background(255);
  //console.log(getFrameRate());
  
  if(gameState === play){
     monkey.pause();

     if(keyDown(RIGHT_ARROW)) {
      monkey.x = monkey.x+20;
      monkey.play();
     }
     if(keyDown(LEFT_ARROW)) {
      monkey.x = monkey.x-20;
      monkey.play();
     }

     console.log(monkey.x); 

     if(keyDown("space") && monkey.collide(ground)){
      SpaceButton();
     }

     if(bg.x < 0){
      bg.x = bg.width/2;
     } 
    
     gameover.visible = false;
     restart.visible = false;
     U_win.visible = false;
         
     if(monkey.isTouching(FoodGrp)){
      FoodGrp.destroyEach();
      score = score+3;
     }
    
     camera.position.x = monkey.x+200;
     //camera.position.y = displayWidth;

     monkey.velocityY = monkey.velocityY+0.5;
    
     Fruit();
     Enemy();
     monkeyScale();
     stone();
  }
  else if(gameState === end){
     monkey.pause();
     monkey.setVelocity(0,0);
     
     bg.velocityX = 0;
    
     gameover.visible = true;
     restart.visible = true;
    
     ground.velocityX = 0;

     obstacleGrp.setVelocityXEach(0);
     FoodGrp.setVelocityXEach(0);

     obstacleGrp.setLifetimeEach(-1);
     FoodGrp.setLifetimeEach(-1);
     
     if(mousePressedOver(restart)){
       gameState = play;
       score = 0;
       monkey.scale = 0.11;
       
       obstacleGrp.destroyEach();
       FoodGrp.destroyEach();
     }
    }

    if(gameState === win){
      camera.x = 300;

      U_win.visible = true;
      restart.visible = false;

      obstacleGrp.setVelocityXEach(0);
      FoodGrp.setVelocityXEach(0);

      obstacleGrp.setLifetimeEach(-1);
      FoodGrp.setLifetimeEach(-1);

      if(mousePressedOver(restart)){
        gameState = play;
        score = 0;
        monkey.scale = 0.11;

        
        
        obstacleGrp.destroyEach();
        FoodGrp.destroyEach();
      }
    }
  if(monkey.scale <= 0.09000000000000001){
     gameState = end;
  }
  else if(monkey.x >= 2000){
    gameState = win;
  }
  console.log(U_win.visible);

    
  monkey.collide(ground);
  drawSprites();
  fill("black");
  textSize(20);
  text("Score :"+" "+score,200,50);
}
function SpaceButton(){
    monkey.velocityY = -13;
}
function Enemy(){
  if(frameCount%180 === 0){
    obstacle = createSprite(2500,394);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacle.lifetime = 2200;
    obstacleGrp.add(obstacle);
    obstacle.debug = false;
    obstacle.setCollider("circle",-2,2,150)
  }
}
function Fruit(){
  if(frameCount%80 === 0){
   fruit = createSprite(Math.round(random(100,2500)),Math.round(random(190,240)));
   fruit.addImage(bananaImage);
   fruit.scale = 0.12;
   fruit.velocityX = -5;  
   fruit.lifetime = 2000;
   FoodGrp.add(fruit); 
 } 
}
function monkeyScale(){
  if(score === 10){
   monkey.scale  = 0.12;
  }

  else if(score === 20){
    monkey.scale = 0.15;      
  }
  else if(score === 20){
    monkey.scale = 0.16;
  }
  else if(score === 40){
    monkey.scale = 0.17;
  }
}
function stone(){
  if(monkey.isTouching(obstacleGrp)){
    monkey.scale = monkey.scale-0.01;
    obstacleGrp.destroyEach();
  }
}




