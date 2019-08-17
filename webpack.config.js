const path = require('path');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new ManifestPlugin(),
  new MiniCssExtractPlugin({
    filename: isProduction ? '[name].[chunkhash].css' : '[name].bundle.css',
  }),
];

const minificationPlugins = [
  new TerserPlugin(),
  new OptimizeCSSAssetsPlugin({}),
];

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
    ...isProduction && { minimizer: minificationPlugins }
  },
  entry: {
    client: path.resolve(__dirname, 'src/client/index.js'),
  },
  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/webpack'),
  },
  plugins,
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
          isProduction ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          } : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: path.resolve(__dirname, 'postcss.config.js') },
              plugins: () => [
                // eslint-disable-next-line global-require
                require('postcss-import'),
                // eslint-disable-next-line global-require
                require('postcss-cssnext')({
                  // If you don't set this, you get the GB preset default,
                  // which is fine in most cases
                  browsers: ['> 1%', 'last 2 versions'],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".json"],
  },
  devtool: isProduction ? 'cheap-source-map' : 'cheap-module-eval-source-map',
  performance: {
    maxAssetSize: 500000, // in bytes
  },
};
