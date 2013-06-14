function TestObject() {
	this.value = 5;
	this.counter = 0;
}

TestObject.prototype.getValue = function() {
	return this.value;
}

TestObject.prototype.increment = function() {
	this.counter++;
}

