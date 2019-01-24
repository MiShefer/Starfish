//server variables
var dataServer;
var pubKey = 'pub-c-32c6be58-06f2-4d96-9387-76a7a479e147';
var subKey = 'sub-c-9b111b84-1a63-11e9-b552-46d61eed2fbc';

var channelName = "starfish";

//*********************************************

let cellString = [];

function setup() {
  createCanvas(400, 400);
	
	buttonBubble = createButton("bubbly");
	buttonBubble.position(250, 150);
	buttonBubble.mousePressed(bubbleSelect);
	
	buttonMinimal = createButton("minimal");
	buttonMinimal.position(250, 200);
	buttonMinimal.mousePressed(minimalSelect);
	
	buttonMessy = createButton("messy");
	buttonMessy.position(250, 250);
	buttonMessy.mousePressed(messySelect);

	dataServer = new PubNub(
	{
		publish_key		: pubKey,
		subscribe_key	: subKey,
		ssl: true
	});

	dataServer.subscribe({channels: [channelName]});
}

function draw() {
  background(220);
	console.log(cellString);
}

function bubbleSelect() {
	cellString.push("bubble");
  buttonBubble.hide();
  buttonMinimal.hide();
  buttonMessy.hide();

  sendMessage();

}

function minimalSelect() {
	cellString.push("minimal");
  buttonBubble.hide();
  buttonMinimal.hide();
  buttonMessy.hide();

  sendMessage();

}

function messySelect() {
	cellString.push("messy");
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
			messageText: cellString[0]
		}
	});
}