var path = require('path');

module.exports = {
    entry: "./scripts/imports.js",
    output: {
        path: './',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|eot|woff2|woff|svg|ttf)$/,
                loader: "file-loader?name=assets/[path][name].[ext]"
            }
        ]
    }
}