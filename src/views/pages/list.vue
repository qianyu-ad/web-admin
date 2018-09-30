<style scoped>
    .mar-r{
        margin-right: 10px;
    }
</style>
<template>
    <div>
        <div class="w-title">
            页面列表
        </div>
        <div class="w-body">
            <div class="w-srh clearfix">
                <Select class="pull-left mar-r" v-model="srhParam.status" slot="append" style="width: 120px" placeholder="状态">
                    <Option :value="item.id" :key="item.id" v-for="item in statusList">{{item.name}}</Option>
                </Select>
                <Select class="pull-left mar-r" v-model="srhParam.categoryId" slot="append" style="width: 200px" placeholder="分类">
                    <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <Input class="srh-input mar-r" 
                    search 
                    enter-button="查询" 
                    v-model="srhParam.id"
                    @on-search="doSearch"
                    placeholder="请输入ID" />
                <Button class="pull-left" @click="reset">重置</Button>
                <Button class="pull-right" type="primary" @click="goAdd">创建</Button>
            </div>
            <Table border :columns="tableHeader" :data="dataList"></Table>
            <div class="page-nav-wrap">
                <Page  :total="pagination.total" 
                    :key="pagination.total" 
                    :page-size="pagination.size"  
                    @on-change="pageChange" 
                    :page-size-opts="pagination.pageSizeOpts" 
                    show-elevator show-sizer show-total 
                    @on-page-size-change="changeSize"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                statusList:this.getStatusList(),
                pagination: {
                    pageSizeOpts: [10,20,30,50,100],
                    total: 0,
                    page: 1, // 当前第几页
                    size: 10 // 每页条数
                },
                srhParam: {
                    id : '',
                    status :'',
                    categoryId :''
                },
                tableHeader:[
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '分类',
                        // key: 'categoryName'
                        render: (h, params) => {
                            return h('div', [
                                h('span', {}, this.categoryObj[params.row.categoryId])
                            ]);
                        }
                    },
                    {
                        title: 'SEO',
                        // key: 'categoryName'
                        render: (h, params) => {
                            return h('div', [
                                h('span', {}, this.seoObj[params.row.seoId])
                            ]);
                        }
                    },
                    {
                        title: '状态',
                        // 0 已删除，1 已发布，2待发布
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    style: {
                                        'color': params.row.status==1?'#19be6b':'#ed4014'
                                    },
                                }, params.row.status==1?'已发布':'待发布'),
                            ]);
                        }
                    },
                    {
                        title: '阅读次数',
                        key: 'count'                        
                    },
                    {
                        title: '操作',
                        width: 220,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        'margin-right': '6px'
                                    },
                                    "on": {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '你确定要删除吗？',
                                                onOk: () => {
                                                    this.delete(params.row.id);
                                                }
                                            })
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        'margin-right': '6px',
                                        'display': params.row.status==2?'none':'inline-block'
                                    },
                                    "on": {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '你确定要下线吗？',
                                                onOk: () => {
                                                    this.updateStatus(params.row.id,2)
                                                }
                                            })
                                        }
                                    }
                                }, '下线'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        'margin-right': '6px',
                                        'display': params.row.status==1?'none':'inline-block'
                                    },
                                    "on": {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '你确定要上线吗？',
                                                onOk: () => {
                                                    this.updateStatus(params.row.id,1)
                                                }
                                            })
                                        }
                                    }
                                }, '上线'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        'margin-right': '6px'
                                    },
                                    "on": {
                                        click: () => {
                                            // self.goDetail(params.row);
                                            this.goEdit(params.row.id)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    "on": {
                                        click: () => {
                                            window.open('http://tec.caishoubin.com/article/' + params.row.id);
                                        }
                                    }
                                }, '详情')
                                
                            ]);
                        }
                    }
                ],
                dataList: [],

                categoryList:[],

                seoObj: '',
                categoryObj: ''
            }
        },
        created(){
            this.getCategory();
            this.getSeoList();
            this.doSearch();
        },
        methods: {

            // 分类
            getCategory(){
                this.ajax({
                    type: 'get',
                    url: '/api/category',
                    data: this.dealObj(this.trim(this.srhParam)),
                    success: (response) => {
                        this.categoryList = response.list;

                        let obj = {};
                        response.list.forEach((item) => {
                            obj[item.id] = item.name;
                        });

                        this.categoryObj = obj;
                    }
                })
            },

            // 查询SEO列表
            getSeoList(){
                this.ajax({
                    type: 'get',
                    url: '/api/seo',
                    data: this.dealObj(this.trim(this.srhParam)),
                    success: (response) => {
                        this.seoList = response.list;

                        let obj = {};
                        response.list.forEach((item) => {
                            obj[item.id] = item.name;
                        });

                        this.seoObj = obj;
                    }
                })
            },

            // 查询
            search(){
                this.srhParam.page = this.pagination.page;
                this.srhParam.size = this.pagination.size;
                this.ajax({
                    type: 'get',
                    url: '/api/articles',
                    data: this.dealObj(this.trim(this.srhParam)),
                    success: (response) => {
                        this.pagination.total = response.total;
                        this.dataList = response.list;
                    }
                })
            },
            // 点击查询事件
            doSearch(){
                this.pagination.page = 1;
                this.pageChange(1);
            },
            // 换页
            pageChange(page){
                this.pagination.page = page;
                this.search();
            },
            // 
            changeSize(pageSize){
                this.srhParam.pageSize = pageSize;
                this.srhParam.page = 1;
                this.search();
            },
            // 上线下线
            updateStatus(id, status){
                let param = {
                    id: id,
                    status: status
                }
                this.ajax({
                    type: 'post',
                    url: '/api/articles/update/status',
                    data: param,
                    success: (response) => {
                        this.$Message.success('操作成功')
                        this.doSearch();
                    }
                })
            },
            // 删除文章
            delete(id){
                 this.ajax({
                    type: 'delete',
                    url: '/api/articles',
                    data: {id:id},
                    success: (response) => {
                        this.search();
                    }
                })
            },
            // 创建
            goAdd(id){
                this.$router.push({
                    name: 'pages_add'
                })
            },
            // 去编辑UM
            goEdit(id){
                let query = {
                    id: id
                };
                this.$router.push({
                    name: 'pages_edit',
                    query: query
                })
            },
            // 重置
            reset(){
                this.srhParam.id = '';
                this.srhParam.categoryId = '';
                this.srhParam.status = '';
                this.doSearch()
            },
            
           
        }
        
    }
</script>