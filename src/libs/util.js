// 公用方法
let util = {}
/**
 * 去掉开始和结尾的空格
 * param: 允许是String,Object
 *
 **/ 	
util.trim = function(param){
    var obj = param,
        reg = /^\s+|\s+$/g;

    if (typeof param == 'string') {
        obj = obj.replace(reg, '');
    } else if (util.isObj(param)){
        for (var i in obj) {
            if (typeof obj[i] == 'string') {
                obj[i] = obj[i].replace(reg, '');
            }
        }
    }
    return obj;
};
/**
 * ajax请求
 * param属性
 * type: 请求类型 String
 * url: 请求路径 String
 * data: 请求参数 Object
 * loading: 添加loading状态
 * success: 成功时的回调 Function
 * error: 失败时的回调 Function
 * 
 **/ 
util.ajax = function(param){
    var that = this;
    // 加载中
    this[param.loading] = true;
    // 配置
    var axiosConfig = {
        method: param.type.toUpperCase(),
        url: param.url,
    };
    var paramData = param.data;
    // 清除参数前后空格 
    if (util.isObj(param.data)){
        paramData =  this.trim(param.data);
    }
    // get和post请求时传递参数
    if (param.type.toUpperCase() == 'GET') {
        axiosConfig.url = axiosConfig.url + '?v=' + new Date().getTime();
        axiosConfig.params = paramData;
    } else {
        axiosConfig.data = paramData;
    }
    // 发送请求
    this.axios(axiosConfig)
    .then((response) => {
        let rel = response.data;
        if (rel.status == 200) {
            param.success(rel.data);
        } else {
            if(param.error){
                param.error(rel);
            }
            this.$Message.error({
                content:rel.msg,
                duration: 5
            });

        }
        this[param.loading] = false;
        
    })
    .catch((error) => {
        if (error.response && error.response.status == 401) {
            this.$router.push({
                name: 'login'
            })
        }
        let errMsg = error.message
        that[param.loading] = false;
        this.$Message.error({
            content:errMsg,
            duration: 3
        });
    });
};
// clone
util.cloneObj = function (obj) {
    var that = this;
    var o;
    if (obj.constructor == Object) {
        o = new obj.constructor();
    } else {
        o = new obj.constructor(obj.valueOf());
    }
    for (var key in obj) {
        if (o[key] != obj[key]) {
            if (typeof (obj[key]) == 'object') {
                o[key] = that.cloneObj(obj[key]);
            } else {
                o[key] = obj[key];
            }
        }
    }
    o.toString = obj.toString;
    o.valueOf = obj.valueOf;
    return o;
};
// 删除为空的项
util.dealObj = function(obj){
    var temp = {};
    for(var i in obj){
        if(!util.isEmpty(obj[i])){
            temp[i] = obj[i];
        } 
    }
    return temp;
};

// 创建url
util.createUrl = function(obj,url){
    var str = '';
    for(var i in obj){
        if(!util.isEmpty(obj[i])){
            str = str + '&' + i + '=' + obj[i]; 
        }
    }
    str = str.substring(1);
    if (url) {
        if(url.indexOf('?') < 0) {
            str = url + '?' + str;
        } else {
            str = url + '&' + str;
        }
    }
    return str;
};
// 判断是否为空
util.isEmpty = function(str){
    return (str===null || str===undefined || str==='');   
};
// 格式化时间
util.dateFormat = function(val){
    if (!val) return val;
    var val = parseInt(val.getTime());
    var date = new Date(val),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        min = date.getMinutes(),
        s = date.getSeconds(),
        str = '';

    function check (value){
        return value > 9 ? value : '0' + value;
    }
    return '' + y + '-' + check(m) + '-' + check(d) + ' ' + check(h) + ':' + check(min) + ':' + check(s);
};
// 将时间转化为一天的最近一个时间点，23:59:59
util.dateEndFormat = function(d){
    var date = new Date(d),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = 23,
        min = 59,
        s = 59;

    function check (value){
        return value > 9 ? value : '0' + value;
    }
    return '' + y + '-' + check(m) + '-' + check(d) + ' ' + h + ':' + min + ':' + s;
};
util.isObj = function(param){
    return Object.prototype.toString.call(param) === '[object Object]';
};
util.isNumber = function(val){
    var reg = /^\d+$/;
    return reg.test(val);
};
// 表头吸顶
util.onFixTableHead = function(className){
    let baseNode = document.getElementsByClassName(className)[0];

    // 主表格
    let mainNode = baseNode.getElementsByClassName('ivu-table')[0];
    init(mainNode,50,'ivu-table-header','ivu-table-body');

    // 左边固定列
    let leftNode = baseNode.getElementsByClassName('ivu-table-fixed');
    if(leftNode.length > 0){
        init(leftNode[0],100,'ivu-table-fixed-header','ivu-table-fixed-body');
        leftNode[0].style['z-index'] = 200;
    }
    // 右边固定列
    let rightNode = baseNode.getElementsByClassName('ivu-table-fixed-right')
    if(rightNode.length > 0){
        init(rightNode[0],111,'ivu-table-fixed-header','ivu-table-fixed-body');
        rightNode[0].style['z-index'] = 200;
    }

    function init(baseNode,zIndex,headerClassName,bodyClassName){
        let tableClientRect = baseNode.getBoundingClientRect();
        let theader = baseNode.getElementsByClassName(headerClassName)[0];
        let tbody = baseNode.getElementsByClassName(bodyClassName)[0];
        let htader_top,body_top;
        window.addEventListener('scroll', function() {
            util.throttle(cb,this,50);

        }, false);
        // 处理函数
        function cb(){
            let headerClientRect = theader.getBoundingClientRect();
            if(headerClientRect.top < 0) {
                theader.style['position'] = 'fixed';
                theader.style['top'] = 0;
                theader.style['z-index'] = zIndex;
                theader.style.width = tableClientRect.width + 'px';
            } 
            let bodyClientRect = tbody.getBoundingClientRect();
            if(bodyClientRect.top > headerClientRect.height){
                theader.style['position'] = 'static';
                theader.style.width = 'auto'
            }
        }
    }
};
// 函数节流
util.throttle = function(fn, context, time){
    clearTimeout(fn.timeId);
    // 记录当前时间
    fn.cur = Date.now();
    // 设置开始执行时间
    if(!fn.start) {
      fn.start = fn.cur;
    }
    // 计算是否执行，若当前时间减开始执行时间大于延迟执行时间，则产即执行，并且重置开始时间
    if(fn.cur - fn.start > time) {
        fn.call(context);
        fn.start = fn.cur;
    } else {
        fn.timeId = setTimeout(function(){
          fn.call(context);
        }, time);
    }
}
// 元转化成分
util.toFen = function(val){
    val = '' + val;
    var str,arr = val.split('.');
    if (arr.length==1){
        str = arr + '00';
    } else {
        str = arr[0] + arr[1];
        if(arr[1].length == 1) {
            str += '0'
        }
    }
    return new Number(str).valueOf();
}
// 判断是否是鼠标左键
util.isLeftMouse = function(e) {
    if (this.isIE() && e.button === 1) {
        return true;
    } else if (e.button === 0) {
        return true;
    } else {
        return false;
    }
}
// 判断是否是IE
util.isIE = function() {
    return document.attachEvent ? true : false;
};

util.category = [
    {}
]
util.getStatusList = function(){
    return [
        {id:0, name: '已删除'},
        {id:1, name: '已发布'},
        {id:2, name: '待发布'}
    ];
}

export default util;