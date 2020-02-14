# javascript-minifier
Wrapper for https://javascript-minifier.com/.

Install with `npm i javascript-minifier`.

Example:
```js
import { minify } from "javascript-minifier";
import { readFileSync } from "fs";

var code = readFileSync("./script.js").toString();

minify(code)
	.then(newCode => console.log(newCode))
	.catch(error => {
		throw error;
	});
```
