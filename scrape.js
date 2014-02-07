//scritp for scraping EU parliament attendance

var jsdom = require('jsdom');
var fs = require('fs');
var moment = require('moment');

// example attendance page 
// http://www.europarl.europa.eu/sides/getDoc.do?type=PV&reference=20131212&secondRef=ATT-REG&format=XML&language=EN
var rootURL = 'http://www.europarl.europa.eu'
var firstPage = '/sides/getDoc.do?type=PV&reference=20090714&secondRef=TOC&language=EN';
var attendanceLinkString = 'ATTENDANCE REGISTER';
var nextLinkString = 'Next';
var jQueryScript = 'http://code.jquery.com/jquery.js';
var outdir = 'scraped';

jsdom.env(rootURL + firstPage, [jQueryScript], parseIndex);

function parseIndex(errors, window){
	var $ = window.$;
	var attendanceLink = $('a:contains("' + attendanceLinkString + '")').attr('href');
	var nextLink = $('a:contains("' + nextLinkString+ '")').attr('href');
	jsdom.env(rootURL + attendanceLink, [jQueryScript], parseAttendance);
	jsdom.env(rootURL + nextLink, [jQueryScript], parseIndex);
}

function parseAttendance(errors, window){
	var $ = window.$;
	var date = $($('td.doc_title')[0]).text().split(' -')[0].split(', ')[1];
	var list = $($('p.contents')[1]).text().split(', ').join('\n');
	var day = moment(date);
	console.log('got attendance for ' + day.format('YYYY-MM-DD'));
	fs.writeFile(outdir+'/' + day.format('YYYY-MM-DD'), list, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("saved " + date);
		}
	});
}