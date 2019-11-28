/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = 'development'

module.exports = {
	mode: env,

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/env', { modules: false }], '@babel/react'],
						plugins: [
							...(env === 'development' ? ['react-hot-loader/babel'] : []),
							'@babel/transform-runtime'
						]
					}
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			}
		]
	},

	plugins: [
		...(env === 'development'
			? [new webpack.HotModuleReplacementPlugin()]
			: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()]),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(env)
			}
		}),

		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.html')
		})
	],

	resolve: {
		extensions: ['.js', '.jsx', '.css'],
		alias: {
			...(env === 'development'
				? { 'react-dom': '@hot-loader/react-dom' }
				: {}),
			'@': path.join(__dirname, 'src')
		}
	},

	devServer: { hot: true }
}
