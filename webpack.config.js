const webpack=require('webpack');
const path = require('path');
// Подключили к проекту плагины
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки

module.exports = {
  entry: {main: './src/index.js'},
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      exclude: /node_modules/, // исключает папку node_modules
      use: { loader: "babel-loader" } // весь JS обрабатывается пакетом babel-loader
          },
      {
            test: /\.css$/i, // применять это правило только к CSS-файлам
            use: [(isDev? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
        },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          
          {
            loader: 'image-webpack-loader',
            options: {
               name: '[path][name].[ext]',
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          },
        ],
      }
      ]
    },
    plugins: [ 
      new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
   }),
      new HtmlWebpackPlugin({
        // Означает, что:
        inject: false, // стили НЕ нужно прописывать внутри тегов
        hash: true,  //для страницы нужно считать хеш
        template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
        filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
      }),
      new WebpackMd5Hash(),
      new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
   })
    ]
  };