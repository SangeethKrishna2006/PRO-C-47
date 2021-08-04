gameState=0;
score = 0;
var character;
var zombieBg, targetImg, maleCharacterImg, femaleCharacterImg;
var boyImg , shooterMaleImg , shooterFemaleImg;
var zombie_walking , zombie_sound , gameOverImg , restartImg;
var boy , maleShooter , femaleShooter , restart;

function preload(){
  //Images
  introZombieImg     = loadImage("images/introzo.png");
  targetImg          = loadImage("images/target.png");
  maleCharacterImg   = loadImage("images/male.png");
  femaleCharacterImg = loadImage("images/female.png");
  boyImg             = loadImage("images/boy.png");
  zombieBg           = loadImage("images/zombiebg.jpg");
  shooterFemaleImg   = loadImage("images/shootingFemale.png");
  shooterMaleImg     = loadImage("images/shootingMale.png");
  gameOverImg        = loadImage("images/gameOver.png");
  restartImg         = loadImage("images/restart.png");
  //Animations and Sounds
  zombie_walking = loadAnimation("images/zombie1.png", "images/zombie1.png",
                                 "images/zombie3.png","images/zombie4.png",
                                 "images/zombie5.png","images/zombie6.png");
  zombie_sound   = loadSound("sounds/playZom.mp3");
  
}

function setup() {
 createCanvas(750, 500);

 target = createSprite(250,250);
 target.addImage(targetImg);
 target.scale=0.1;
 target.visible = false;
 
 boy = createSprite(80,400, 100,150);
 boy.addImage(boyImg);
 boy.scale = 0.3/2;
 boy.visible = false;

 maleShooter = createSprite(250 , 400);
 maleShooter.addImage(shooterMaleImg);
 maleShooter.scale = 0.5/2;
 maleShooter.visible = false;

 femaleShooter = createSprite(250 , 400);
 femaleShooter.addImage(shooterFemaleImg);
 femaleShooter.scale = 0.2;
 femaleShooter.visible = false;

 restart = createSprite(350,250);
 restart.addImage(restartImg);
 restart.visible = false;

 zombiesGroup = createGroup();
}

function draw() {
  background("lightBlue");
  
  if(gameState === 0){
     Introduction();
   }

  if(gameState === 1){
    Instructions();
   }
   
  if(gameState === 2 && character === "male"){
     Goal();
   }

  if(gameState === 2 && character === "female"){
     Goal();
   }

  if(gameState === 3 && character === "male"){
    playForMale();
    spawnZombie();
  }

  if(gameState === 3 && character === "female"){
     playForFemale();
     spawnZombie();
  }

  if(gameState === 4 && character === "male"){
     end();
  }
 
  if(gameState === 4 && character === "female"){
    end();
  }
   
drawSprites();
}

function Introduction() {
  background("black");
  fill("white");
  textStyle(BOLD);
  textSize(25);
  text("HELLO WORLD WELCOME TO ZOMBIE APOCALYPSE", 50, 250);
   
  image(introZombieImg, 300 , 80 , 150, 150);

  textSize(18);
  textStyle(ITALIC);
  text("Click Anywhere On The Screen To Continue", 200 , 400);
 
  if(mouseIsPressed){
    gameState=1;
  }

}

function Instructions(){
  background("black");
  textSize(30);
  fill("white");
  text("READ THE INSTRUCTIONS CAREFULLY", 100 , 30);
   
  image(targetImg , 320 , 100 , 100 , 100); 
  textSize(20);
  fill("white");
  text("This is your aim point", 260 , 230);
  text("You should target it to the zombies and shoot them completely using your mouse", 20, 250);
  
  textStyle(BOLD);
  text("Choose Your Fighter", 260, 300);
  
  image(maleCharacterImg , 100 , 260 , 210 , 210);
  image(femaleCharacterImg , 450 , 270 , 210, 210);
  
  textSize(15);
  textStyle(BOLDITALIC);
  text("Press 'LEFT ARROW' For Jack", 80 ,480);
  
  textSize(15);
  textStyle(BOLDITALIC);
  text("Press 'RIGHT ARROW' For NATASHA", 400 ,480);
    
   if(keyDown("left")){
     gameState = 2;
     character = "male";
   }  

  if(keyDown("right")){
    gameState = 2;
    character = "female"
  }

}

function Goal(){
  background("black");

  textSize(23);
  fill("white");
  textStyle(BOLD);
  text("Your Goal is to Protect The Boys From The Zombie Apocalypse", 20 , 100);

  image(boyImg , 100 , 130 , 150,200);

  textStyle(BOLDITALIC);
  fill("red");
  text("PRESS 'ENTER' TO START", 200 , 450);

  if(keyDown("enter") && character === "male"){
      gameState = 3;
  }

  if(keyDown("enter") && character === "female"){
    gameState = 3;
}

}

function playForMale(){
 background(zombieBg);
 
boy.visible = true;
maleShooter.visible = true; 

target.visible = true;
target.x = mouseX;
target.y = mouseY;

textSize(25);
fill("green");
textStyle(BOLD);
text("SCORE : "+score , 50 , 100);

for(i = 0; i<zombiesGroup.length; i++){
  if(mousePressedOver(zombiesGroup.get(i))){
    zombiesGroup.get(i).destroy();
    score = score+1;
   
  } 
}
  for(i = 0; i<zombiesGroup.length; i++){
      if(boy.isTouching(zombiesGroup.get(i))){
         zombiesGroup.get(i).destroy();
         gameState = 4;
        }
    }
}

function playForFemale(){
  background(zombieBg);
 
  boy.visible = true;
  femaleShooter.visible = true;

 target.visible = true;
 target.x = mouseX;
 target.y = mouseY;

 textSize(25);
fill("green");
textStyle(BOLD);
text("SCORE : "+score , 50 , 100);

for(i = 0; i<zombiesGroup.length; i++){
  if(mousePressedOver(zombiesGroup.get(i))){
    zombiesGroup.get(i).destroy();
    score = score+1;
   
  } 
}
  for(i = 0; i<zombiesGroup.length; i++){
      if(boy.isTouching(zombiesGroup.get(i))){
         zombiesGroup.get(i).destroy();
         gameState = 4;
      }
   }
}

function spawnZombie(){

  if(frameCount % 80=== 0){
    zombies = createSprite(730,30);
    zombies.y = Math.round(random(360,490));
    zombies.addAnimation("walking",zombie_walking);
    zombies.scale = 0.4;
    zombies.velocityX = -2;

    zombies.depth = target.depth;
    target.depth = target.depth+1;

    zombiesGroup.add(zombies);
 }
}

function end(){
  background("black");

  zombiesGroup.destroyEach();
  boy.visible = false;
  maleShooter.visible = false;
  femaleShooter.visible = false;
  target.visible = false;

  textSize(25);
  textStyle(BOLD);
  fill("white");
  text("SORRY, YOU FAILED TO SAVE THE BOY", 130,50);
  
  textStyle(ITALIC);
  text("CLICK RESTART TO TRY AGAIN", 170, 150);
  restart.visible = true;

  if(mousePressedOver(restart) && character === "male"){
    gameState = 3;
    character = "male";
    restart.visible = false;
    score = 0;
  }

  if(mousePressedOver(restart) && character === "female"){
    gameState = 3;
    character = "female";
    restart.visible = false;
    score = 0;
  }

}

