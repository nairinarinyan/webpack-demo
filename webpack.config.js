const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'source-map',
    context: __dirname + '/src', //absolute
    entry: {
        app: [
            // 'webpack-dev-server/client?http://0.0.0.0:8080',
            // 'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client',
            './index.js'
        ],
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('dist'), //absolute
        publicPath: '/dist/'
    },
    resolve: {
        // root: path.resolve('./src/modules'),
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: [path.resolve('./src')], exclude: /node_modules/ },
            { test: /\.styl$/, loaders: ['style', 'css', 'stylus']},
        ]
    },
    stylus: {
        use: [require('nib')(), require('rupture')()],
        import: ['~nib/lib/nib/index.styl']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.HotModuleReplacementPlugin()
    ]
};