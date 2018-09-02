<style scoped>
    .panel {
        border-top: 1px solid #e8eaec;
        padding-bottom: 10px;
    }
    .panel-header {
        /* overflow: hidden; */
        padding-top: 10px;
    }
    .title {
        float: left;
        text-align: center;
        font-size: 13px;
        padding: 6.5px 0px;
        min-width: 66px;
        border-radius: 4px;
        background: #2d8cf0;
        color: #fff;
        display: inline-block;
        margin-right: 20px;
    }
    .header {
        /* overflow: hidden; */
        position: relative;
        line-height: 32px;
    }
</style>
<template>
    <div class="panel">
        <div class="panel-header">
            <span class="title">{{title}}</span>
            <div class="header">
                <slot name="header"></slot>
            </div>
        </div>
        <div class="panel-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                default: '标题'
            }
        },
        data() {
            return {
            }
        },
        methods: {
        },
        mounted(){
        }
    }
</script>