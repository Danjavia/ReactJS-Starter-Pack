const path = require( 'path' )
const node_modules = path.resolve( __dirname, 'node_modules' )
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require( "webpack" )
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AppCachePlugin = require('appcache-webpack-plugin')

const PATHS = {
	app: path.resolve(__dirname, 'src/main.js' ),
	build: path.resolve(__dirname, 'build' ),
	fonts: path.resolve(__dirname, 'src/fonts'),
	images: path.resolve(__dirname, 'src/images'),
	indexfile: path.resolve(__dirname, 'index.html' )
};

module.exports = {

	entry: [ 'webpack/hot/dev-server', PATHS.app ],

	output: {
		path: PATHS.build,
		filename: 'bundle-[hash].js'
	},

	module: {
		loaders: [
			{
				test: /\.(jsx|es6|js)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					presets: [ 'react', 'es2015' ]
				}
			},

			// BOOTSTRAP && OUR FONTS
			{ test: /\.(ttf|eot|svg|woff|woff2?)(\?[a-z0-9]+)?$/, loader : 'file-loader?name=[name]-[hash].[ext]' },

			{ test: /\.eot(\?-[a-z0-9]+)?$/, loader: 'file-loader?fonts/name=[name]-[hash].[ext]' },

			// FONT AWESOME FONTS
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },

			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },

			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },

			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=100000" },

			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },

			// IMAGES
			{ test: /\.(png|jpg|svg)$/, loader: 'url?limit=25000' },

			{ test: /\.svg$/, loader: 'raw-loader' },

			// LESS
            { test: /\.less$/, loader: "style!css!less" },

            // { test: /\.less$/, loader: ExtractTextPlugin.extract("css-loader!autoprefixer-loader!less-loader")},

			// SASS
			{ test: /\.scss$/, loader: 'style!css!sass'	}
		]
	},

	plugins: [

		new webpack.optimize.UglifyJsPlugin({ output: {comments: false}, mangle: false }),

        new CopyWebpackPlugin([

            { from: PATHS.fonts, to: 'fonts' },
            { from: PATHS.images, to: 'images' }

        ], {
            ignore: [
                // Doesn't copy any files with a txt extension
                '*.txt'
            ]
        }),

		new webpack.DefinePlugin({
		    'process.env.NODE_ENV': '"development"'
		}),

		new HtmlWebpackPlugin({
	      	title: 'ComparaMejor.com',
	      	filename: 'index.html',
	      	template: 'src/index.html',
	      	bundle: 'bundle-[hash].js'
	    }),

		new OpenBrowserPlugin({ url: 'http://localhost:5000' }),

		new AppCachePlugin({
	      	cache: [],
			//     	network: null,  // No network access allowed!
	      	fallback: [],
	      	settings: ['prefer-online'],
	      	exclude: ['file.txt'],  // Exclude file.txt and all .js files
	      	output: 'starter-reactjs-cm.appcache'
	    })
		// new ExtractTextPlugin( "./[name].css" )

	]

};
