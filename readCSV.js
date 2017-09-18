var fs = require('fs');

var csv = fs.createReadStream('drones.csv');

var data = '';
csv.on('data', function(d){
	data += d;
})

var droneArray = [];

csv.on('end', function(){
	var rows = data.split('\n');
	for(var i=0; i<rows.length; i++){
		var entries = rows[i].split(',');
		droneArray.push(entries);
	}
	csv.close();
})
