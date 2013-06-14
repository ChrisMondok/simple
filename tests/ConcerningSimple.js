var frameworkTestContext = new Simple.Context("Basic Tests");
frameworkTestContext.add(
	new Simple.Test("Framework is defined", function() {
		var test = new Simple.Test();
		var context = new Simple.Context();
		return true;
	}),
	new Simple.Test("Tests that should pass do", function() {
		var passingTest = new Simple.Test("Returning true should pass", function() {
			return true;
		});

		passingTest.run();

		return passingTest.passed;
	}),
	new Simple.Test("Tests that should not pass don't", function() {
		var failingTest = new Simple.Test("Returning false should fail", function() {
			return false;
		});

		failingTest.run();

		return !failingTest.passed;
	})
);

var testsWithScope = new Simple.Context("Tests With Scope", new TestObject());
testsWithScope.add(
	new Simple.Test("value is defined", function() {
		return this.value !== undefined;
	}),
	new Simple.Test("value getter returns five", function() {
		return this.getValue() == 5
	})
);

var testsWithSetupAndTeardown = new Simple.Context("Tests With Setup and Teardown", new TestObject());

testsWithSetupAndTeardown.setup = function() {
	this.value = "unchanged";
}
testsWithSetupAndTeardown.teardown = function() {
	this.increment();
}

testsWithSetupAndTeardown.add(
	new Simple.Test("value is defined", function() {
		return this.value !== undefined
	}),
	new Simple.Test("value is unchanged", function() {
		return this.value == "unchanged"
	}),
	new Simple.Test("counter has been incremented twice", function() {
		return this.counter == 2;
	})
);

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

