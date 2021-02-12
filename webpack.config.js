// const webpack = require("webpack");
const path = require("path");
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		main: ["@babel/polyfill", "./src/js/index.jsx"],
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "index.js",
	},
	resolve: {
		extensions: [".js", ".jsx", "ts"],
	},
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: "vendors",
	// 				chunks: "all",
	// 			},
	// 		},
	// 	},
	// },
	devtool: "source-map",
	// plugins: [
	// 	new UglifyJSPlugin({
	// 		sourceMap: true,
	// 	}),
	// ],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-jsx"],
					},
				},
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-typescript"],
						plugins: ["@babel/plugin-proposal-class-properties"],
					},
				},
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"],
					},
				},
			},
		],
	},
};
