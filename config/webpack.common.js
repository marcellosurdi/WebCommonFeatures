const path = require( 'path' );
const paths = require( './project-paths' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

const config = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/inline',
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/inline',
      }
    ],
  },

  output: {
    path: paths.build,

    publicPath: '/',

    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: true,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    }
  },

  plugins: [
    new CleanWebpackPlugin( { }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.static + '/img',
          to: paths.build + '/img'
        },
      ],
    }),
  ],
};


module.exports = config;
