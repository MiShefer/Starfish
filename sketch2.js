//listener test
var dataServer;
var pubKey = 'pub-c-32c6be58-06f2-4d96-9387-76a7a479e147';
var subKey = 'sub-c-9b111b84-1a63-11e9-b552-46d61eed2fbc';

//**********************************************************

var quality;
var shape;
var colour;

function preload(){
  imgStar1 = loadImage("images/no stroke star1.png");
  imgStar2 = loadImage("images/no stroke star2.png");
  imgStar3 = loadImage("images/no stroke star3.png");
  imgStar4 = loadImage("images/no stroke star4.png");
  imgMaskBubbles = loadImage("images/qualitybubbles.png");
  imgMaskMessy = loadImage("images/qualitymessy.png");
  imgMaskMinimal = loadImage("images/qualityminimal.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  dataServer = new PubNub(
  {
    publish_key   : pubKey,
    subscribe_key : subKey,
    ssl: true
  });

  dataServer.addListener({ message: readIncoming });
    dataServer.subscribe({channels: ["shape", "colour", "quality"]});
}

function draw() {
  background(255);
  loadPixels();
         for (var y = 0; y < height; y++){
           for (var x = 0; x < width; x++){
               var index = (x + y * width)*4;
               pixels[index+0] = x;
               pixels[index+1] = 100;
               pixels[index+2] = y;
               pixels[index+3] = 155;
           }
       }
    updatePixels();
  text("Scientific Name:", 70, 70);
  textSize(50);

  if(shape == "stubby"){
    image(imgStar4, windowWidth/2, windowHeight/2);
    imgStar4.mask(imgMaskBubbles);
    imageMode(CENTER);
    textSize(50);
    text("ASTRO", 70, 120);
  }
  if(shape == "wavy"){
    image(imgStar1, windowWidth/2, windowHeight/2);
    imgStar1.mask(imgMaskMinimal);
    imageMode(CENTER);
    textSize(50);
    text("SPINU", 70, 120);
  }
  if(shape == "thin"){
    image(imgStar2, windowWidth/2, windowHeight/2);
    imgStar2.mask(imgMaskBubbles);
    imageMode(CENTER);
    textSize(50);
    text("VALVA", 70, 120);
  }
  if(shape == "loose"){
    image(imgStar3, windowWidth/2, windowHeight/2);
    imgStar3.mask(imgMaskMessy);
    imageMode(CENTER);
    textSize(50);
    text("BRINSI", 70, 120);
  }
  if(colour == "purple"){
    tint(204, 0 , 204, 255);
    textSize(50);
    text("GRANU", 70, 160);
  }
  if(colour == "red"){
    tint(255, 0, 0, 255);
    textSize(50);
    text("SIDA", 70, 160);
  }
  if(colour == "orange"){
    tint(255, 128, 0, 255)
    textSize(50);
    text("GIDA", 70, 160);
  }
  if(colour == "yellow"){
    tint(255, 255, 51, 255);
    textSize(50);
    text("XILLA", 70, 160);
  }
  if(colour == "green"){
    tint(0, 255, 25, 255);
    textSize(50);
    text("RIA", 70, 160);
  }
  if(colour == "blue"){
    tint(51, 153, 255, 255);
    textSize(50);
    text("CHORIA", 70, 160);
  }
}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == "shape")
  {
    shape = inMessage.message.messageText
  }

  if(inMessage.channel == "colour")
  {
    colour = inMessage.message.messageText
  }

  if(inMessage.channel == "quality")
  {
    quality = inMessage.message.messageText
  }
}
