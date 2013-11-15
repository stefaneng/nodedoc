// Eventually remove this dependency
var request = require('request');

// Node api root
var url = "http://nodejs.org/api/";

// Holds what module we are going to be accessing
//var module;

// Pretty prints the doc
exports.prettyPrintFunc = function prettyPrintFunc(obj) {
    // match the function, put into the array
    var re = /(.+)\((.*)\)/;
    var match = obj.textRaw.match(re);
    
    var functionName = match[1];    
    var args = match[2].split(',');

    // Print it in a better way later.
    console.log('Function: ' + functionName);
    for(var i = 0; i < args.length; i++) {
	// Print out arguments with whitespace stripped
	console.log("Argument " + i + ": " + args[i].replace(/\s+/g, ''));
    }
};

// finds a function in the arr of objects
exports.findFunction = function findFunction(arr, name) {
    for(var i = 0; i < arr.length; i++) {
	console.log(arr[i].name);
	if(arr[i].name == name) {	    
	    return arr[i];
	}	
    }
    // Did not find function
    return null;
};

// Access the module and return function we are looking for
exports.getDocs = function getDocs(module, func) {
    // Send a request to the api docs
    request(url + module + '.json', function(err, res, data) {
	// Request went fine
	if(!err && res.statusCode == 200) {
	    var json = JSON.parse(data);
	    // find the function in the object
	    var funcObj = exports.findFunction(json.modules[0].methods, func);
	    // if we found the object, pretty print it)
	    if (funcObj) {
		exports.prettyPrintFunc(funcObj);
	    } else {
		console.error('Could not find function.');
	    }
	} else {
	    throw err;
	}
    });
};
