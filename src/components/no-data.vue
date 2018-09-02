<style>
    /*暂无数据*/
    .no-data{
        display: none;
        text-align: center;
    }
    .no-data:first-child{
        display: table-row;
    }
    .no-data-word{
        line-height: 65px;
        color:#aaa;
    }
    /*加载中*/
    .loading{
        color:#39f;
        padding:13px 0;
    }
    .loading-icon{
        animation: ani-loading-spin 1s linear infinite;
    }
    @keyframes ani-loading-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

</style>
<template>
    <transition name="fade">
        <tr class="no-data">
            <td :colspan="colspan">
                <div class="no-data-word" v-if="!loading"></div>
                <div class="loading" v-if="loading">
                    <Icon type="load-c" size=18 class="loading-icon"></Icon>
                    <div>Loading</div>
                </div>
            </td>
        </tr>
    </transition>
</template>
<script>

    export default {
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            colspan: {
                type: String,
                default: "1"
            },
        },
        data () {
            return {
            };
        },
        computed: {
            
        },
        mounted () {
        }
    };
</script>
