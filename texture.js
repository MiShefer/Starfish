//server variables
var dataServer;
var pubKey = 'pub-c-32c6be58-06f2-4d96-9387-76a7a479e147';
var subKey = 'sub-c-9b111b84-1a63-11e9-b552-46d61eed2fbc';

var channelName = "quality";

//**********************************************************

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  textSize(50);
    
  buttonBubble = createButton("bubbly");
  buttonBubble.position(windowWidth/2, windowHeight/2 + 90);
  buttonBubble.mousePressed(bubbleSelect);
  buttonBubble.style('font-size', '35px');
    
  buttonMinimal = createButton("minimal");
  buttonMinimal.position(windowWidth/2, windowHeight/2 - 90);
  buttonMinimal.mousePressed(minimalSelect);
  buttonMinimal.style('font-size', '35px');
    
  buttonMessy = createButton("messy");
  buttonMessy.position(windowWidth/2, windowHeight/2);
  buttonMessy.mousePressed(messySelect);
  buttonMessy.style('font-size', '35px');


  dataServer = new PubNub(
  {
  	publish_key		: pubKey,
	subscribe_key	: subKey,
	ssl: true
	});

  dataServer.subscribe({channels: [channelName]});
}

function draw() {
	background(150);

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
    text('CHOOSE A TEXTURE FOR THE STARFISH', windowWidth/4, 90);
}

function bubbleSelect() {
  quality = "bubble";
  buttonBubble.hide();
  buttonMinimal.hide();
  buttonMessy.hide();

  sendMessage();

}

function minimalSelect() {
  quality = "minimal";
  buttonBubble.hide();
  buttonMinimal.hide();
  buttonMessy.hide();

  sendMessage();

}

function messySelect() {
  quality = "messy";
  buttonBubble.hide();
  buttonMinimal.hide();
  buttonMessy.hide();

  sendMessage();
}

function sendMessage(){
  dataServer.publish(
  {
	channel: channelName,
	message:
	{
		messageText: quality
	}
});
}