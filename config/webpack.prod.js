const version = JSON.stringify( require( '../package.json' ).version ).replace( /"/g, '' );
const paths = require( './project-paths' );
const common = require( './webpack.common' );
const webpack = require( 'webpack' );
const { merge } = require( 'webpack-merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );
const CssMinimizerWebpackPlugin = require( 'css-minimizer-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = ( env, argv ) => {
   return merge( common, {
      mode: 'production',

      entry: {
        'web-common-features': paths.src + '/prod.js',
      },

      devtool: false,

      module: {
        rules: [
          {
            test: /\.(css|scss)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader',
              'sass-loader',
            ],
          },
        ],
      },

      output: {
        filename: 'js/[name].min.js',

        library: {
          name: 'WebCommonFeatures',
          type: 'umd',
        },
      },

      plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].min.css',
        }),

        new HtmlWebpackPlugin({
          filename: 'index.html',
          title: 'index@' + version,
          template: paths.static + '/tpl/prod.html',
          inject: false,
          minify: false,
        }),
      ],

      optimization: {
        minimizer: [
          new TerserWebpackPlugin( {} ),
          new CssMinimizerWebpackPlugin()
        ],
      },
    }
  );
}
