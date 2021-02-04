// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebPackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		port: 3000,
		hot: true,
		open: true,
		contentBase: '../dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.(jpg|png|jpeg|gif|bmp)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							fallback: {
								loader: 'file-loader',
								options: {
									name: '[name].[ext]'
								}
							}
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.90],
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75
							}
						}
					}
				]
			},
			{
				test: /\.(mp4|ogg|mp3|wav)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit:1024,
						fallback: {
							loader: 'file-loader',
							options: {
								name: '[name].[ext]'
							}
						}
					}
				}
			},
			{
				test: /\.ts$/,
				use: [
					'ts-loader'
				]
			},
			{
				test: /\.vue$/,
				use: [
					'vue-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			title: 'vue3 + TS -> web App',
			minify: {
				collapseWhitespace: true,	//去掉空格
				removeComments: true	//去掉注释
			}
		}),
		new CleanWebPackPlugin(),
		new OptimizeCssAssetWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new VueLoaderPlugin()
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin()
		]
	}
	
}