const config = {
	presets: ['@babel/preset-typescript'],
	plugins: [
		['@babel/plugin-proposal-async-generator-functions', { loose: true }],
		['@babel/plugin-syntax-dynamic-import'],
		['@babel/proposal-class-properties', { loose: true }],
		['@babel/proposal-decorators', { loose: true, legacy: true }],
		['@babel/proposal-object-rest-spread', { loose: true }],
		["transform-react-jsx", {"pragma": "Snabbdom.createElement"}]

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
