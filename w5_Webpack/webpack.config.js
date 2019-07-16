'use strict';
const webpack = require('webpack');
const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


module.exports = {
	// 入口文件
	entry:{
		app:path.join(__dirname,'./app/index.js'),
		list:path.join(__dirname,'./app/list.js')
	},
	output:{
		path:path.join(__dirname,'./build'),
		filename:'[name]-bundle-[hash].js'
	},

	// 开发模式
	mode:'development',//development,production,none
	plugins:[
		new webpack.BannerPlugin('copyright laoxie'),

		// 用于生成html文件的插件
		new HtmlWebpackPlugin({
			title:'Laoxie Webpack',
			template:'app/index.html'
		}),
		new CopyWebpackPlugin([
			{
				from:'./app/img',
				to:'./img'
			}
		]),
		new CleanWebpackPlugin('build'),
		new ExtractTextWebpackPlugin('css/common.css')
	],
	module:{
		rules:[
			{ 
				test: /\.css$/, 
				use: ExtractTextWebpackPlugin.extract({
					use: 'css-loader',
					fallback:'style-loader'
		        })  
			},
			{
				test:/\.js$/,
				// include:'./src/',
				use:[{
					loader:'babel-loader',
					options:{
						presets:['env']
					}

				}]
			}
		]
	}
}