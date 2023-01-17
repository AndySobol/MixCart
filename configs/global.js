const { transform } = require("@divriots/style-dictionary-to-figma")

module.exports = {
	source: ["input/global/*.json"],
	format: {
		figmaTokensPlugin: ({ dictionary }) => {
			const transformedTokens = transform(dictionary.tokens, {
				defaultTokenset: false
			})
			return JSON.stringify(transformedTokens, null, 2)
		},
	},
	platforms: {
		json: {
			transformGroup: "js",
			buildPath: "output/",
			files: [
				{
					destination: "global.json",
					format: "figmaTokensPlugin",
				},
			],
		},
	},
}
