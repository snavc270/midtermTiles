var blobStartX = 400; 
var blobStartY = 400;

var socket = new WebSocket('ws://localhost:8081');
var buttonVal = []; 
var blobby_spriteSheet;
var square_spriteSheet;
var walk2_animation;
var walk_animation;
var bg; 

var top = false; 
var middle = false; 
var right = false; 

function preload(){
  blobby_spriteSheet = loadSpriteSheet('assets/spritesheet.png', 93, 119, 5);
  square_spriteSheet = loadSpriteSheet('assets/spritesheet2.png', 110.133, 112.19, 4);
  
  bg = loadImage("assets/background.png", 2000, height);
}

function setup() {
  createCanvas(1000,500); 
  
  backgr = createSprite(500, 250); 
  backgr.addImage(bg); 
  
  // mouseSprite = createSprite(0, 0, 50, 50); 
  
  playerSetup(); 
  tileSetup(); 
  
  socket.onopen = openSocket;
  socket.onmessage = showData;
}

function draw() {
  background(255); 
 
  
  console.log(buttonVal[11]); 
  
  if(buttonVal[11]=== "4"){
    solids[1].changeAnimation("starImage");
  } else{
    solids[1].changeAnimation("tileImage");
  }
  
  if(buttonVal[10]=== "4"){
    solids[0].changeAnimation("starImage");
  } else{
    solids[0].changeAnimation("tileImage");
  }
  
  if(buttonVal[8]=== "4"){
    solids[2].changeAnimation("starImage");
  } else{
    solids[2].changeAnimation("tileImage");
  }

  
  drawSprites(); 
  tileUpdate(); 
}

function playerSetup(){
  blobby_spriteSheet = loadSpriteSheet('assets/spritesheet.png', 93, 119, 5);
  square_spriteSheet = loadSpriteSheet('assets/spritesheet2.png', 110.133, 112.19, 4);

  walk2_animation = loadAnimation(square_spriteSheet);
  walk_animation = loadAnimation(blobby_spriteSheet);
  
  blob = createSprite(blobStartX , blobStartY); 
  blob.setCollider("circle", 0, 0, 50); 
  blob.addAnimation("resting", "assets/blob.png"); 
  blob.addAnimation("walking", blobby_spriteSheet); 
}

function openSocket() {
  console.log('socket is open');
}

function showData(result) {
  buttonVal = trim(result.data); //clear the whitespace and assign it to buttonVal
  // console.log(buttonVal); //printing out the button data
}

