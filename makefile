all: simple

clean:
	rm Simple.js

simple:
	cat src/Global.js > Simple.js
	cat src/Test.js >> Simple.js
	cat src/Context.js >> Simple.js
