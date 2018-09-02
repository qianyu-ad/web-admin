<style scoped>
    .kel-wrap{
        border:1px solid #ccc;
        min-height: 100%;
        position: relative;
    }
    .kel-wrap-hight-add{
        position: absolute;
        bottom:0;
        right: 0;
        z-index: 3000;
    }


    .kel-anim{
        transition:all .3s;
    }
    .kel-item{
        /*width: 200px;*/
        position: absolute;
        border:1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 0 4px rgba(0,0,0,.2);
        -webkit-user-select:none;
    }
    .kel-item-head{
        height: 40px;
        background-color: rgba(0,0,0,.3);
        box-shadow: 0 0 1px rgba(0,0,0,.3);
        line-height: 40px;
        text-align: center;
        cursor: move;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        opacity: 0;
        z-index: 20;
    }
    .kel-item-head .blk{
        display: block;
    }
    .kel-item:hover .kel-item-head{
        opacity: 1;
    }
    .kel-item-cont{
        height: 100%;
    }
    .kel-check-group{
        width:70px;
    }
    .kel-ctrl-ico{
        position: absolute;
        font-size: 16px;
        z-index: 10;
        cursor: pointer;
    }
    .kel-ctrl-ico:hover{
        color:#2d8cf0;
    }
    .kel-size{
        right: -8px;
        bottom: -7px;
        transform: rotate(90deg);
    }
    .kel-resize{
        display: block;
        position: absolute;
        z-index: 10;
        width: 8px;
        height: 8px;
        border:1px solid #ccc;
        background-color: #fff;
        cursor: crosshair;
        opacity: 0;
        transition:all .3s;
    }
    .kel-resize:hover{
        border-color:#2d8cf0;
    }
    .kel-item:hover .kel-resize{
        opacity: 1;
    }
    .kel-resize-right{
        right:-4px;
        top:50%;
        margin-top: -4px;
    }
    .kel-resize-bottom{
        left:50%;
        bottom:-4px;
        margin-left: -4px;
    }
    .kel-resize-right-bottom{
        right:-4px;
        bottom:-4px;
    }
    .kel-close{
        top:13px;
        right: 5px;
    }

    .kel-setting{
        top:0;
        right: 0;
    }
    .kel-ic-info{
        height: 80px;
        padding:8px 0;
        text-align: center;
        position: relative;
    }
    .kel-ovelipsis{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .kel-ic-info .kel-item-info-title{
        height: 24px;
        line-height: 24px;
        font-size: 16px;
        padding:0;
        margin:0;
        font-weight: 400;
    }
    .kel-ic-info .kel-item-info-date{
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color:#666;

    }
    .kel-ic-info .kel-item-info-quota{
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color:#666;

    }
    .kel-ic-info .kel-style-set-ctrl{
        margin-bottom: 6px;
    }
    .kel-ic-info .kel-style-set-ctrl button{
        margin-right: 2px;
    }
    .kel-ic-pic{
        background-size: 100% 100%;
        background-image: url(../img/1.png);
        height: 60px;
        position: relative;
        /*padding-top: 10px;*/
    }
    /*线图*/
    .kel-ic-pic-1{
        background-image: url(../img/type-1.png);
    }
    /*柱图*/
    .kel-ic-pic-2{
        background-image: url(../img/type-2.png);
    }
    /*饼图*/
    .kel-ic-pic-3{
        background-image: url(../img/type-3.png);
    }
    /*累计图*/
    .kel-ic-pic-4{
        background-image: url(../img/type-4.png);
    }
    .kel-ic-table{
        background-size: 100% 100%;
        background-image: url(../img/table.png);
        height: 60px;
        position: relative;
        /*padding-top: 10px;*/
    }
    .kel-ic-th{
        /*line-height: 40px;*/
        font-size: 14px;
        color:#444;
        text-align: center;
        white-space: nowrap;
        position: relative;
    }
    .kel-ic-th:after{
        content: ' ';
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
        line-height: 0;
    }
    .kel-ic-tb{
        float: left;
        width:50%;
        /*line-height: 100%;*/
        position: relative;
    }
    .kel-ic-hb{
        float: left;
        width:50%;
        position: relative;
    }
    .kel-style-set-ctrl{
        height: 24px;
        margin-bottom: 5px;
        overflow: hidden;
        
    }
    .kel-ic-tb:hover .kel-style-set-ctrl,
    .kel-ic-hb:hover .kel-style-set-ctrl{
        display: block;
    }
    .kel-style-set-ctrl .span{
        float: left;
        display: block;
        height: 24px;
        line-height: 24px;
        width:40px;
        font-size: 12px;
    }
    .kel-style-set-ctrl .button{
        display: block;
        float: left;
        margin-right: 5px;
    }
    .kel-border-right{
        border-right: 1px solid #ccc;
    }
    .kel-ic-cl{
        border-bottom: 1px solid #ccc;
    }
    .kel-w1{
        width:135px;
    }
    .kel-w2{
        width:40px;
    }
    .kel-w3{
        width:94px;
    }
    .kel-item .echarts{
        background:#fff;
    }

</style>
<style>
    /*概述区域设置*/
    .kel-card-set.ivu-poptip{
        opacity: 0;
        position: absolute;
        bottom:5px;
        right:5px;
        width:16px;
        height: 16px;
    }
    .kel-head-set.ivu-poptip{
        opacity: 1;
    }
    .kel-head-set.ivu-poptip{
        bottom:11px;
        right: 24px;
    }
    .kel-head-set .ivu-poptip-popper{
        min-width: 80px;
    }

    .kel-ic-card:hover .kel-card-set{
        opacity: 1;
    }
    .kel-card-set .ivu-poptip-rel{
        display: block;
        height: 100%;
        width:100%;
    }

    .kel-item .ivu-table-cell{
        padding-left: 8px;
        padding-right: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
<template>
    <div class="kel-wrap" ref="pageContent">
        <div class="kel-item" 
            v-for="(item, index) in items" 
            @mousedown="resetIndex(item)"
            :style="{'left':item.left+'px','top':item.top+'px','z-index':item.zindex,'width':item.width+'px','height':item.height+'px'}"
            ref='elItem'>
            <!-- 拖拽区域 -->
            <div v-if="item.isEdit" class="kel-item-head kel-anim" @mousedown="moveItem($event,item)">
                <Icon class="kel-close kel-ctrl-ico" type="md-close" @click.native="remove(index)"></Icon>
                <Poptip class="kel-card-set kel-head-set" trigger="hover" placement="bottom" >
                    <Icon class="kel-setting kel-ctrl-ico" type="ios-settings"></Icon>
                    <div slot="content">
                        <section class="kel-check-group">
                            <Checkbox v-for="opt in item.options" 
                                v-model="opt.show" 
                                @on-change="changeCheckbox(item)"
                                class="blk">{{opt.title}}</Checkbox>
                        </section>
                    </div>
                </Poptip>
            </div>
            
            <!-- 内容区域 -->
            <div class="kel-item-cont">
                <section class="kel-ic-info kel-ic-cl kel-ic-card" 
                    :style="{height:item.options.info.height+'px'}"
                    v-show="item.options.info.show">
                    <!-- 概要信息 -->
                    <div class="kel-info-cont" :style="{'margin-top':item.options.info.top+'px','transform': 'scale('+item.options.info.scale+')'}">
                        <h3 class="kel-item-info-title kel-ovelipsis">{{item.title}}</h3>
                        <div class="kel-item-info-date kel-ovelipsis">{{item.startTime}}-{{item.endTime}}</div>
                        <div class="kel-item-info-quota kel-ovelipsis">指标：xxxxxx</div>
                    </div>
                    <!-- 设置 -->
                    <Poptip v-if="item.isEdit" class="kel-card-set kel-anim" trigger="hover" placement="bottom" >
                        <Icon class="kel-setting kel-ctrl-ico" type="ios-settings"></Icon>
                        <div slot="content">
                            <!-- 设置位置 -->
                            <div class="kel-style-set-ctrl kel-w1">
                                <span class="span">位置：</span>
                                <Button class="button" 
                                    size="small" 
                                    @click="changeSize(item.options.info,'top',-1)">-</Button>
                                <Button class="button" 
                                    size="small" 
                                    @click="changeSize(item.options.info,'top',1)">+</Button>
                                <Input class="pull-right text-center kel-w2" v-model="item.options.info.top" size="small"/>
                            </div>
                            <!-- 设置缩放大小 -->
                            <div class="kel-style-set-ctrl kel-w1">
                                <span class="span">缩放：</span>
                                <Button class="button" 
                                    size="small" 
                                    @click="changeSize(item.options.info,'scale',-0.05)">-</Button>
                                <Button class="button"
                                    size="small" 
                                    @click="changeSize(item.options.info,'scale',0.05)">+</Button>
                                <Input class="pull-right text-center kel-w2" v-model="item.options.info.scale" size="small"/>
                            </div>
                            <!-- 标题 -->
                            <div class="kel-style-set-ctrl kel-w1">
                                <span class="span">标题：</span>
                                <Input v-model="item.title" size="small" class="kel-w3" />
                            </div>
                        </div>
                    </Poptip>

                    <!-- 缩放 -->
                    <i v-if="item.isEdit" class="kel-resize kel-resize-bottom" @mousedown="resize($event,item.options.info,'y',item)"></i>
                </section>
                <!-- 同比环比 -->
                <div class="kel-ic-th kel-ic-cl" v-show="item.options.tb.show || item.options.hb.show">
                    <section 
                        class="kel-ic-tb kel-ic-card" 
                        :class="{'kel-border-right':item.options.tb.show&&item.options.hb.show}"
                        :style="{height:item.options.tb.height+'px','line-height':item.options.tb.height+'px','font-size':item.options.tb.fontSize+'px'}"
                        v-show="item.options.tb.show">
                        同比：<span class="color-a">{{item.tb}}</span>
                        <!-- 字号大小 -->
                        <Poptip v-if="item.isEdit" class="kel-card-set kel-anim" trigger="hover" placement="bottom" >
                            <Icon class="kel-setting kel-ctrl-ico" type="ios-settings"></Icon>
                            <div slot="content">
                                <!-- 设置位置 -->
                                <div class="kel-style-set-ctrl kel-w1">
                                    <span class="span">字号：</span>
                                    <Button class="button"
                                        size="small" 
                                        :disabled="item.options.tb.fontSize<=12" 
                                        @click="changeSize(item.options.tb,'fontSize',-1)">-</Button>
                                    <Button class="button"
                                        size="small" 
                                        @click="changeSize(item.options.tb,'fontSize',1)">+</Button>
                                    <Input class="pull-right text-center kel-w2" v-model="item.options.tb.fontSize" size="small" />
                                </div>
                                
                            </div>
                        </Poptip>
                    </section>
                    <section class="kel-ic-hb kel-ic-card" 
                        :style="{height:item.options.hb.height+'px','line-height':item.options.tb.height+'px','font-size':item.options.hb.fontSize+'px'}"
                        v-show="item.options.hb.show">
                        环比：<span class="color-b">{{item.hb}}</span>
                        <!-- 字号大小 -->
                        <Poptip v-if="item.isEdit" class="kel-card-set kel-anim" trigger="hover" placement="bottom" >
                            <Icon class="kel-setting kel-ctrl-ico" type="ios-settings"></Icon>
                            <div slot="content">
                                <!-- 设置位置 -->
                                <div class="kel-style-set-ctrl kel-w1">
                                    <span class="span">字号：</span>
                                    <Button class="button"
                                        size="small" 
                                        :disabled="item.options.hb.fontSize<=12"
                                        @click="changeSize(item.options.hb,'fontSize',-1)">-</Button>
                                    <Button class="button"
                                        size="small" 
                                        @click="changeSize(item.options.hb,'fontSize',1)">+</Button>
                                    <Input class="pull-right text-center kel-w2" v-model="item.options.hb.fontSize" size="small"/>
                                </div>
                            </div>
                        </Poptip>
                    </section>
                    <i v-if="item.isEdit" class="kel-resize kel-resize-bottom" @mousedown="resize($event,item.options.tb||item.options.hb,'y',item)"></i>
                </div>
                <!-- 图 -->
                <section 
                    class="kel-ic-pic kel-ic-cl kel-ic-card" 
                    :class="{['kel-ic-pic-'+item.type]: true}"
                    :style="{height:item.options.pic.height+'px'}"
                    v-show="item.options.pic.show">
                    <i v-if="item.isEdit" class="kel-resize kel-resize-bottom" @mousedown="resize($event,item.options.pic,'y',item)"></i>
                    <chart :options="item.options.pic.picData" :style="{height:item.options.pic.height+'px',width:'auto'}" auto-resize ></chart>
                </section>
                <!-- 表 -->
                <section 
                    class="kel-ic-table kel-ic-cl kel-ic-card" 
                    :style="{height:item.options.table.height+'px'}"
                    v-show="item.options.table.show">
                    <i v-if="item.isEdit" class="kel-resize kel-resize-bottom" @mousedown="resize($event,item.options.table,'y',item)"></i>
                    <Table border :columns="item.options.table.tableHeader" :data="item.options.table.tableList" :height="item.options.table.height"></Table>
                </section>
            </div>
            <!-- 外层右侧缩放 -->
            <i v-if="item.isEdit" class="kel-resize kel-resize-right" @mousedown="resize($event,item,'x')"></i>
        </div>
        <Button @click="mulHeight" class="kel-wrap-hight-add" type="dashed">+</Button>
    </div>
</template>
<script>

    export default {
        name: 'kel',
        props: {
            items: {
                type: Array,
                default: [],

                // 表格信息
                tableHeader: []
            },
        },
        data () {
            return {
            };
        },
        computed: {
            
        },
        created(){

        },
        mounted () {

        },
        methods:{
            // 判断是否是IE
            isIE() {
                return document.attachEvent ? true : false;
            },
            // 判断是否是鼠标左键
            isLeftMouse(e) {
                if (this.isIE() && e.button === 1) {
                    return true;
                } else if (e.button === 0) {
                    return true;
                } else {
                    return false;
                }
            },

            // 手动添加的项
            moveItem(event,item){
                // this.resetIndex(item);

                if (!this.isLeftMouse(event)) return;

                let pageContentRect = this.$refs['pageContent'].getBoundingClientRect();

                // mousemove
                let mv = (e) => {
                    this.throttle(()=>{
                        
                        item.left = e.clientX - pageContentRect.left - event.offsetX ;
                        item.top = e.clientY - pageContentRect.top - event.offsetY;

                        // 边界判断
                        if(item.left < 0 ) {
                            item.left = 0;
                        }
                        if(item.top < 0 ) {
                            item.top = 0;
                        }
                        if (item.left > pageContentRect.width - item.width){
                            item.left = pageContentRect.width - item.width;
                        }
                        if (item.top > pageContentRect.height - item.height){
                            item.top = pageContentRect.height - item.height;
                        }
                    },this,50)
                    
                }
                document.addEventListener('mousemove',mv,false)
                
                let mu = (e) => {
                    document.removeEventListener('mousemove',mv);
                    document.removeEventListener('mouseup',mu);
                }
                document.addEventListener('mouseup',mu,false)
            },

            /*
             * 放大缩小
             * direction: x/y/xy
             * parentItem: 父级item,用于重新计算父级的高度
             * 
             **/ 
            resize(event,item,direction,parentItem){
                if (!this.isLeftMouse(event)) return;

                let pageContentRect = this.$refs['pageContent'].getBoundingClientRect();
                // mousemove
                let mv = (e) => {
                    this.throttle(()=>{
                        if(direction=='xy' || direction == 'x'){
                            item.width = e.clientX - event.clientX + item.defaultWidth;
                        }
                        if (direction=='xy' || direction =='y'){
                            let h = e.clientY - event.clientY + item.defaultHeight;
                            item.height = h;

                            // 如果是同比或环比，特殊处理，同比和环比高度保持一至,只做Y轴的拖拽处理
                            if(item.ctype == 'tb' || item.ctype == 'hb'){
                                parentItem.options.tb.height = parentItem.options.hb.height = h;
                            }

                        }
                        
                        // 计算parentItem高度
                        if(parentItem) {
                            this.resetParentHeight(parentItem)
                        }

                        
                    },this,50)
                    
                }
                document.addEventListener('mousemove',mv,false)
                
                let mu = (e) => {

                    // 释放鼠标后，把hight/width保存在defaultHeight/defaultWidth
                    if(direction=='xy' || direction == 'x') {
                        item.defaultWidth = item.width;
                    }
                    if (direction=='xy' || direction =='y'){
                        item.defaultHeight = item.height;

                        // 如果是同比或环比，特殊处理
                        if(item.ctype == 'tb' || item.ctype == 'hb'){
                            parentItem.options.tb.defaultHeight = parentItem.options.tb.height;
                            parentItem.options.hb.defaultHeight = parentItem.options.hb.height;
                        }
                    }

                    document.removeEventListener('mousemove',mv);
                    document.removeEventListener('mouseup',mu);
                }
                document.addEventListener('mouseup',mu,false)
            },
            // 重新计算外层框的高度
            resetParentHeight(item){
                let h = 2;
                // 概览
                if(item.options.info.show) {
                    h += item.options.info.height;
                }
                // 环比同比
                if(item.options.tb.show || item.options.hb.show) {
                    let thHeight = item.options.tb.height || item.options.hb.height
                    h += thHeight;
                }
                // 图
                if(item.options.pic.show) {
                    h += item.options.pic.height;
                }
                // 表
                if(item.options.table.show) {
                    h += item.options.table.height;
                }

                item.defaultHeight = item.height = h;
            },
            // 重设index
            resetIndex(item){
                this.items.forEach((i, index) => {
                    i.zindex = index + 1;
                });

                if (item) {
                    item.zindex = 1000;
                } 
            },
            
            //删除el
            remove(index){
                this.items.splice(index,1)
            },
            // 改变选中的项
            changeCheckbox(item) {
                this.resetParentHeight(item);
            },
            // 加减
            changeSize(item, key ,num){
                let val = parseFloat(item[key]) + parseFloat(num);
                if(val.toString().split('.').length > 1){
                    val = parseFloat(val);
                    val = parseFloat(val.toFixed(2));
                }
                item[key] = val;
            },
            // 增加page高度
            mulHeight(){
                let pageContent = this.$refs['pageContent']
                let pageContentRect = pageContent.getBoundingClientRect();
                pageContent.style['height'] = pageContent.getBoundingClientRect().height*2 + 'px'
            },
        }
    };
</script>
