// const path = require('path');

// module.exports = {
//   entry: './ChannelsDB/src/App.tsx',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'distor'),
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js', '.scss'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.scss$/,
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//         sideEffects: true,
//       },
//     ],
//   },
// };

// const path = require('path');
// const glob = require('glob');

// module.exports = {
//   entry: {
//     app: './ChannelsDB/src/App.tsx',
//     channelsDB: glob.sync('./ChannelsDB/js/*.js'),
//   },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'distor'),
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js', '.scss'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.scss$/,
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//         sideEffects: true,
//       },
//     ],
//   },
//   mode: 'development',
// };


// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './ChannelsDB/src/App.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/ChannelsDB'),
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './ChannelsDB/index.html'
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './ChannelsDB/js/*.js', to: () => { return `js/[name][ext]`;} },
        { from: './ChannelsDB/css/styles.css', to: () => { return `css/[name][ext]`;} },
        { from: './ChannelsDB/fonts/*', to: () => { return `fonts/[name][ext]`;} },
        { from: './ChannelsDB/images/*', to: () => { return `images/[name][ext]`;} },
        { from: './ChannelsDB/index.html', to: 'index.html' },
      ]
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        sideEffects: true,
      },
    ],
  },
};