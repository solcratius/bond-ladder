const Path = require('path'),
  Webpack = require('webpack'),
  merge = require('webpack-merge'),
  autoprefixer = require('autoprefixer'),
  common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    inline: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          configFile: '.eslintrc.js'
        }
      },
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          'css-loader?sourceMap=true',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions']
                })
              ]
            }
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/styles/resources/resources.scss'
            }
          }
        ]
      }
    ]
  }
});
