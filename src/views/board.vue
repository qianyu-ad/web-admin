<style scoped>
    .sidebar{
        position: fixed;
        width: 180px;
        top:0;
        bottom:0;
        left: 0;
        z-index: 3;
        background-color: #252a2f;
    }
    .q-aside-logo{
        height: 60px;
        background: url(../img/1.png) no-repeat 15px center /100px auto;
    }
    .q-aside-product{
        width: 180px;
        overflow-y: auto;
        position: absolute;
        top:50px;
        bottom:0;
    }
    .q-aside-product-item{
        color: #fff;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        -webkit-transition: all .2s ease-out 0s;
        transition: all .2s ease-out 0s;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        cursor: pointer;
        -webkit-user-select:none;
    }
    .q-aside-product-item.active,
    .q-aside-product-item:hover{
        background-color: #192129;
        color:#06C;
    }
    .q-content{
        padding-left: 180px;
    }
    .q-content-in{
        position: relative;
    }
    .logout{
        position: absolute;
        bottom:15px;
        left:15px;
    }
</style>
<template>
    <div>
        <aside class="sidebar">
            <div class="q-aside-logo"></div>
            <ul class="q-aside-product">
                <li class="q-aside-product-item" :class="{'active':$route.name=='site_list'}" @click="go('site_list')">网站管理</li>
                <li class="q-aside-product-item" :class="{'active':$route.name=='category_list'}" @click="go('category_list')">分类管理</li>
                <li class="q-aside-product-item" :class="{'active':$route.name=='seo_list'}" @click="go('seo_list')">SEO设置</li>
                <li class="q-aside-product-item" :class="{'active':$route.name=='pages_list'}" @click="go('pages_list')">页面管理</li>
                <li class="q-aside-product-item" :class="{'active':$route.name=='pages_add'}" @click="go('pages_add')">新增页面</li>
            </ul>
            <Button class="logout" type="warning" @click="logout">退出</Button>
        </aside>
        <div class="q-content">
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