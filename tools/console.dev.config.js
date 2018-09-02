var path = require('path');
var webpack = require('webpack');
var config = require('./console.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

config.devtool = '#source-map';                             // source-map
config.output.publicPath = '/dist/';                        // 资源路径
config.output.filename = 'js/[name].js';                       // 入口js命名
config.output.chunkFilename = 'js/[name].chunk.js';            // 路由js命名

config.module.loaders.push({
    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
    loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
});

config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin("css/[name].css",{ 
        allChunks : true,
        resolve : ['modules'] 
    }),// 提取CSS
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),                           // 提取第三方库
    new HtmlWebpackPlugin({                                                                     // 构建html文件
        filename: '../index.html',
        template: './src/template/index.ejs',
        inject: false
    })
]);


// 写入环境变量
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'export default "development";';
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
});

module.exports = config;