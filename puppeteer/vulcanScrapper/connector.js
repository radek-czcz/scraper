var net = require('net');
var client = net.connect({port: 8085}, function() {
   console.log('connected to server!');  
});

client.on('data', function(data) {
   console.log(data.toString());
   client.end();
});

client.on('end', function() { 
   console.log('disconnected from server');
});

console.log("abc");

// client.write('new data')