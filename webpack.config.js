var serverConfig = {
    entry: './src/server.ts',
    target: 'node',
    mode: 'development',
    output: {
        path: __dirname + '/dist',
        filename: 'server.js'
    },

    // Enable source maps
    devtool: "source-map",

	externals: {
	},
		

    module: {
		rules: [
			{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.js$/, enforce: "pre", loader: "source-map-loader" }
		]
    },

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    }

};

module.exports = [ serverConfig ];
