"use strict";

import { stringify } from "querystring";
import { request } from "https";

export function minify(code) {
	var query = stringify({ input: code });

	return new Promise((resolve, reject) => {
		var req = request({
		    		method: "POST",
		    		hostname: "javascript-minifier.com",
		    		path: "/raw"
		    	},
		    	res => res.on("data", d => resolve(d.toString()))
		    );

		req.on("error", err => reject(err));
		req.setHeader("Content-Type", "application/x-www-form-urlencoded");
		req.setHeader("Content-Length", query.length);
		req.end(query, "utf8");
	});
}