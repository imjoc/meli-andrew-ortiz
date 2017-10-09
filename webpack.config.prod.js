const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: [path.resolve(__dirname, "src")],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/"
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
				WEBPACK: true
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, "src", "assets"),
				to: path.resolve(__dirname, "dist", "assets")
			}
		]),
		new ExtractTextPlugin("bundle.css")
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					query: {
						presets: ["es2015", "react", "stage-0"]
					}
				},
				include: path.resolve(__dirname, "src")
			},
			{
				test: /\.jpe?g$|\.gif$|\.png$/i,
				loader: "file-loader?name=[path][name].[ext]"
			},
			{
				test: /\.scss/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						"css-loader",
						"sass-loader",
						{
							loader: "postcss-loader",
							options: {
								plugins: function () {
									return [
										require("autoprefixer")
									];
								}
							}
						}
					],
				}),
				include: path.resolve(__dirname, "src")
			}
		]
	}
};
