var load = require('./sass-loader')

module.exports = function (cooking) {
  var loader
  var SOURCE_MAP = cooking.config.sourceMap

  if (process.env.NODE_ENV === 'production') {
    loader = load({
      sourceMap: SOURCE_MAP ? '#source-map' : false,
      extract: !!cooking.config.extractCSS
    })
  } else {
    loader = load()
  }

  cooking.add('loader.scss', {
    test: /\.scss$/,
    loader: loader.scss
  })

  cooking.add('loader.sass', {
    test: /\.sass$/,
    loader: loader.sass
  })
}
