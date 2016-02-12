const walk = require('walk').walk;
const spawn = require('child_process').spawn;
const colors = require('colors');
const path = require('path');

const testPattern = /.*\.test\.js$/;

const contexts = [];


console.info("Loading test contexts");
const walker = walk([__dirname, 'tests'].join(path.sep));

walker.on('file', function(root, fileStats, next) {
	if(testPattern.test(fileStats.name))
		loadTests([root, fileStats.name].join(path.sep));
	next();
});

walker.on('end', function() {
	runTests();
	printResults();
});

function loadTests(fname) {
	try {
		var context = require(fname);
		if(context && context.run)
			contexts.push(context);
		else
			throw new Error("No context provided. Perhaps you forgot to export it?");
	} catch (e) {
		printFailure("Couldn't load "+path.relative(__dirname, fname)+"\n\t"+e.message);
	}
}

function runTests() {
	console.info("Running "+contexts.length+" test contexts");
	contexts.forEach(function(ctx) {
		ctx.run();
	});
}

function printResults() {
	contexts.forEach(function(ctx) {
		console.log();
		console.log(ctx.name);
		ctx.tests.forEach(function(test) {
			switch(test.passed) {
				case true:
					printSuccess(test.name);
					break;
				case false: 
					printFailure(test.name);
					break;
				default: 
					printIndeterminate(test.name);
					break;
			}
		});
	});
}

function printSuccess(message) {
	console.log(' ✓ '.green + message);
}

function printFailure(message) {
	console.error(' ✗ '.red + message);
}

function printIndeterminate(message) {
	console.error(' ? '.yellow + message);
}
