let webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
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
    filename: 'public/scripts/[name]-[hash:5].js',
    publicPath:'http://192.168.1.101:3000',
    path: path.join(__dirname, '../build/')
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
            NODE_ENV:'"prod"'
          }
   }),
   new LiveReloadPlugin({appendScriptTag: true}),
   new ExtractTextPlugin("public/css/[name]-[hash:5].css"),
   new webpack.optimize.UglifyJsPlugin({
     compress:{
       warnings:false,
       drop_console:false,
     }
   }),
   new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
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
    })
]
}
