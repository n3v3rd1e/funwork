const config = {
	presets: [
		[
			'@babel/preset-react',
			{
				pragma: 'Snabbdom.html', // default pragma is React.createElement
				pragmaFrag: 'Snabbdom.Fragment', // default is React.Fragment
				throwIfNamespace: true // defaults to true
			}
		]
	],
	plugins: [
		["@babel/plugin-transform-typescript", { isTSX: true, jsxPragma: 'Snabbdom.createElement', allExtensions: true }],
		["@babel/plugin-syntax-object-rest-spread"],
		['@babel/plugin-proposal-async-generator-functions', { loose: true }],
		['@babel/plugin-syntax-dynamic-import'],
		['@babel/proposal-class-properties', { loose: true }],
		['@babel/proposal-decorators', { loose: true, legacy: true }],
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
