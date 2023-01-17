module.exports = {
	format: {
		customFormat: function ({ dictionary, options }) {
			return dictionary.allTokens
				.map(token => {
					let value = JSON.stringify(token.value)
					if (options.outputReferences) {
						if (dictionary.usesReference(token.original.value)) {
							const refs = dictionary.getReferences(token.original.value)
							refs.forEach(ref => {
								value = value.replace(ref.value, function () {
									return `${ref.name}`
								})
							})
						}
					}

					return `export const ${token.name} = ${value};`
				})
				.join(`\n`)
		},
	},

	source: [
		"input/dark/*.json",
		"input/global/*.json",
		"input/light/*.json",
		"input/typographyProduct/*.json",
	],
	platforms: {
		css: {
			transformGroup: "css",
			buildPath: "web/prod/",
			transforms: ["attribute/cti", "name/cti/kebab"],
			files: [
				{
					destination: "style.css",
					format: "css/variables",
					options: {
						outputReferences: true,
					},
				},
				{
					destination: "style.scss",
					format: "scss/variables",
					options: {
						outputReferences: true,
					},
				},
			],
		},
	},
}
