<style scoped>
    .mar-r{
        margin-right: 10px;
    }
</style>
<template>
    <div>
        <div class="w-title">
            Seo列表
        </div>
        <div class="w-body">
            <div class="w-srh clearfix">
                <Button class="pull-left" type="primary" @click="add">创建</Button>
            </div>
            <Table border :columns="tableHeader" :data="dataList"></Table>
        </div>

        <Modal v-model="modifyModal"
            :title="modifyTitle"
            :mask-closable="false"
            width="600"
            @on-ok="submit"
            :styles="{top: '60px'}">
            <div class="ct-content">
                <Form :model="param" :label-width="80">
                    <!-- 每个类型是一个网站 -->
                    <FormItem label="名称">
                        <Input v-model="param.name" style="width:450px" placeholder="请输入分类名"></Input>
                    </FormItem>
                    <FormItem label="keywords">
                        <Input type="textarea" :rows="5" v-model="param.keywords" style="width:450px;" placeholder="请输入keywords"></Input>
                    </FormItem>
                    <FormItem label="description">
                        <Input type="textarea" :rows="5" v-model="param.description" style="width:450px;" placeholder="请输入description"></Input>
                    </FormItem>
                    <FormItem label="描述">
                        <Input type="textarea" :rows="5" v-model="param.desc" style="width:450px;" placeholder="请输入描述"></Input>
                    </FormItem>
                </Form>
                
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableHeader:[
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: 'Keywords',
                        key: 'keywords'
                    },
                    {
                        title: 'Description',
                        key: 'description'
                    },
                    {
                        title: '描述',
                        key: 'desc'
                    },
                    {
                        title: '操作',
                        width: 160,
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
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        'margin-right': '6px'
                                    },
                                    "on": {
                                        click: () => {
                                            this.edit(params.row)
                                        }
                                    }
                                }, '编辑')
                                
                            ]);
                        }
                    }
                ],
                dataList: [],

                modifyModal: false,
                modifyTitle: '',
                param: {
                    name: '',
                    keywords: '',
                    description: '',
                    desc: ''
                }
            }
        },
        created(){
            
            this.search();
        },
        methods: {

            // 查询SEO列表
            search(){
                this.ajax({
                    type: 'get',
                    url: '/api/seo',
                    data: this.dealObj(this.trim(this.srhParam)),
                    success: (response) => {
                        this.dataList = response.list;
                    }
                })
            },

            // 新建
            add(){
                this.modifyModal = true;
                this.modifyTitle = '新建';
                this.param.id = '';
                this.param.name = '';
                this.param.keywords = '';
                this.param.description = '';
                this.param.desc = '';
            },
            // 编辑
            edit(item){
                this.modifyModal = true;
                this.modifyTitle = '编辑';
                this.param.id = item.id;
                this.param.name = item.name;
                this.param.keywords = item.keywords;
                this.param.description = item.description;
                this.param.desc = item.desc;
            },
            submit(){
                this.ajax({
                    type: 'post',
                    url: '/api/seo',
                    data: this.dealObj(this.trim(this.param)),
                    success: (response) => {
                        this.search();
                    }
                })
            },
            delete(id){
                this.ajax({
                    type: 'delete',
                    url: '/api/seo',
                    data: {id:id},
                    success: (response) => {
                        this.search();
                    }
                })
            }
           
        }
        
    }
</script>