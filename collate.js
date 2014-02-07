//colate.js
var fs = require('fs');

var inputDir = './scraped/';
var register = {};

//synchronously open each output fileopen each file
var files = fs.readdirSync(inputDir);
var counter = files.length;

files.map(function(date,i){
	fs.readFile('./scraped/' + date, 'utf8', function(err,data){
		counter --;
		if (err || date === '.DS_Store') {
			return console.log(err);
		}
		var meps = data.split('\n');
		for(var i=0; i<meps.length; i++){
			if(meps[i] === ""){

			}else{ 
				if(!register[ meps[i] ]){
					register[ meps[i] ] = [];
				}
				register[ meps[i] ].push(date);
			}
		}

		if(counter === 0){
			outputJSON( register );
		}
	});
});

function outputJSON( register ){
	fs.writeFile( './collated/register.json', JSON.stringify(register, null, 4), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("saved register");
		}
	});
}