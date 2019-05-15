var path = require('path')
var webpack = require('webpack')

// для разного запуска webpacka || если ее нет то "developmnet"
const NODE_ENV = process.env.NODE_ENV || "developmnet";
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  //mode:"development",
  //watch: NODE_ENV == "developmnet",
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },
  // если есть переменная то создаем сорс мэпы, если нет то вообще их не создаем
  //devtool: NODE_ENV == "developmnet" ? "eval" : null,
  devtool:"source-map",
  //либо "cheap-inline-module-source-map" на продакшн можно source-map
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  // для файлов
  resolve:{
    extensions:['.js','.ts','.tsx', '.vue', '.json'],// чтобы vue собирался добавлены расширения , '.vue', '.json'
    alias: {
      // без этой строчки не собирался vue 
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module:{
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            //'scss':'style!css!sass',
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // убедитесь что подключили плагин!
    new VueLoaderPlugin()
  ]
  
}