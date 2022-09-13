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
        'web-common-features': {
          import: paths.src + '/pro.js',
          library: {
            name: 'WebCommonFeatures',
            type: 'umd',
          },
        },

        megamenu: {
          import: paths.src + '/megamenu-pro.js',
        },

        multilevelmenu: {
          import: paths.src + '/multilevelmenu-pro.js',
        },
      },

      output: {
        filename: 'js/[name].min.js',
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

      plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].min.css',
        }),

        new HtmlWebpackPlugin({
          filename: 'index.html',
          title: 'index@' + version,
          template: paths.static + '/tpl/pro.html',
          inject: false,
          minify: false,
        }),

        new HtmlWebpackPlugin({
          filename: 'megamenu.html',
          title: 'megamenu@' + version,
          template: paths.static + '/tpl/megamenu-pro.html',
          inject: false,
          minify: false,
        }),

        new HtmlWebpackPlugin({
          filename: 'multilevelmenu.html',
          title: 'multilevelmenu@' + version,
          template: paths.static + '/tpl/multilevelmenu-pro.html',
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
