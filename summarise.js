var fs = require('fs');
var d3 = require('d3');

fs.readFile('./collated/register.json', 'utf8', function(err,d){
	var register = JSON.parse(d);
	var data = [];
	for( var mep in register){
		data.push({
			name:mep,
			record:register[mep],
			total:register[mep].length
		})
	}
	var summary = {
		members:data.length,
		extent:d3.extent(data, function(d){ return d.total; }),
		mean:d3.mean(data, function(d){ return d.total; }),
		median:d3.median(data, function(d){ return d.total; })
	}

	console.log(summary);
});