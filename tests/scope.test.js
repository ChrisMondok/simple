const Simple = require('../Simple.js');
const TestObject = require('./TestObject.js');

var testsWithScope = new Simple.Context("Tests With Scope", new TestObject());
testsWithScope.add(
	new Simple.Test("value is defined", function() {
		return this.value !== undefined;
	}),
	new Simple.Test("value getter returns five", function() {
		return this.getValue() == 5;
	})
);


module.exports = testsWithScope;
