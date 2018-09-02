var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var cssnext = require('cssnext');
var cssnano = require('cssnano');

module.exports = {
    // 入口
    entry: {
        main: ['babel-polyfill',path.join(__dirname, '../src/main')],
        vendors: ['vue', 'vue-router','iview','babel-polyfill']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../dist')
    },
    devServer: {
        host: 'a.com',
        port: 8001,
        // open: true, //自trademanage动打开浏览器，不需要可以去掉
        proxy: {//接口代理
            '/api': {
                target: 'http://192.168.1.116:5000',
                changeOrigin: true,
                secure: false
            }
        }
    },
    // 加载器
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },
        { test: /iview.src.*?js$/,
            loader: 'babel-loader' 
        }, 
        {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        },
        // {
        //     test: /\.css$/,
        //     loader: ('style', 'css?sourceMap!postcss')
        // },
        {
            test: /\.css$/,
            loader: ('style-loader!css-loader'),
        },
        {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }]
    },
    postcss: function () {
        return [cssnext, precss, cssnano]
    },
    // 转es5
    babel: {
        presets: ['es2015']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            'vue$': 'vue/dist/vue.common.js', //Standalone vs. Runtime-only Build,use Standalone
            filter: path.join(__dirname, '../src/filters'),
            components: path.join(__dirname, '../src/components')
        }
    },
    plugins: [
        
    ]
};