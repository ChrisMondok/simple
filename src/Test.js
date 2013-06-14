(function() {
	function Test(name, fn) {
		this.name = name;
		this.fn = fn;
		this.passed = undefined;
		this.exception = null;
	}

	Test.prototype.run = function(scope) {
		if(scope)
			fn = this.fn.bind(scope);
		else
			fn = this.fn;

		try {
			this.passed = Boolean(fn());
		} catch (e) {
			this.passed = false;
			this.exception = e;
			if(Simple.rethrow)
				throw e;
		}
	}

	Simple.Test = Test;
})();
