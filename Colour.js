var dataServer;
var pubKey = 'pub-c-32c6be58-06f2-4d96-9387-76a7a479e147';
var subKey = 'sub-c-9b111b84-1a63-11e9-b552-46d61eed2fbc';

var channelName = "colour";

//**********************************************************

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  textSize(50);
 
  buttonRed = createButton("red");
  buttonRed.position(windowWidth/2, windowHeight/2 + 120);
  buttonRed.mousePressed(redSelect);
  buttonRed.style('font-size', '35px');
    
  buttonOrange = createButton("orange");
  buttonOrange.position(windowWidth/2, windowHeight/2 + 60);
  buttonOrange.mousePressed(orangeSelect);
  buttonOrange.style('font-size', '35px');
    
  buttonYellow = createButton("yellow");
  buttonYellow.position(windowWidth/2, windowHeight/2);
  buttonYellow.mousePressed(yellowSelect);
  buttonYellow.style('font-size', '35px');
    
  buttonGreen = createButton("green");
  buttonGreen.position(windowWidth/2, windowHeight/2 - 60);
  buttonGreen.mousePressed(greenSelect);
  buttonGreen.style('font-size', '35px');
 
  buttonBlue = createButton("blue");
  buttonBlue.position(windowWidth/2, windowHeight/2 - 120);
  buttonBlue.mousePressed(blueSelect);
  buttonBlue.style('font-size', '35px');
    
  buttonPurple = createButton("purple");
  buttonPurple.position(windowWidth/2, windowHeight/2 - 180);
  buttonPurple.mousePressed(purpleSelect);
  buttonPurple.style('font-size', '35px');

//      PUBNUB

  dataServer = new PubNub(
  {
    publish_key   : pubKey,
    subscribe_key : subKey,
    ssl: true
  });

  dataServer.subscribe({channels: [channelName]});
  
}

function draw() {
  background(220);
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
  text('CHOOSE A COLOUR FOR THE STARFISH', windowWidth/4, 90);
}

function redSelect() {
  colour = "red";
  buttonRed.hide();
  buttonOrange.hide();
  buttonYellow.hide();
  buttonGreen.hide();
  buttonBlue.hide();
  buttonPurple.hide();
  sendMessage();
}

function orangeSelect() {
  colour = "orange";
  buttonRed.hide();
  buttonOrange.hide();
  buttonYellow.hide();
  buttonGreen.hide();
  buttonBlue.hide();
  buttonPurple.hide();
  sendMessage();
}

function yellowSelect() {
  colour = "yellow";
  buttonRed.hide();
  buttonOrange.hide();
  buttonYellow.hide();
  buttonGreen.hide();
  buttonBlue.hide();
  buttonPurple.hide();
  sendMessage();
}

function greenSelect() {
  colour = "green";
  buttonRed.hide();
  buttonOrange.hide();
  buttonYellow.hide();
  buttonGreen.hide();
  buttonBlue.hide();
  buttonPurple.hide();
  sendMessage();
}

function blueSelect() {
  colour = "blue";
  buttonRed.hide();
  buttonOrange.hide();
  buttonYellow.hide();
  buttonGreen.hide();
  buttonBlue.hide();
  buttonPurple.hide();
  sendMessage();
}

function purpleSelect() {
  colour = "purple";
  buttonRed.hide();
  buttonOrange.hide();
  buttonYellow.hide();
  buttonGreen.hide();
  buttonBlue.hide();
  buttonPurple.hide();
  sendMessage();
}

function sendMessage(){
  dataServer.publish(
  {
    channel: channelName,
    message:
    {
      messageText: colour
    }
  });
}