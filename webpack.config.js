const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
  new ManifestPlugin(),
  new LoadablePlugin({ writeToDisk: true }),
  new MiniCssExtractPlugin({
    filename: isProduction ? '[name].[chunkhash].css' : '[name].bundle.css',
    ignoreOrder: true,
  }),
];

if (isDevelopment) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NamedModulesPlugin());
  plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

const minificationPlugins = [
  new TerserPlugin({
    sourceMap: true,
    cache: true,
    parallel: true,
  }),
  new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
      map: {
        inline: false,
      },
    },
  }),
];

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    client: !isDevelopment
      ? path.resolve(__dirname, 'src/client/index.js')
      : [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, 'src/client/index.js'),
      ]
  },
  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].bundle.js',
    path: path.resolve(__dirname, './build-static'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isProduction,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: path.resolve(__dirname, 'postcss.config.js') },
              plugins: () => [
                require('postcss-import'),
                require('postcss-cssnext')({
                  browsers: ['> 1%', 'last 2 versions'],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
    ...isProduction && { minimizer: minificationPlugins }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  devtool: isProduction ? 'cheap-source-map' : false,
  performance: {
    maxAssetSize: 500000, // in bytes
    hints: false,
  },
};
