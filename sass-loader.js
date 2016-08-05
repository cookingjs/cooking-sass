var ExtractTextPlugin = require('extract-text-webpack-plugin')
var nextVersion = require('cooking').version

module.exports = function (options) {
  if (nextVersion) {
    nextVersion = Number(nextVersion.split('.')[0])
  }

  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    if (options.postcss) {
      loaders.push('postcss')
    }

    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return nextVersion > 0
        ? ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: sourceLoader
        })
        : ExtractTextPlugin.extract('style-loader', sourceLoader)
    } else {
      return ['style-loader', sourceLoader].join('!')
    }
  }

  return {
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass'])
  }
}
