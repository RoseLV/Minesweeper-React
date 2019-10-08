const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const htmlWebpackPlugin = new HtmlWebpackPlugin({
// 	template: path.join(__dirname, "./public/index.html"),
// 	filename: "./public/index.html"
// });

module.exports = {
    mode: 'development',
	entry: path.join(__dirname, "./src/index.js"),
	output: {
		path: path.join(__dirname, "./dist"),
        filename: "bundle.js",
        publicPath: '/',
    },
    // devtool: 'inline-source-map',
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			use: "babel-loader",
			exclude: /node_modules/
		},{
            test: /\.css$/,
			use: [
                // MiniCssExtractPlugin.loader,
                'css-loader'
              ],
            exclude: /node_modules/
        },
        // {
        //     loader: require.resolve('file-loader'),
        //     // Exclude `js` files to keep "css" loader working as it injects
        //     // its runtime that would otherwise be processed through "file" loader.
        //     // Also exclude `html` and `json` extensions so they get processed
        //     // by webpacks internal loaders.
        //     exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        //     options: {
        //       name: 'static/media/[name].[hash:8].[ext]',
        //     },
        //   }
        // ** STOP ** Are you adding a new loader?
        // Make sure to add the new loader(s) before the "file" loader.
        ]
	},
	plugins: [new HtmlWebpackPlugin()],
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
	}
};