
var buttonVal = []; 
var socket = new WebSocket('ws://localhost:8081');
var numHugs; 
var previousButtonVal; 
var removeTile = false; 
var solids = []; 
var state =0; 

var character; 
var characterSpriteSheet; 
var walkingSpriteSheet; 

var backgroundImg; 
var brick; 

function preload(){
  characterSpriteSheet = loadSpriteSheet("assets/spriteSheet1.png", 192, 192, 3); 
  walkingSpriteSheet = loadSpriteSheet("assets/spriteSheet2.png", 192, 192, 3); 

  brick = loadImage("assets/brick-03.png", 140, 140); 
  backgroundImg = loadImage("assets/wall.png", 1024, 768); 
}

function setup() {
  createCanvas(1024,768); 
  socket.onopen = openSocket;
  socket.onmessage = showData;
  
  frameRate(5); 
  
  for(var i = 0; i<3; i++){
    for(var j = 0; j<3; j++){
      var blocks = createSprite((width*.5-140)+ i*140, j*140+170, 140, 140); 
      blocks.addImage("brick", brick); 
      solids.push(blocks); 
    }
  }
  
  character = createSprite(width*.4, height*.6); 
  character.addAnimation("resting", characterSpriteSheet); 
  character.addAnimation("walking", walkingSpriteSheet); 
  
 
  
  buttonVal[0] = 0; 
}

function draw() {
  image(backgroundImg, 0, 0, 1024, 768);  
  // var i = buttonVal[9]; 
  
  // for(var i; i < 9; i++){
  //   if(buttonVal[0] == i ){
  //     console.log('this happened'); 
  //     // var t = random(0,4); 
  //     solids[i].remove();   
  //   }
  // }
  if(state == 0){
      
      if(buttonVal[0] == 1){
        solids[0].remove(); 
      }else if(buttonVal[0] == 2){
        solids[1].remove(); 
      }else if(buttonVal[0] == 3){
        solids[2].remove(); 
      }else if(buttonVal[0] == 4){
        solids[3].remove(); 
      }else if(buttonVal[0] == 5){
        solids[4].remove(); 
      }else if(buttonVal[0] == 6){
        solids[5].remove(); 
      }else if(buttonVal[0] == 7){
        solids[6].remove(); 
      }else if(buttonVal[0] == 8){
        solids[7].remove(); 
      }else if(buttonVal[0] == 9){
        solids[8].remove(); 
        state = 1; 
      }
  }else if(state == 1){
    character.changeAnimation("walking"); 
    character.velocity.y = -10; 
    character.velocity.x = 5; 
    println(character.position.x); 
    println(character.position.y); 
    if(character.position.x >= 500 && character.position.y <= 300){
      pageReload(); 
      console.log("this happened"); 
    }
  }  
  

  console.log(buttonVal[0]); 
  // console.log(previousButtonVal); 
  drawSprites(); 
}


function openSocket() {
  console.log('socket is open');
}

function showData(result) {
  buttonVal = trim(result.data); //clear the whitespace and assign it to buttonVal
  // console.log(buttonVal); //printing out the button data\
  
}

function pageReload(){
  location.reload(); 
}

