var webpack = require('webpack');
var path = require('path');
var config = require('./console.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var fs = require('fs');


Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
    value: function () {
        function timeDir(n) {
            return (n < 10 ? '0' : '') + n;
        }

        return this.getFullYear() +
            timeDir(this.getMonth() + 1) +
            timeDir(this.getDate()) +
            timeDir(this.getHours()) +
            timeDir(this.getMinutes()) +
            timeDir(this.getSeconds());
    }
});

var dateDir = new Date().YYYYMMDDHHMMSS();
config.output.publicPath = ''; // 资源路径,根据需要可改为cdn地址
config.output.filename = 'v' + dateDir + '/js/[name].[chunkhash:8].js'; // 带hash值的入口js名称
config.output.chunkFilename = 'v' + dateDir + '/js/chunk.[name].[chunkhash:8].js'; // 带hash值的路由js名称

config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader!postcss-loader", {
                publicPath: ""
                    // 特别提醒,如果这里的publicPath是以http://xxx.xxx这样以http://开头的,要写成
                    // publicPath: "http:\\xxx.xxx",否则会编译为"http:/xxx.xxx"
            }
        )
    }
};

config.module.loaders.push({
    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
    loader: 'url-loader?limit=8192&name=v'+ dateDir +'/images/[name].[hash:8].[ext]'
});

config.plugins = (config.plugins || []).concat([
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '../'),
    }),
    new ExtractTextPlugin('v' + dateDir + "/css/[name].[chunkhash:8].css", {
        allChunks: true,
        resolve: ['modules']
    }), // 提取带hash值的css名称
    new webpack.optimize.CommonsChunkPlugin('vendors', 'v' + dateDir + '/js/vendors.[chunkhash:8].js'), // 提取带hash值的第三方库名称
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({ // 压缩文件
        compress: {
            warnings: false
        }
    }),
    // new HtmlWebpackPlugin({ // 构建html文件
    //     filename: './index.html',
    //     template: './src/template/index.ejs',
    //     inject: false,
    //     minify:{//压缩HTML文件
    //         removeComments:true,//移除html中的注释
    //         collapseWhitespace:false//删除空白符与换行符
    //     }
    // })
]);
var ejsFiles = fs.readdirSync('./src/template');
var ejsFilesList = [];
ejsFiles.forEach(function(item, index){
    const element = item.split('.ejs')[0];
    var conf = {
        filename: './' + element + '.html',
        template: './src/template/' + element + '.ejs',   // 获取最初的html末班
        inject:  false,          // 插入文件的位置
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

// 写入环境变量
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {});
});

module.exports = config;