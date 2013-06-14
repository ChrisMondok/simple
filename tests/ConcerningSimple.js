var frameworkTestContext = new Simple.Context("Basic Tests");
frameworkTestContext.add(
	new Simple.Test("framework is defined", function() {
		var test = new Simple.Test();
		var context = new Simple.Context();
		return true;
	}),
	new Simple.Test("tests that should pass do", function() {
		var passingTest = new Simple.Test("Returning true should pass", function() {
			return true;
		});

		passingTest.run();

		return passingTest.passed;
	}),
	new Simple.Test("tests that should not pass don't", function() {
		var failingTest = new Simple.Test("Returning false should fail", function() {
			return false;
		});

		failingTest.run();

		return !failingTest.passed;
	})
);


