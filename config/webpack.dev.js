let webpack = require("webpack");
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var Manifest= require('webpack-manifest');
module.exports = {
  entry: {
    index:[
        path.join(__dirname,'../src/public/scripts/index.es'),
        path.join(__dirname,'../src/public/scripts/indexadd.js')
    ],
    tag:[
     path.join(__dirname,'../src/public/scripts/tag.es'),
     path.join(__dirname,'../src/public/scripts/star.es')
    ]
  },
  output: {
    path: path.join(__dirname, '../build/'),
    filename: 'public/scripts/[name]-[hash:5].js'
  },
   module: {
    rules: [
      {
        test: /\.es$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins:[
   new webpack.DefinePlugin({
         'process.env':{
            NODE_ENV:'"dev"'
          }
   }),
   new LiveReloadPlugin({appendScriptTag: true}),
   new ExtractTextPlugin("public/css/[name]-[hash:5].css"),
   new webpack.optimize.CommonsChunkPlugin({
    name:'vendor',
    filename:'public/scripts/common/vendor-[hash:5].min.js',
   }),
  new HtmlWebpackPlugin({
        filename:"./views/layout.html",
        template: "src/widget/layout.html",
        inject:false
    }),
    new HtmlWebpackPlugin({
        filename:"./views/index.html",
        template: "src/views/index.js",
        chunks:['vendor','index','tag'],
        inject:false
    }),
     new HtmlWebpackPlugin({
        filename:"./widget/index.html",
        template: "src/widget/index.html",
        inject:false
    }),
      new HtmlWebpackPlugin({
        filename:"./views/star.html",
        template: "src/views/star.js",
        chunks:['vendor','index','tag'],
        inject:false
    }),
     new HtmlWebpackPlugin({
        filename:"./widget/star.html",
        template: "src/widget/star.html",
        inject:false
    }),
     new Manifest({
        cache: [
        //需要缓存的内容
          '../public/css/vendor.css'
        ],
        //Add time in comments.
        timestamp: true,
        // 生成的文件名字，选填
        // The generated file name, optional.
        filename:'cache.manifest',
        // 注意*星号前面用空格隔开
        network: [
          '*'
        ],
        // manifest 文件中添加注释
        // Add notes to manifest file.
        headcomment:"koatesing",
        master: ['../views/layout.html']
    })
]

}
