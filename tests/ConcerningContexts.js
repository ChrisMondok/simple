var contextTests = new Simple.Context("Context Tests")
contextTests.add(
	new Simple.Test("a scope should be made when one isn't provided", function() {
		var ctx = new Simple.Context("Scopeless context");
		ctx.setup = function() {this.x = "set"};
		ctx.add(
			new Simple.Test("Value is set", function() {
				return this.x == "set";
			})
		);
		ctx.run();
		return ctx.getResults()["Value is set"] == "passed";
	}),
	new Simple.Test("tests shouldn't operate directly on scopes or tests", function() {
		var test = new Simple.Test("This test", function() {
			return !(this instanceof Simple.Test || this instanceof Simple.Context);
		});

		test.run();

		return test.passed;
	})
);

