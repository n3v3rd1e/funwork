const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const envConfig = require('./.env.js');
const isDev = process.env.NODE_ENV === 'development';

const config = {
	entry: isDev
		? ['./src/index.ts']
		: ['@babel/polyfill', './src/index.ts'],
	mode: isDev ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: [
					'babel-loader',
				],
				exclude: /node_modules/
			}
		]
	},
	stats: 'errors-only',
	devtool: isDev ? 'inline-source-map' : 'source-map',
	output: {
		path: path.resolve(__dirname, './lib'),
		filename: 'index.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.less'],
		alias: {
			'~': path.resolve(__dirname, './node_modules'),
			'@': path.resolve(__dirname, './src')
		}
	},
	performance: {
		hints: false
	},
	plugins: [
		new CleanWebpackPlugin(path.resolve(__dirname, './lib')),
		new ForkTsCheckerWebpackPlugin(),
		new webpack.EnvironmentPlugin(envConfig),
	]
};

if (isDev) {
	config.plugins = [
		...config.plugins,
		new FriendlyErrors({
			compilationSuccessInfo: {
				messages: [
					`Application is running on ${chalk.bold.cyan(`http://localhost:${port}`)}`,
					...Object.keys(envConfig).map(key => `${key}: ${chalk.bold.cyan(envConfig[key])}`)
				]
			}
		})
	];
} else {
	config.plugins = [
		...config.plugins,
		new webpack.NoEmitOnErrorsPlugin(),
		new ProgressBarPlugin()
	];
}

if (envConfig.APP_ENV === 'analyze') {
	config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
