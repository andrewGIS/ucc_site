var path = require('path');
var webpack = require('webpack');

// для разного запуска webpacka || если ее нет то "developmnet"
//const NODE_ENV = process.env.NODE_ENV || "developmnet";
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  //mode:"development",
  //watch: NODE_ENV == "developmnet",
  //context: path.resolve(__dirname, './src'),
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },
  // если есть переменная то создаем сорс мэпы, если нет то вообще их не создаем
  //devtool: NODE_ENV == "developmnet" ? "eval" : null,
  devtool:"inline-source-map",
  //либо "cheap-inline-module-source-map" на продакшн можно source-map
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  // для файлов
  resolve:{
    extensions:['.js', '.vue', '.json'],// чтобы vue собирался добавлены расширения , '.vue', '.json'
    alias: {
      // без этой строчки не собирался vue 
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // убедитесь что подключили плагин!
    new VueLoaderPlugin(),
    new ExtractTextPlugin('style.css')
  ],
  devServer:{
    port: 9000
  }
  
}