const config = {
	presets: [],
	plugins: [
		["@babel/plugin-transform-typescript", { isTSX: true, jsxPragma: 'Snabbdom', allExtensions: true }],
		["@babel/plugin-syntax-object-rest-spread"],
		['@babel/plugin-proposal-async-generator-functions', { loose: true }],
		['@babel/plugin-syntax-dynamic-import'],
		['@babel/proposal-class-properties', { loose: true }],
		['@babel/proposal-object-rest-spread', { loose: true }]
	],
	ignore: ['node_modules', 'build']
};

if (process.env.NODE_ENV == 'production') {
	config.presets = config.presets.concat([
		[
			'@babel/preset-env',
			{
				targets: { browsers: ['edge > 14'] },
				useBuiltIns: 'usage',
				modules: false,
				loose: true
			}
		]
	]);
}

module.exports = config;
