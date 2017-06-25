

'use strict';

let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  entry: './src/app.js',   //打包的入口文件
  //设置打包以后的文件存储的位置
  output: {
    path: path.join(__dirname, 'dist'), //打包文件存储的目录
    filename: 'build.js'   //打包的文件名
  },
  module: {
    loaders: [
      {
        test: /\.css$/,   //配置后缀名
        //css-loader   处理样式文件中的url()  
        //style-loader  作用 是吧css代码，插入到网页中 style
        loader: 'style-loader!css-loader!autoprefixer-loader'   //loader执行的顺序从右到左
      },
      {
        test: /\.less$/,   //配置后缀名
        loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'   //loader执行的顺序从右到左
      },
      {
        test: /\.scss$/,   //配置后缀名
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'   //loader执行的顺序从右到左
      },
      {
        //设置处理不同类型的文件
        test: /\.(jpg|gif|png|eot|svg|ttf|woff|otf)$/,
        loader: 'url-loader?limit=90000'  
      },
      {
        //把js文件中的es6--》es5
        test: /\.js$/,
        exclude: /node_modules/,           //排除指定内容
        loader: 'babel-loader'
      },
      {
          test: /\.vue$/,
          loader: 'vue-loader'
      }
    ]
  },
  plugins: [
        new htmlWebpackPlugin({
            title: '页面标题',  //生成页面标题
            filename: 'index.html',
            template: 'template.html'
        }),
        new webpack.LoaderOptionsPlugin({
         options: {
           babel: {
                  presets: ['es2015'],
                  plugins: ['transform-runtime']   //为了转换.vue中的es6的语法
            }
         }
       })
     ]
}