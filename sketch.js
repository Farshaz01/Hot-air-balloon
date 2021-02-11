var balloon;
var backgroundImg, bgImg;
var database;


function setup() {

  database = firewall.database();

  backgroundImg = loadImage("pro-C35 images/Hot Air Balloon-01.png");
  balloon = loadImage(bgImg);
  balloon = createSprite(250, 250);
  
  createCanvas(500,500);
  createSprite(400, 200, 50, 50);

  var hypnoticBallPosition = database.ref("ball/position");

  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw() {
  background(255,255,255);
  background(backgroundImg);

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  }
  drawSprites();

}

function BG () {
  if (balloon.y>133) {
    bgImg = loadImage("pro-C35 images/Hot Air Balloon-02.png")
  } else if (balloon.y<133 && balloon.y<266) {
    bgImg = loadImage("pro-C35 images/Hot Air Balloon-03.png")
  } else if (balloon.y>266) {
    bgImg = loadImage("pro-C35 images/Hot Air Balloon-04.png")
  }
}

function writePosition(x,y){
  database.ref("ball/position").set({
      x:position.x + x,
      y:position.y + y
  })
}

function readPosition (data) {
  position = data.val();
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError () {
  console.log("There's an error in reading the DB");
}