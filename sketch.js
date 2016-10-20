
var buttonVal = []; 
var socket = new WebSocket('ws://localhost:8081');
var numHugs; 
var previousButtonVal=0; 

var blocks = []; 
function preload(){
 
}

function setup() {
  createCanvas(displayWidth,displayHeight); 
  socket.onopen = openSocket;
  socket.onmessage = showData;
  

  for(var i = 0; i<3; i++){
    for(var j = 0; j<3; j++){
      blocks[i] = createSprite((displayWidth*.5-300)+ i*150, j*150+75, 150, 150); 
    }
  }
  
}

function draw() {
  // background(255); 
  if((buttonVal[9] - previousButtonVal) == 1){
    console.log('this happened'); 
    blocks[buttonVal[9]].remove();  
  }
  
  
  previousButtonVal = buttonVal[9];
  console.log(buttonVal[9]); 
  console.log(previousButtonVal); 
  drawSprites(); 
}


function openSocket() {
  console.log('socket is open');
}

function showData(result) {
  buttonVal = trim(result.data); //clear the whitespace and assign it to buttonVal
  // console.log(buttonVal); //printing out the button data\
  
}

