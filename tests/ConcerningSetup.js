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
