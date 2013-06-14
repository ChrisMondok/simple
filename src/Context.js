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
			if(test instanceof Simple.Test || test instanceof Context)
				this.tests.push(test);
			else
				throw "argument (" + test + ") is not a test";
		}
	}

	Context.prototype.run = function(scope) {
		var scope = this.scope || scope;
		for(var t in this.tests)
		{
			if(this.setup)
				this.setup.bind(scope)();
			this.tests[t].run(scope);
			if(this.teardown)
				this.teardown.bind(scope)();
		}
	}

	Context.prototype.getResults = function() {
		var results = {};

		for(var i = 0; i < this.tests.length; i++)
		{
			var test = this.tests[i];
			if(test instanceof Simple.Test)
			{
				var result = undefined;
				if(test.passed === true)
					result = "passed";
				else
					if(test.passed === false)
						result = "failed"
					else
						result = test.passed;
			}
			else
				if(test instanceof Simple.Context)
					result = test.getResults();

			results[this.tests[i].name] = result;
		}

		return results;
	}

	namespace.Context = Context;
})(Simple);
