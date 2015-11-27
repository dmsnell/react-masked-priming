var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	entry: './src/app.jsx',
	output: {
		path: './',
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: [ 'babel-loader' ]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: [ 'style', 'css', 'sass' ]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin( {
			inject: true,
			templateContent:
				'<html><head>' +
				'<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>' +
				'</head><body><div id="app-container"/></body></html>'
		} )
	],
	resolve: {
		modulesDirectories: [ '', 'src', 'node_modules' ],
		extensions: [ '', '.js', '.jsx' ]
	},
	devtool: 'sourcemap'
};
