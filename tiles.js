var tileImg = [[1, 0],
               [2, 1]
              ]; 

// var analogPos = []; 

                
var solids = []; 

var tileSize = 50;
var tileDist = 100;
var tileHeight = 325;

function tileSetup(){
  
 for (var i = 0; i < tileImg.length; i++) {
    for (var j = 0; j < tileImg[0].length; j++) {
      if (tileImg[i][j] !== 0) {
        var tile = createSprite(j * tileSize + tileDist, i * tileSize + tileHeight, 50, 50);
        tile.addAnimation("tileImage", "assets/tileImage.png");
        tile.addAnimation("starImage", "assets/starImage.png"); 
        // tile.addAnimation("tileSlanted", );
        // tile.addAnimation("tileFolded", ); 
        tile.setCollider("rectangle", 0, 0, tileSize, tileSize);
        tile.depth = 3;
        // tile.debug = true;
        solids.push(tile);
     }
    }
  }
}

function tileUpdate(){
  solids[0].addAnimation("highlighted", "assets/star.png"); 
}
