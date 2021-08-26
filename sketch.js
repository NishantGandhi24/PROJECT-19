var car,carImg;
var car2,car2Img;
var road,roadImg;
var runner,runnerImg;
var PLAY = 1, END = 0;
var gamestate = PLAY;
var score = 0;
var distance = 0
var germ1,germImg1,germ2,germImg2;
var mask,maskImg;
var vaccine,vaccineImg;
var sanitizer,sanitizerImg;
var gameoverImg;
var restart,restartImg;
var runnercollideImg,runnercollide;
var jump,die,collect ;
var edge; 

function preload(){
carImg = loadImage("car.png");
car2Img = loadImage("car2.png");
roadImg = loadImage("1.jpg");
germImg1 = loadImage("3.png"); 
germImg2 = loadImage("ger1.png");
runnerImg = loadAnimation("Runner-1.png","Runner-2.png");
maskImg = loadImage("mask.png");
vaccineImg = loadImage("vaccine.png");
sanitizerImg = loadImage("sanitizer.png");
gameoverImg = loadImage("gameOver.png");
runnercollideImg = loadImage("Runner-1.png");
restartImg = loadImage("restart.png");
jump = loadSound("jump.mp3");
die = loadSound("die.mp3");
collect = loadSound("collect.wav");
ground1,ground2;
}

function setup() {
  
  createCanvas(1280,575);
// creating sprites
road = createSprite(640,280,1280,575);
road.addImage(roadImg);
road.scale = 5;

runner = createSprite(640,470,30,30);
runner.addAnimation("running",runnerImg);
runner.addImage("collide",runnercollideImg);
runner.scale = 0.1;

gameover = createSprite(600,360);
gameover.addImage(gameoverImg);
gameover.scale = 1.5;

restart = createSprite(600,200,30,30);
restart.addImage(restartImg);
restart.scale = 0.5;

edge = createEdgeSprites();

ground1 = createSprite(1250,500,30,1000);
ground2 = createSprite(30,500,30,1000)

// making groups
germgro = new Group();
germ2gro = new Group();
maskgro = new Group();
injetgro = new Group();
sanitizergro = new Group();
}

function draw() {
  background("lightblue");

  if(gamestate === PLAY){
    // moving the road
 if(road.y>1280 ){
  road.y = road.width/2;
}
road.velocityY = 8;
// adding controls to the runner
if(keyDown("space")&&(runner.y>height/2)){
  runner.y = runner.y+-10;
}
//runner.velocityY = runner.velocityY+0.5;
if(keyDown("left")){
  runner.x = runner.x-8;
  jump.play();
}
if(keyDown("right")){
  runner.x = runner.x+8;
  jump.play();
}
// increasing the score
distance=distance+Math.round(getFrameRate()/60)
// increasing the score
if(maskgro.isTouching(runner)){
  score = score+50;
  maskgro.destroyEach();
  collect.play();
}

// adding istouching condition
if(injetgro.isTouching(runner)){
  score = score+150
  injetgro.destroyEach();
  collect.play();
}

if(sanitizergro.isTouching(runner)){
  score = score+100
  sanitizergro.destroyEach();
  collect.play();
  }
 gameover.visible = false;
 restart.visible = false;
 ground2.visible = false;
 ground1.visible = false;

 runner.setCollider("rectangle",0,0,0,40);
 runner.debug = false;

 runner.collide(ground1);
 runner.collide(ground2);

 // declaring the functions
germs();
germs1();
masks();
inject();
sanitizers();

// touching the germs
if(germgro.isTouching(runner)||(germ2gro.isTouching(runner))){
  gamestate = END
  die.play();
}
}
  
// gamestate===end
  else if(gamestate === END){
    germ2gro.setVelocityYEach(0);
    germgro.setVelocityYEach(0);
    maskgro.setVelocityYEach(0);
    injetgro.setVelocityYEach(0);
    sanitizergro.setVelocityYEach(0)
    sanitizergro.destroyEach();
    injetgro.destroyEach();
    maskgro.destroyEach();
    runner.changeAnimation("collide",runnercollideImg)
    runner.velocityY = 0;
    road.velocityY = 0;
    gameover.visible = true;
    restart.visible = true;
   }

   if(mousePressedOver(restart)){
  gamestate = PLAY;
  germ2gro.destroyEach();
  germgro.destroyEach();
  maskgro.destroyEach();
  injetgro.destroyEach();
  sanitizergro.destroyEach();
  score = 0;
  distance = 0;
  runner.changeAnimation("running",runnerImg)
}
drawSprites();

// creating my functions
function germs(){
  if(frameCount%100===0){
    germ1 = createSprite(10,10,30,30)
    germ1.velocityY = 2;  
    germ1.x = Math.round(random(10,800))
    germ1.addImage("running",germImg2);
    germ1.lifetime = 240
    germ1.scale =1.1; 
    germgro.add(germ1)
  }}

  function germs1(){
    if(frameCount%200===0){
    germ2 = createSprite(600,10,30,30);
    germ2.velocityY = 2;
    germ2.x = Math.round(random(400,800));
    germ2.addImage("running",germImg1);
    germ2.lifetime = 240;
    germ2.scale =0.2
    germ2gro.add(germ2)
  }}

  function masks(){
    if(frameCount%300===0){
      mask = createSprite(50,300,30,30);
      mask.addImage(maskImg);
      mask.velocityY = -1;
      mask.x = Math.round(random(10,800)); 
      mask.scale = 0.2;
      mask.lifetime = 180;
      maskgro.add(mask)
    }}
  

  function inject(){
    if(frameCount%400 === 0){
    vaccine = createSprite(10,50,30,30);
    vaccine.addImage(vaccineImg);
    vaccine.velocityY = 2;
    vaccine.x = Math.round(random(10,800));
    vaccine.scale = 0.2;
    vaccine.lifetime = 240;
    injetgro.add(vaccine);
    }}

    function sanitizers(){
      if(frameCount%350===0){
      sanitizer = createSprite(300,300,30,30);
      sanitizer.addImage(sanitizerImg);
      sanitizer.velocityY = 2;
      sanitizer.x = Math.round(random(5,400));
      sanitizer.scale = 0.3;
      sanitizergro.add(sanitizer);
      }
    }

    fill("white")
    textSize(40);
    text("Distance:"+distance,70,50)
    fill("white");
    textSize(40);
    text("Score:"+score,70,100)
  }
