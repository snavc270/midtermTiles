//change the port address for your arduino
//run by writing "node socketServer.js" in terminal

//-----------------------SETTING UP OUR PORT AND WEB SOCKET SERVER----------------------------

// create a serial object via the serialport module
var SerialPort = require("serialport");

// list all the serial ports that the process sees
// this way you can write it out in the next section
SerialPort.list(function (err, ports) {
	ports.forEach(function(port) {
		console.log(port.comName);
	});
});

//open a port on the serial port connected to the arduino.
//i wrote it out specifically here as "/dev/cu.usbmodem1411" - 
//you'll most likely have to change yours
//we specify the baudrate and also how much of the input to buffer
var port = new SerialPort("/dev/cu.usbmodem1411", {
  baudRate: 115200,
  parser: SerialPort.parsers.readline('\n')
});

//set up a websocketserver to send the data 
//this uses the npm module "ws"
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8081}); //this port matches the one in our p5 code
var connections = [];	//list of connections

//------SETTING UP OUR CALLBACKS FOR RECEIVING SERIAL INPUT AND HANDLING SOCKET CONNECTIONS--------

//when the serial port receives data, call the sendSerialData function
port.on('data', sendSerialData);

//when the web sockets server sees a connection, call the handleConnection function
wss.on('connection', handleConnection);

//---------------------------DEFINING OUR CALLBACKS AND OTHER FUNCTIONS-----------------------------

function sendSerialData(data) {
	// if there are webSocket connections, send the serial data to them
	if (connections.length > 0) {
		for (var myConnection in connections) {
			connections[myConnection].send(data);
		}
	}

	// uncomment this to see the serial data in terminal as the server runs:
	console.log(data); 

}

//this function adds socket connections to our connection array.
//i.e. we might have more than one sketch polling this connection.
function handleConnection(client) {
	console.log("New connection");
	connections.push(client);
	client.on('close', function() {
		console.log("connection closed");
		var position = connections.indexOf(client);
		connections.splice(position, 1);
	});
}