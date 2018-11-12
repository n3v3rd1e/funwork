const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const envConfig = require('./src/.env.js');
const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 4000;

const config = {
	entry: isDev
		? ['./src/index.tsx']
		: ['@babel/polyfill', './src/index.tsx'],
	mode: isDev ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						options: {
							sourceMap: isDev
						}
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: process.env.NODE_ENV !== 'production'
						}
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: isDev,
							javascriptEnabled: true
						}
					}
				]
			},
			{
				test: /\.(ts|tsx)$/,
				use: [
					'babel-loader',
					// {
					// 	loader: 'ts-loader',
					// 	options: {
					// 		transpileOnly: true
					// 	}
					// }
				],
				exclude: /node_modules/
			},
			{
				test: /\.css/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: isDev
						}
					}
				],
				include: /node_modules/
			},
			{
				test: /\.(woff2?|ttf|eot|otf)$/,
				loader: 'file-loader',
				options: {
					name: path => {
						if (!/node_modules|bower_components/.test(path)) return 'fonts/[name].[hash].[ext]';

						return (
							'fonts/vendor/' +
							path.replace(/\\/g, '/').replace(/((.*(node_modules|bower_components))|fonts|font|assets)\//g, '') +
							'?[hash]'
						);
					}
				}
			},
			{
				test: /\.(bmp|png|jpe?g|gif|svg|ico|ani|cur)$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: path => {
								if (!/node_modules|bower_components/.test(path)) return 'images/[name].[hash].[ext]';

								return (
									'images/vendor/' +
									path
										.replace(/\\/g, '/')
										.replace(/((.*(node_modules|bower_components))|images|image|img|assets)\//g, '') +
									'?[hash]'
								);
							}
						}
					},
					'img-loader'
				]
			}
		]
	},
	stats: 'errors-only',
	devtool: isDev ? 'inline-source-map' : 'source-map',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: isDev ? 'app.bundle.js' : 'app.bundle.[hash].js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.less'],
		alias: {
			'@nx-js/observer-util': '@nx-js/observer-util/dist/es.es6.js',
			'@button': path.resolve(__dirname, './src/components/reusable/Button/Button.tsx'),
			'@framework': path.resolve(__dirname, './framework'),
			'~': path.resolve(__dirname, './node_modules'),
			'@reusable': path.resolve(__dirname, './src/components/reusable'),
			'@components': path.resolve(__dirname, './src/components'),
			'@enums': path.resolve(__dirname, './src/enums'),
			'@router': path.resolve(__dirname, './src/router/index.ts'),
			'@store': path.resolve(__dirname, './src/store'),
			'@mixins': path.resolve(__dirname, './src/styles/mixins.less'),
			'@variables': path.resolve(__dirname, './src/styles/variables.less'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@views': path.resolve(__dirname, './src/views'),
			'@': path.resolve(__dirname, './src')
		}
	},
	devServer: {
		port,
		historyApiFallback: true
	},
	performance: {
		hints: false
	},
	plugins: [
		new CleanWebpackPlugin(path.resolve(__dirname, './dist')),
		new ForkTsCheckerWebpackPlugin(),
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
		new webpack.EnvironmentPlugin(envConfig),
		new HtmlWebpackPlugin({
			template: 'index.html',
			title: 'App',
			inject: true
		})
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
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		}),
		new OptimizeCSSAssetsPlugin({}),
		// new CopyWebpackPlugin([{ from: 'src/static', to: './static' }]),
		new webpack.NoEmitOnErrorsPlugin(),
		new ProgressBarPlugin()
	];
}

if (envConfig.APP_ENV === 'analyze') {
	config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
