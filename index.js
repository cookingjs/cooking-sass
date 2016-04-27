var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (cooking) {
  var scssLoader, sassLoader
  if (process.env.NODE_ENV === 'PRODUCTION') {
    scssLoader = ExtractTextPlugin.extract('style-loader', 'css!sass?indentedSyntax')
    sassLoader = ExtractTextPlugin.extract('style-loader', 'css!sass')
  } else {
    scssLoader = ['sass']
    sassLoader = ['sass?indentedSyntax']
  }

  cooking.add('loader.scss', {
    test: /\.scss$/,
    loader: scssLoader
  })

  cooking.add('loader.sass', {
    test: /\.sass$/,
    loader: sassLoader
  })
}
