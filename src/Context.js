(function(namespace) {
	function Context(name, scope) {
		this.name = name;
		this.setup = null;
		this.teardown = null;
		this.tests = [];
		this.scope = scope || {};
	}

	Context.prototype.add = function() {
		for(var i = 0; i < arguments.length; i++)
		{
			var test = arguments[i];
			if(test instanceof Simple.Test)
				this.tests.push(test);
			else
				throw "argument (" + test + ") is not a test";
		}
	}

	Context.prototype.run = function() {
		this.tests.forEach(function(test) {
			if(this.setup)
				this.setup.call(this.scope);
			test.run(this.scope);
			if(this.teardown)
				this.teardown.call(this.scope);
		}, this);
	}

	Context.prototype.getResults = function() {
		var results = {};

		for(var i = 0; i < this.tests.length; i++)
		{
			var test = this.tests[i];
			var result = undefined;
			if(test.passed === true)
				result = "passed";
			else
				if(test.passed === false)
					result = "failed"
				else
					result = test.passed;

			results[this.tests[i].name] = result;
		}

		return results;
	}

	namespace.Context = Context;
})(Simple);
