var dataServer;
var pubKey = 'pub-c-32c6be58-06f2-4d96-9387-76a7a479e147';
var subKey = 'sub-c-9b111b84-1a63-11e9-b552-46d61eed2fbc';

var channelName = "shape";

//**********************************************************

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  textSize(50);
    
  buttonThick = createButton("thin");
  buttonThick.position(windowWidth/2, windowHeight/2 + 60);
  buttonThick.mousePressed(thickSelect);
  buttonThick.style('font-size', '35px');
    
  buttonThin = createButton("wavy");
  buttonThin.position(windowWidth/2, windowHeight/2);
  buttonThin.mousePressed(thinSelect);
  buttonThin.style('font-size', '35px');
    
  buttonWavy = createButton("loose");
  buttonWavy.position(windowWidth/2, windowHeight/2 - 60);
  buttonWavy.mousePressed(wavySelect);
  buttonWavy.style('font-size', '35px');
 
  buttonStub = createButton("stubby");
  buttonStub.position(windowWidth/2, windowHeight/2 - 120);
  buttonStub.mousePressed(stubSelect);
  buttonStub.style('font-size', '35px');

  
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
  text('CHOOSE A FORM FOR THE STARFISH', windowWidth/4, 70);
}


function thickSelect() {
  shape = "loose";
  buttonThick.hide();
  buttonThin.hide();
  buttonWavy.hide();
  buttonStub.hide();

  sendMessage();

}

function thinSelect() {
  shape = "thin";
  buttonThick.hide();
  buttonThin.hide();
  buttonWavy.hide();
  buttonStub.hide();

  sendMessage();
}

function wavySelect() {
  shape = "wavy";
  buttonThick.hide();
  buttonThin.hide();
  buttonWavy.hide();
  buttonStub.hide();

  sendMessage();
}

function stubSelect() {
  shape = "stubby";
  buttonThick.hide();
  buttonThin.hide();
  buttonWavy.hide();
  buttonStub.hide();

  sendMessage();
}

function sendMessage(){
  dataServer.publish(
  {
    channel: channelName,
    message:
    {
      messageText: shape
    }
  });
}