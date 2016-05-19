const path = require( 'path' )
const CopyWebpackPlugin = require('copy-webpack-plugin')
const node_modules = path.resolve( __dirname, 'node_modules' )
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AppCachePlugin = require('appcache-webpack-plugin')
const webpack = require( "webpack" )

const PATHS = {
	app: path.resolve(__dirname, 'src/main.js' ),
	build: path.resolve(__dirname, 'dist' ),
	main: path.resolve(__dirname, 'build/index.html' ),
	index: path.resolve(__dirname, 'index.html' ),
	fonts: path.resolve(__dirname, 'src/fonts'),
	images: path.resolve(__dirname, 'src/images')
}

NODE_ENV='production'

module.exports = {

	entry: PATHS.app,

	output: {
		path: PATHS.build,
		filename: 'bundle-[hash].js',
    	hash: true
	},

	// For joi libs
	node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
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
			{ test: /\.(ttf|eot|svg|woff|woff2?)(\?[a-z0-9]+)?$/, loader : 'file-loader?name=font/[name].[ext]' },

			{ test: /\.eot(\?-[a-z0-9]+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=font/[name].[ext]" },

			// FONT AWESOME FONTS
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=font/[name].[ext]" },

			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=font/[name].[ext]" },

			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=font/[name].[ext]" },

			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=100000&name=font/[name].[ext]" },

			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=font/[name].[ext]" },

			// IMAGES
			{ test: /\.(png|jpg)$/, loader: 'url?limit=25000&name=images/[name].[ext]' },

			{ test: /\.svg$/, loader: 'raw-loader' },

			// LESS
            // { test: /\.less$/, loader: "style!css!less" },

            { test: /\.less$/, loader: ExtractTextPlugin.extract("css-loader!autoprefixer-loader!less-loader")},

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
		new ExtractTextPlugin( "./[name].css" ),
		new webpack.DefinePlugin({
		    'process.env.NODE_ENV': '"production"'
		}),
		new HtmlWebpackPlugin({
	      	title: 'ComparaMejor.com',
	      	filename: 'index.html',
	      	template: 'src/index.html',
	      	bundle: 'bundle-[hash].js'
	    }),

		new AppCachePlugin({
	      	cache: [],
			//     	network: null,  // No network access allowed!
	      	fallback: [],
	      	settings: ['prefer-online'],
	      	exclude: ['file.txt'],  // Exclude file.txt and all .js files
	      	output: 'starter-reactjs-cm.appcache'
	    })
    ]
};
