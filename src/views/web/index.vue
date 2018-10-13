<style >
    .s-side{
        position: fixed;
        width:120px;
        top:0;
        left:120;
        bottom:0;
        border-right: 1px solid #e0e0e0;
        padding-top: 15px;
    }
    .s-aside-product-item{
        line-height: 30px;
        padding-left: 15px;
        list-style: none;
        cursor: pointer;
        cursor: pointer;
        font-weight: 700;

    }
    .s-aside-product-item:hover{
        color:#2d8cf0;
    }
    .s-aside-product-item.active{
        background-color: #f0f0f0;
        color:#2d8cf0;
    }
    .s-content{
        padding-left: 120px;
    }

</style>
<template>
    <div class="s-wrap">
        <aside class="s-side">
            <ul class="s-aside-product">
                <li class="s-aside-product-item" :class="{'active':$route.name=='web_site_list'}" @click="go('web_site_list')">网站管理</li>
                <li class="s-aside-product-item" :class="{'active':$route.name=='web_category_list'}" @click="go('web_category_list')">分类管理</li>
                <li class="s-aside-product-item" :class="{'active':$route.name=='web_pages_list'}" @click="go('web_pages_list')">页面管理</li>
                <li class="s-aside-product-item" :class="{'active':$route.name=='web_pages_add'}" @click="go('web_pages_add')">新增页面</li>
            </ul>
        </aside>
        <div class="s-content">
            <div class="q-content-in">
                <transition>
                    <keep-alive>
                        <router-view  v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                </transition>
                <transition>
                    <router-view  v-if="!$route.meta.keepAlive"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            go(name){
                this.$router.push({
                    name: name
                })
            },
            logout(){
                this.$Modal.confirm({
                    title: '确定要删除吗',
                    onOk: () => {
                        this.ajax({
                            type: 'get',
                            url: '/api/logout',
                            success: (response) => {
                                this.$router.push({
                                    name: 'login'
                                })
                            }
                        })
                    }
                })
            }
        },
        created(){
            
        }
    }
</script>