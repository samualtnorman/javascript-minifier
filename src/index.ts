import { stringify } from "querystring"
import { request } from "https"

export function minify(code: string | Buffer) {
	let query = stringify({ input: code.toString() })

	return new Promise<string>((resolve, reject) => {
		let req = request({
				method: "POST",
				hostname: "javascript-minifier.com",
				path: "/raw"
			},
			res => res.on("data", (chunk: Buffer) => {
				let code         = chunk.toString(),
					message      = "",
					line         = 0,
					col          = 0,
					errorOccured = false

				if (code.substring(0, 11) == "// Error : ") {
					let lines = code.split("\n");

					if (lines.length == 3) {
						message = lines[0].substring(11)

						if (
							lines[1].substring(0, 11) == "// Line  : "
							&& lines[2].substring(0, 11) == "// Col   : "
						) {
							line = parseInt(lines[1].substring(11))
							col = parseInt(lines[2].substring(11))
							errorOccured = true
						}
					}
				}

				if (errorOccured)
					reject({ message, line, col })
				else
					resolve(code)
			})
		)

		req.on("error", reject)
		req.setHeader("Content-Type", "application/x-www-form-urlencoded")
		req.setHeader("Content-Length", query.length)
		req.end(query)
	})
}
